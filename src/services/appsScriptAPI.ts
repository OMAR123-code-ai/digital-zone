import type { Product, Order, Customer, ApiResponse, PaymentMethod } from '../types'
import { products as mockProducts } from '../data/products'
import { generateOrderNumber } from '../utils/format'

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || ''

async function callAppsScript<T>(action: string, payload?: Record<string, unknown>): Promise<ApiResponse<T>> {
  if (!APPS_SCRIPT_URL) return { success: false, error: 'Apps Script not configured (mock mode)' }
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    })
    return await res.json()
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return { success: true, data: mockProducts }
}

export async function getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  const product = mockProducts.find((p) => p.slug === slug)
  if (!product) return { success: false, error: 'Product not found' }
  return { success: true, data: product }
}

export async function createOrder(orderData: {
  customer: Customer
  items: { productId: string; quantity: number; price: number }[]
  paymentMethod: PaymentMethod
  subtotal: number
  shipping: number
  discount: number
  total: number
  promoCode?: string
  dbsCoinUsed?: number
}): Promise<ApiResponse<Order>> {
  const order: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: generateOrderNumber(),
    customer: orderData.customer,
    items: [],
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    discount: orderData.discount,
    total: orderData.total,
    paymentMethod: orderData.paymentMethod,
    paymentStatus: 'paid',
    status: 'received',
    createdAt: new Date().toISOString(),
    trackingSteps: [
      { status: 'received', label: 'Commande reçue', date: new Date().toISOString(), completed: true },
      { status: 'payment_confirmed', label: 'Paiement confirmé', completed: true },
      { status: 'preparing', label: 'Préparation en cours', completed: false },
      { status: 'shipped', label: 'Expédition', completed: false },
      { status: 'delivered', label: 'Livrée', completed: false },
    ],
    promoCode: orderData.promoCode,
    dbsCoinUsed: orderData.dbsCoinUsed,
  }
  return { success: true, data: order, message: 'Commande créée avec succès' }
}

export async function getOrder(orderNumber: string): Promise<ApiResponse<Order>> {
  return callAppsScript<Order>('getOrder', { orderNumber })
}

export async function processPayment(
  method: PaymentMethod,
  amount: number,
  _phone?: string
): Promise<ApiResponse<{ transactionId: string }>> {
  await new Promise((r) => setTimeout(r, 1200))
  return {
    success: true,
    data: { transactionId: `txn-${Date.now()}` },
    message: `Paiement ${method} de ${amount} FCFA simulé avec succès`,
  }
}

export async function saveCustomer(customer: Customer): Promise<ApiResponse<Customer>> {
  return { success: true, data: { ...customer, id: `cust-${Date.now()}` } }
}
