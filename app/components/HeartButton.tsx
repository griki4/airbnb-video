'use client'

import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { SafeUser } from '@/app/types'
import useFavorite from '@/app/hooks/useFavorite'

interface HeartButtonProps {
	listingId: string
	currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser
}) => {
	const { hasFavorite, toggleFavorite } = useFavorite({
		listingId,
		currentUser
	})

	return (
		<div
			onClick={toggleFavorite}
			className="
                relative
                cursor-pointer
                hover:opacity-80
                transition
            "
		>
			<AiOutlineHeart
				size={28}
				className="
                    full-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                "
			/>
			<AiFillHeart
				size={24}
				className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
			/>
		</div>
	)
}

export default HeartButton
