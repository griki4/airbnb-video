'use client'

import React from 'react'
import { SafeUser } from '@/app/types'

import Container from '@/app/components/Container'
import Logo from '@/app/components/navbar/Logo'
import Search from '@/app/components/navbar/Search'
import UserMenu from '@/app/components/navbar/UserMenu'
import Categories from '@/app/components/navbar/Categories'

interface NavBarProps {
	currentUser?: SafeUser | null
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
	return (
		<div className="fixed w-full bg-white z-10 shadow-sm">
			<div
				className="
                py-5
                border-b-[1px]
            "
			>
				<Container>
					<div
						className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
					>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	)
}

export default NavBar
