import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

// 处理 /api/listing 接口的POST请求
export async function POST(request: Request) {
	// 获取当前用户
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	// 获取请求体中的参数
	const body = await request.json()

	const {
		title,
		description,
		price,
		imageSrc,
		location,
		roomCount,
		bathroomCount,
		guestCount,
		category
	} = body

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error()
		}
	})

	// 在MongoDB中生成对应的数据
	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			price: parseInt(price, 10),
			locationValue: location.value,
			imageSrc,
			roomCount,
			bathroomCount,
			guestCount,
			category,
			userId: currentUser.id
		}
	})

	return NextResponse.json(listing)
}
