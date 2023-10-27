'use client'

import { signIn } from 'next-auth/react'
import { useState, useCallback } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

import useRegisterModel from '@/app/hooks/useRegisterModel'
import useLoginModel from '@/app/hooks/useLoginModel'

import Model from '@/app/components/models/Model'
import Heading from '@/app/components/Heading'
import Input from '@/app/components/inputs/Input'
import Button from '@/app/components/Button'
import { useRouter } from 'next/navigation'

const LoginModel = () => {
	const router = useRouter()
	const registerModel = useRegisterModel()
	const loginModel = useLoginModel()
	// 定义加载状态
	const [isLoading, setIsLoading] = useState(false)
	// 定义用户登录表格
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	// 定义提交事件
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		signIn('credentials', {
			...data,
			redirect: false
		}).then((callback) => {
			setIsLoading(false)

			if (callback?.ok) {
				toast.success('Logged in!')
				router.refresh()
				loginModel.onClose()
			}

			if (callback?.error) {
				toast.error(callback.error)
			}
		})
	}

	const toggle = useCallback(() => {
		loginModel.onClose()
		registerModel.onOpen()
	}, [loginModel, registerModel])

	// 主体
	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Log in your account!" center />
			<Input
				id="email"
				label="Email"
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
					<div>First use Airbnb?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Create an account
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Model
			disabled={isLoading}
			isOpen={loginModel.isOpen}
			onClose={loginModel.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title="Login"
			actionLabel="Continue"
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModel
