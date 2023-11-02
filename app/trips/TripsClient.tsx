'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { SafeReservation, SafeUser } from '@/app/types'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import ListingCard from '@/app/components/listings/listingCard'

interface TripsClientProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
	reservations,
	currentUser
}) => {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState('')

	const handleCancel = useCallback(
		(id: string) => {
			axios
				.delete(`/api/reservation/${id}`)
				.then(() => {
					setDeletingId(id)
					toast.success('Reservation Cancelled')
					router.refresh()
				})
				.catch((error) => {
					toast.error(error?.respond?.data?.error)
				})
				.finally(() => {
					setDeletingId('')
				})
		},
		[router]
	)

	return (
		<Container>
			<Heading
				title="Trips"
				subtitle="Where you've been and where you're going"
			/>
			<div
				className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
			>
				{reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={handleCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default TripsClient
