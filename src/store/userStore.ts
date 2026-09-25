import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Customer, Address, Order } from '../types'

interface UserState {
  isLoggedIn: boolean
  customer: Customer | null
  addresses: Address[]
  favorites: string[]
  orders: Order[]
  login: (customer: Customer) => void
  logout: () => void
  updateCustomer: (data: Partial<Customer>) => void
  addAddress: (address: Address) => void
  removeAddress: (id: string) => void
  toggleFavorite: (productId: string) => void
  addOrder: (order: Order) => void
  getOrder: (orderNumber: string) => Order | undefined
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      customer: null,
      addresses: [],
      favorites: [],
      orders: [],

      login: (customer) => set({ isLoggedIn: true, customer }),

      logout: () =>
        set({
          isLoggedIn: false,
          customer: null,
        }),

      updateCustomer: (data) =>
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...data } : null,
        })),

      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),

      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),

      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      getOrder: (orderNumber) =>
        get().orders.find((o) => o.orderNumber === orderNumber),
    }),
    {
      name: 'dbs-user',
    }
  )
)
