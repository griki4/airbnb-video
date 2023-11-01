'use client'

import { Range } from 'react-date-range'
import Calendar from '@/app/components/inputs/Calendar'
import Button from '@/app/components/Button'

interface ListingReservationProps {
	price: number
	dateRange: Range
	totalPrice: number
	onChangeDate: (value: Range) => void
	onSubmit: () => void
	disabled?: boolean
	disabledDate: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabled,
	disabledDate
}) => {
	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-center gap-1 p-4">
				<div className="text-2xl font-semibold">$ {price}</div>
				<div className="font-light text-neutral-600">night</div>
			</div>
			<hr />
			<Calendar
				value={dateRange}
				onChange={(value) => onChangeDate(value.selection)}
				disabledDates={disabledDate}
			/>
			<div className="p-4">
				<Button label="Reserve" onClick={onSubmit} disabled={disabled} />
			</div>
			<hr />
			<div className="flex flex-row items-center justify-between p-4 font-semibold text-lg">
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	)
}

export default ListingReservation
