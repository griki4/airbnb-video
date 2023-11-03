import { create } from 'zustand'

interface SearchModel {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useSearchModel = create<SearchModel>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))

export default useSearchModel
