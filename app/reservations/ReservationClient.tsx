'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

import { SafeReservation, SafeUser } from '@/app/types'

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import ListingCard from '@/app/components/listings/listingCard'

interface ReservationClientProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const ReservationClient: React.FC<ReservationClientProps> = ({
	currentUser,
	reservations
}) => {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState('')

	const handleCancel = useCallback(
		(id: string) => {
			setDeletingId(id)

			axios
				.delete(`/api/reservation/${id}`)
				.then(() => {
					toast.success('Reservation Cancelled')
					router.refresh()
				})
				.catch(() => {
					toast.error('Something went wrong')
				})
				.finally(() => {
					setDeletingId('')
				})
		},
		[router]
	)

	return (
		<Container>
			<Heading title="Reservations" subtitle="Bookings on your properties" />
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
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={handleCancel}
						disabled={reservation.id === deletingId}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default ReservationClient
