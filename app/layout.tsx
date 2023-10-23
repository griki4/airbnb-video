import type { Metadata } from 'next'
import './globals.css'
import { Nunito } from 'next/font/google'
import NavBar from '@/app/components/navbar/NavBar'

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
				<NavBar />
				{children}
			</body>
		</html>
	)
}
