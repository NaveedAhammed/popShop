import { create } from "zustand";
import { UserType } from "../types";

interface UserStoreState {
	user: UserType | null;
	setUser: (user: UserType | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
