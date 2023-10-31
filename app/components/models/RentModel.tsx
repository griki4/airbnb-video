'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { FieldValues, useForm } from 'react-hook-form'

import Model from './Model'

import { categories } from '@/app/components/navbar/Categories'
import useRentModel from '@/app/hooks/useRentModel'
import Heading from '@/app/components/Heading'
import CategoryInput from '@/app/components/inputs/CategoryInput'
import CountrySelector from '@/app/components/inputs/CountrySelector'
import Counter from '@/app/components/inputs/Counter'
import ImageUpload from '@/app/components/inputs/ImageUpload'

enum STEP {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5
}
const RentModel = () => {
	const rentModel = useRentModel()
	const [step, setStep] = useState(STEP.CATEGORY)
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: ''
		}
	})
	// watch跟踪表格中category属性的最新值，category代表了用户选中的值
	const category = watch('category')
	const location = watch('location')
	const guestCount = watch('guestCount')
	const roomCount = watch('roomCount')
	const bathroomCount = watch('bathroomCount')
	const imageSrc = watch('imageSrc')
	// 根据id和value修改useForm中的值
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		})
	}

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false
			}),
		[location]
	)

	const onBack = () => {
		setStep((value) => value - 1)
	}
	const onNext = () => {
		setStep((value) => value + 1)
	}

	const actionLabel = useMemo(() => {
		if (step === STEP.PRICE) {
			return 'Create'
		}
		return 'Next'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEP.CATEGORY) {
			return ''
		}
		return 'Back'
	}, [step])

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div
				className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            "
			>
				{categories.map((item) => (
					<CategoryInput
						key={item.label}
						icon={item.icon}
						selected={category === item.label}
						label={item.label}
						onClick={(category) => setCustomValue('category', category)}
					/>
				))}
			</div>
		</div>
	)

	if (step === STEP.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you!"
				/>
				<CountrySelector
					value={location}
					onChange={(value) => {
						setCustomValue('location', value)
					}}
				/>
				<Map center={location?.latlng} />
			</div>
		)
	}

	if (step === STEP.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenitis do you have?"
				/>
				<Counter
					onChange={(value) => setCustomValue('guestCount', value)}
					value={guestCount}
					title="Guests"
					subtitle="How many guests do you allow?"
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue('roomCount', value)}
					value={roomCount}
					title="Rooms"
					subtitle="How many rooms do you have?"
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue('bathroomCount', value)}
					value={bathroomCount}
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
				/>
			</div>
		)
	}

	if (step === STEP.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload
					onChange={(value) => setCustomValue('imageSrc', value)}
					value={imageSrc}
				/>
			</div>
		)
	}

	return (
		<Model
			title="Airbnb your Home"
			isOpen={rentModel.isOpen}
			onClose={rentModel.onClose}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEP.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	)
}

export default RentModel
