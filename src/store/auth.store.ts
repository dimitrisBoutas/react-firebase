import { create } from 'zustand';

export interface AuthStoreState {
    user: any
    setUser: (user: any) => void,
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    user: null,
    setUser: (nextUser: any) => set(() => ({ user: nextUser })),
}))

