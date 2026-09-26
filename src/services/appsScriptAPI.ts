/**
 * DBS — Câble boutique ↔ Google Apps Script
 * -----------------------------------------
 * 1. Déploie ton projet Apps Script en « Application Web »
 * 2. Copie l’URL de déploiement
 * 3. Crée un fichier .env à la racine :
 *      VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
 * 4. Redémarre npm run dev
 *
 * Sans URL → mode MOCK (données locales, la boutique fonctionne quand même).
 * Avec URL  → toutes les actions passent par Apps Script / Sheets.
 */

import type {
  Product,
  Order,
  Customer,
  ApiResponse,
  PaymentMethod,
  OrderStatus,
} from '../types'
import { products as mockProducts } from '../data/products'
import { generateOrderNumber } from '../utils/format'

const APPS_SCRIPT_URL = (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined)?.trim() || ''

/** true = branchement actif vers Apps Script */
export function isAppsScriptConnected(): boolean {
  return Boolean(APPS_SCRIPT_URL)
}

/**
 * Appel générique POST vers Apps Script.
 * Le script doit accepter JSON : { action: string, ...payload }
 * et répondre : { success: boolean, data?: T, error?: string, message?: string }
 */
async function callAppsScript<T>(
  action: string,
  payload?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  if (!APPS_SCRIPT_URL) {
    return { success: false, error: 'APPS_SCRIPT_NOT_CONFIGURED' }
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // text/plain évite un preflight CORS strict avec Apps Script
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...payload }),
      redirect: 'follow',
    })

    const text = await res.text()
    try {
      return JSON.parse(text) as ApiResponse<T>
    } catch {
      return { success: false, error: 'Réponse Apps Script invalide (pas JSON)' }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erreur réseau Apps Script',
    }
  }
}

// ─── Produits ───────────────────────────────────────────────

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  if (!isAppsScriptConnected()) {
    return { success: true, data: mockProducts, message: 'mock' }
  }
  const res = await callAppsScript<Product[]>('getProducts')
  if (!res.success || !res.data?.length) {
    return { success: true, data: mockProducts, message: 'fallback-mock' }
  }
  return res
}

export async function getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  if (!isAppsScriptConnected()) {
    const product = mockProducts.find((p) => p.slug === slug)
    if (!product) return { success: false, error: 'Produit introuvable' }
    return { success: true, data: product, message: 'mock' }
  }
  const res = await callAppsScript<Product>('getProduct', { slug })
  if (!res.success) {
    const product = mockProducts.find((p) => p.slug === slug)
    if (product) return { success: true, data: product, message: 'fallback-mock' }
  }
  return res
}

// ─── Commandes ──────────────────────────────────────────────

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
  if (isAppsScriptConnected()) {
    const res = await callAppsScript<Order>('createOrder', { order: orderData })
    if (res.success && res.data) return res
    // si échec réseau, on continue en mock pour ne pas bloquer le client
  }

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

  return {
    success: true,
    data: order,
    message: isAppsScriptConnected() ? 'mock-after-api-fail' : 'mock',
  }
}

export async function getOrder(orderNumber: string): Promise<ApiResponse<Order>> {
  if (!isAppsScriptConnected()) {
    return { success: false, error: 'Commande non trouvée (mode mock local)' }
  }
  return callAppsScript<Order>('getOrder', { orderNumber })
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus
): Promise<ApiResponse<Order>> {
  if (!isAppsScriptConnected()) {
    return { success: false, error: 'APPS_SCRIPT_NOT_CONFIGURED' }
  }
  return callAppsScript<Order>('updateOrderStatus', { orderNumber, status })
}

// ─── Clients ────────────────────────────────────────────────

export async function saveCustomer(customer: Customer): Promise<ApiResponse<Customer>> {
  if (!isAppsScriptConnected()) {
    return {
      success: true,
      data: { ...customer, id: `cust-${Date.now()}` },
      message: 'mock',
    }
  }
  return callAppsScript<Customer>('saveCustomer', { customer })
}

// ─── Paiement (simulé côté front tant que pas de passerelle réelle) ─

export async function processPayment(
  method: PaymentMethod,
  amount: number,
  phone?: string
): Promise<ApiResponse<{ transactionId: string }>> {
  if (isAppsScriptConnected()) {
    const res = await callAppsScript<{ transactionId: string }>('processPayment', {
      method,
      amount,
      phone,
    })
    if (res.success) return res
  }

  await new Promise((r) => setTimeout(r, 800))
  return {
    success: true,
    data: { transactionId: `txn-${Date.now()}` },
    message: `Paiement ${method} simulé (${amount} FCFA)`,
  }
}

// ─── Demandes produit / newsletter (pour le dashboard Apps Script) ─

export async function submitProductRequest(payload: {
  name: string
  description?: string
  contact: string
}): Promise<ApiResponse<{ id: string }>> {
  if (!isAppsScriptConnected()) {
    return { success: true, data: { id: `req-${Date.now()}` }, message: 'mock' }
  }
  return callAppsScript('submitProductRequest', payload)
}

export async function subscribeNewsletter(email: string): Promise<ApiResponse<{ ok: boolean }>> {
  if (!isAppsScriptConnected()) {
    return { success: true, data: { ok: true }, message: 'mock' }
  }
  return callAppsScript('subscribeNewsletter', { email })
}

/** Statut de connexion (debug / admin UI future) */
export function getConnectionStatus(): {
  connected: boolean
  urlConfigured: boolean
} {
  return {
    connected: isAppsScriptConnected(),
    urlConfigured: Boolean(APPS_SCRIPT_URL),
  }
}
