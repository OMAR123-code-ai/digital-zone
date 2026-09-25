// ============================================
// DBS Digital Business Store - Type Definitions
// Ready for Google Apps Script / Sheets integration
// ============================================

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: Category
  brand: string
  stock: number
  rating: number
  reviewCount: number
  features?: string[]
  variants?: ProductVariant[]
  isNew?: boolean
  isFeatured?: boolean
  tags?: string[]
  createdAt?: string
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceModifier?: number
  stock?: number
}

export type Category =
  | 'electronique'
  | 'mode'
  | 'accessoires'
  | 'maison'
  | 'beaute'
  | 'sport'
  | 'high-tech'
  | 'promotions'

export interface CartItem {
  product: Product
  quantity: number
  selectedVariant?: ProductVariant
}

export interface Customer {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  postalCode?: string
}

export interface Address {
  id: string
  label: string
  fullName: string
  phone: string
  country: string
  city: string
  address: string
  isDefault?: boolean
}

export type PaymentMethod = 'orange_money' | 'moov_money' | 'wave' | 'card' | 'dbs_coin'

export interface Order {
  id: string
  orderNumber: string
  customer: Customer
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  status: OrderStatus
  createdAt: string
  updatedAt?: string
  trackingSteps?: TrackingStep[]
  promoCode?: string
  dbsCoinUsed?: number
}

export type OrderStatus =
  | 'received'
  | 'payment_confirmed'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface TrackingStep {
  status: OrderStatus
  label: string
  date?: string
  completed: boolean
}

export interface Wallet {
  balance: number
  currency: 'DBS'
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  type: 'credit' | 'debit' | 'reward' | 'purchase'
  amount: number
  description: string
  date: string
  orderId?: string
}

export interface PromoCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minAmount?: number
  expiresAt?: string
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
  verified?: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
