import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import getReservations from '@/app/actions/getReservations'

import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from '@/app/listings/[listingId]/ListingClient'

interface IParams {
	listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const currentUser = await getCurrentUser()
	const reservation = await getReservations(params)
	const listing = await getListingById(params)

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<ListingClient
				currentUser={currentUser}
				listing={listing}
				reservation={reservation}
			/>
		</ClientOnly>
	)
}

export default ListingPage
