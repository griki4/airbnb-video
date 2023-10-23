import type { Metadata } from 'next'
import './globals.css'
import { Nunito } from 'next/font/google'
import NavBar from '@/app/components/navbar/NavBar'
import ClientOnly from '@/app/components/ClientOnly'
import Model from '@/app/components/models/Model'

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
					<Model isOpen actionLabel="Submit" />
					<NavBar />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
