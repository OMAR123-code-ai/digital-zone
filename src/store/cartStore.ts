import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, ProductVariant } from '../types'

interface CartState {
  items: CartItem[]
  promoCode: string | null
  promoDiscount: number
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string, discount: number) => void
  removePromo: () => void
  getSubtotal: () => number
  getShipping: () => number
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,

      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.selectedVariant?.id === variant?.id
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.selectedVariant?.id === variant?.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity, selectedVariant: variant }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      applyPromo: (code, discount) => set({ promoCode: code, promoDiscount: discount }),

      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal >= 500000 ? 0 : 10000
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const shipping = get().getShipping()
        const discount = get().promoDiscount
        return Math.max(0, subtotal + shipping - discount)
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'dbs-cart',
    }
  )
)
