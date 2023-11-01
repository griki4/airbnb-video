'use client'

import React from 'react'
import { IconType } from 'react-icons'
import dynamic from 'next/dynamic'

import { SafeUser } from '@/app/types'

import useCountries from '@/app/hooks/useCountries'
import Avatar from '@/app/components/Avatar'
import ListingCategory from '@/app/components/listings/ListingCategory'

const Map = dynamic(() => import('../Map'))

interface ListingInfoProps {
	user: SafeUser
	description: string
	guestCount: number
	roomCount: number
	bathroomCount: number
	category:
		| {
				icon: IconType
				label: string
				description: string
		  }
		| undefined
	locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	user,
	description,
	guestCount,
	roomCount,
	bathroomCount,
	category,
	locationValue
}) => {
	const { getByValue } = useCountries()
	const coordinates = getByValue(locationValue)?.latlng

	return (
		<div className="flex flex-col col-span-4 gap-8">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row items-center gap-2 text-xl font-semibold">
					<div>Host by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<hr />
			<div className="text-lg text-neutral-500 font-light">{description}</div>
			<hr />
			<Map center={coordinates} />
		</div>
	)
}

export default ListingInfo
