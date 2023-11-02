'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'

import { SafeListing, SafeUser, SafeReservation } from '@/app/types'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'

import { categories } from '@/app/components/navbar/Categories'
import useLoginModel from '@/app/hooks/useLoginModel'
import ListingReservation from '@/app/components/listings/ListingReservation'

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection'
}

interface ListingClientProps {
	reservation?: SafeReservation[]
	listing: SafeListing & {
		user: SafeUser
	}
	currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
	reservation = []
}) => {
	const router = useRouter()
	const loginModel = useLoginModel()

	const [isLoading, setIsLoading] = useState(false)
	const [totalPrice, setTotalPrice] = useState(listing.price)
	const [dateRange, setDateRange] = useState<Range>(initialDateRange)

	const disabledDate = useMemo(() => {
		let dates: Date[] = []

		reservation.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate)
			})
			dates = [...dates, ...range]
		})

		return dates
	}, [reservation])

	const onCreateReservation = useCallback(() => {
		if (!currentUser) return loginModel.onOpen()

		setIsLoading(true)

		axios
			.post('/api/reservation', {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id
			})
			.then(() => {
				toast.success('Listing Reserved!')
				setDateRange(initialDateRange)
				router.refresh()
			})
			.catch(() => {
				toast.error('Something went wrong!')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [totalPrice, dateRange, listing?.id, router, currentUser, loginModel])

	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category)
	}, [listing.category])

	// 根据选中预定日期计算出总价格
	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate
			)

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price)
			} else {
				setTotalPrice(listing.price)
			}
		}
	}, [dateRange, listing.price])

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
						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								onSubmit={onCreateReservation}
								dateRange={dateRange}
								disabledDate={disabledDate}
								disabled={isLoading}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ListingClient
