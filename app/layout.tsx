import type { Metadata } from 'next'
import './globals.css'
import { Nunito } from 'next/font/google'

import NavBar from '@/app/components/navbar/NavBar'
import ClientOnly from '@/app/components/ClientOnly'
import RegisterModel from '@/app/components/models/RegisterModel'
import LoginModel from '@/app/components/models/LoginModel'
import RentModel from '@/app/components/models/RentModel'

import ToastProvider from '@/app/providers/ToastProvider'
import getCurrentUser from '@/app/actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone'
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const currentUser = await getCurrentUser()

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToastProvider />
					<RentModel />
					<LoginModel />
					<RegisterModel />
					<NavBar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
