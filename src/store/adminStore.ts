import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, OrderStatus, Product } from '../types'
import { products as seedProducts } from '../data/products'

/** Mot de passe admin démo — à remplacer par Auth Apps Script plus tard */
const ADMIN_PASSWORD = 'DBS2026'

interface AdminState {
  isAuthenticated: boolean
  products: Product[]
  orders: Order[]
  login: (password: string) => boolean
  logout: () => void
  setOrders: (orders: Order[]) => void
  updateOrderStatus: (orderNumber: string, status: OrderStatus) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  importOrdersFromUser: (orders: Order[]) => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      products: seedProducts,
      orders: [],

      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => set({ isAuthenticated: false }),

      setOrders: (orders) => set({ orders }),

      updateOrderStatus: (orderNumber, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderNumber === orderNumber
              ? {
                  ...o,
                  status,
                  updatedAt: new Date().toISOString(),
                  trackingSteps: o.trackingSteps?.map((s) => ({
                    ...s,
                    completed:
                      s.status === status ||
                      (['received', 'payment_confirmed', 'preparing', 'shipped', 'delivered'].indexOf(s.status) <=
                        ['received', 'payment_confirmed', 'preparing', 'shipped', 'delivered'].indexOf(status)),
                    date: s.status === status ? new Date().toISOString() : s.date,
                  })),
                }
              : o
          ),
        })),

      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),

      updateProduct: (id, data) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      importOrdersFromUser: (orders) => {
        const existing = get().orders.map((o) => o.orderNumber)
        const fresh = orders.filter((o) => !existing.includes(o.orderNumber))
        if (fresh.length) set({ orders: [...fresh, ...get().orders] })
      },
    }),
    { name: 'dbs-admin' }
  )
)
