import { create } from "zustand";
import { ProductType } from "../types";

interface RateProductModalState {
	isOpen: boolean;
	onOpen: (product: ProductType) => void;
	onClose: () => void;
	product: ProductType | null;
}

export const useRateProductModal = create<RateProductModalState>((set) => ({
	isOpen: false,
	product: null,
	onOpen: (product: ProductType) => set(() => ({ isOpen: true, product })),
	onClose: () => set(() => ({ isOpen: false, id: null })),
}));
