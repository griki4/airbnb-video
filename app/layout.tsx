import type { Metadata } from 'next'
import './globals.css'
import { Nunito } from 'next/font/google'
import NavBar from '@/app/components/navbar/NavBar'
import ClientOnly from '@/app/components/ClientOnly'
import RegisterModel from '@/app/components/models/RegisterModel'
import ToastProvider from '@/app/providers/ToastProvider'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToastProvider />
					<RegisterModel />
					<NavBar />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
