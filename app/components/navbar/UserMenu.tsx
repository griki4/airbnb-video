'use client'

import React from 'react'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { SafeUser } from '@/app/types'
import Avatar from '@/app/components/Avatar'
import MenuItem from '@/app/components/navbar/MenuItem'

import useRegisterModel from '@/app/hooks/useRegisterModel'
import useLoginModel from '@/app/hooks/useLoginModel'
import useRentModel from '@/app/hooks/useRentModel'

interface UserMenuProps {
	currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter()

	const registerModel = useRegisterModel()
	const loginModel = useLoginModel()
	const rentModel = useRentModel()
	const [isOpen, setIsOpen] = useState(false)
	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value)
	}, [])

	const onRentModel = useCallback(() => {
		if (!currentUser) {
			return loginModel.onOpen()
		}
		// open rent model
		rentModel.onOpen()
	}, [currentUser, loginModel, rentModel])

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRentModel}
					className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-4
                        px-3
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className="
                    py-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            "
				>
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									label="My trips"
									onClick={() => router.push('/trips')}
								/>
								<MenuItem
									label="My favorites"
									onClick={() => router.push('/favorites')}
								/>
								<MenuItem
									label="My reservations"
									onClick={() => router.push('/reservations')}
								/>
								<MenuItem
									label="My properties"
									onClick={() => router.push('/properties')}
								/>
								<MenuItem label="Airbnb your home" onClick={() => {}} />
								<hr />
								<MenuItem label="Logout" onClick={() => signOut()} />
							</>
						) : (
							<>
								<MenuItem onClick={loginModel.onOpen} label={'Login'} />
								<MenuItem onClick={registerModel.onOpen} label={'Sign up'} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
