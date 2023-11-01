'use client'

import React, { useMemo } from 'react'

import { Reservation } from '@prisma/client'

import { SafeListing, SafeUser } from '@/app/types'

import { categories } from '@/app/components/navbar/Categories'
import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'

interface ListingClientProps {
	reservation?: Reservation[]
	listing: SafeListing & {
		user: SafeUser
	}
	currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser
}) => {
	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category)
	}, [listing.category])

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						id={listing.id}
						locationValue={listing.locationValue}
						imageSrc={listing.imageSrc}
						currentUser={currentUser}
					/>
					<div
						className="
							grid
							grid-cols-1
							md:grid-cols-7
							md:gap-10
							mt-6
						"
					>
						<ListingInfo
							user={listing.user}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							category={category}
							locationValue={listing.locationValue}
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ListingClient
