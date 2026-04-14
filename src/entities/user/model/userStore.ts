import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from './types';

interface UserState {
  users: IUser[];
  addUser: (user: IUser) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, data: Partial<IUser>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      removeUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);