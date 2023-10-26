'use client'

import axios from 'axios'
import { useState, useCallback } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

import useRegisterModel from '@/app/hooks/useRegisterModel'
import Model from '@/app/components/models/Model'
import Heading from '@/app/components/Heading'
import Input from '@/app/components/inputs/Input'
import Button from '@/app/components/Button'

const RegisterModel = () => {
	const registerModel = useRegisterModel()
	// 定义加载状态
	const [isLoading, setIsLoading] = useState(false)
	// 定义用户登录表格
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	// 定义提交事件
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		axios
			.post('/api/register', data)
			.then(() => {
				registerModel.onClose()
			})
			.catch((error) => {
				toast.error('Something went wrong')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	// 主体
	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to Airbnb!"
				subtitle="Create an account!"
				center
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-4 mt-2">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Already have an account?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={registerModel.onClose}
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Model
			disabled={isLoading}
			isOpen={registerModel.isOpen}
			onClose={registerModel.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title="Register"
			actionLabel="Continue"
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModel
