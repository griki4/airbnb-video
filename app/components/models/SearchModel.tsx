'use client'

import { useCallback, useMemo, useState } from 'react'
import qs from 'query-string'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import { formatISO } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'

import useSearchModel from '@/app/hooks/useSearchModel'

import CountrySelector, {
	CountrySelectValue
} from '@/app/components/inputs/CountrySelector'
import Model from '@/app/components/models/Model'
import Heading from '@/app/components/Heading'
import Calendar from '../inputs/Calendar'
import Counter from '@/app/components/inputs/Counter'

enum STEP {
	LOCATION = 0,
	DATE = 1,
	INFO = 2
}

const SearchModel = () => {
	const searchModel = useSearchModel()
	const router = useRouter()
	const params = useSearchParams()

	const [step, setStep] = useState(STEP.LOCATION)
	const [location, setLocation] = useState<CountrySelectValue>()
	const [guestCount, setGuestCount] = useState(1)
	const [roomCount, setRoomCount] = useState(1)
	const [bathroomCount, setBathroomCount] = useState(1)
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection'
	})

	const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [])

	const onBack = useCallback(() => {
		setStep((value) => value - 1)
	}, [])

	const onNext = useCallback(() => {
		setStep((value) => value + 1)
	}, [])

	const onSubmit = useCallback(() => {
		if (step !== STEP.INFO) {
			return onNext()
		}
		let currentQuery: any = {}
		if (params) {
			currentQuery = qs.parse(params.toString())
		}
		const updatedQuery = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount
		}

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate)
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate)
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery
			},
			{ skipNull: true }
		)

		setStep(STEP.LOCATION)
		searchModel.onClose()
		router.push(url)
	}, [
		step,
		searchModel,
		location,
		router,
		guestCount,
		roomCount,
		dateRange,
		onNext,
		bathroomCount,
		params
	])

	const actionLabel = useMemo(() => {
		if (step === STEP.INFO) {
			return 'Search'
		}
		return 'Next'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEP.LOCATION) {
			return ''
		}
		return 'Back'
	}, [step])

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you wanna go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelector
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	)

	if (step === STEP.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="When do you plan to go?"
					subtitle="Make sure everyone is free!"
				/>
				<Calendar
					onChange={(value) => setDateRange(value.selection)}
					value={dateRange}
				/>
			</div>
		)
	}

	if (step === STEP.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="More information" subtitle="Find your perfect place!" />
				<hr />
				<Counter
					onChange={(value) => setGuestCount(value)}
					value={guestCount}
					title="Guests"
					subtitle="How many guests are coming?"
				/>
				<hr />
				<Counter
					onChange={(value) => setRoomCount(value)}
					value={roomCount}
					title="Rooms"
					subtitle="How many rooms do you need?"
				/>
				<hr />
				<Counter
					onChange={(value) => {
						setBathroomCount(value)
					}}
					value={bathroomCount}
					title="Bathrooms"
					subtitle="How many bahtrooms do you need?"
				/>
			</div>
		)
	}

	return (
		<Model
			isOpen={searchModel.isOpen}
			title="Filters"
			onSubmit={onSubmit}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEP.LOCATION ? undefined : onBack}
			onClose={searchModel.onClose}
			body={bodyContent}
		/>
	)
}

export default SearchModel
