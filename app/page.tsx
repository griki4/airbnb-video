import ClientOnly from '@/app/components/ClientOnly'
import Container from '@/app/components/Container'
import EmptyState from "@/app/components/EmptyState";

export default function Home() {
	const isEmpty = false

	if (!isEmpty) {
		return (
			<ClientOnly>
				<EmptyState showReset/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<Container>
				<div
					className="
						pt-24
						grid
						grid-cols-1
						sm:grid-cols-2
						md:grid-cols-3
						lg:grid-cols-4
						xl:grid-cols-5
						2xl:grid-cols-6
						gap-8
					"
				></div>
			</Container>
		</ClientOnly>
	)
}
