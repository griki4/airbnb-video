import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { SafeUser } from '@/app/types'
import useLoginModel from '@/app/hooks/useLoginModel'
import toast from 'react-hot-toast'
import axios from 'axios'
import { el } from 'date-fns/locale'

interface IUseFavorite {
	listingId: string
	currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter()

	const loginModel = useLoginModel()

	const hasFavorite = useMemo(() => {
		const listing = currentUser?.favoriteIds || []
		return listing.includes(listingId)
	}, [listingId, currentUser])

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()

			if (!currentUser) {
				return loginModel.onOpen()
			}

			try {
				let request

				if (hasFavorite) {
					request = () => axios.delete(`/api/favorite/${listingId}`)
				} else {
					request = () => axios.post(`/api/favorite/${listingId}`)
				}

				await request()
				router.refresh()
				toast.success('Success')
			} catch (error) {
				toast.error('Something went wrong!')
			}
		},
		[currentUser, hasFavorite, router, loginModel, listingId]
	)

	return {
		hasFavorite,
		toggleFavorite
	}
}

export default useFavorite
