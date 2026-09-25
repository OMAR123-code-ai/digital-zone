import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction } from '../types'

interface WalletState {
  balance: number
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void
  useCoins: (amount: number, description: string, orderId?: string) => boolean
  addCoins: (amount: number, description: string, type?: Transaction['type']) => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 25000,
      transactions: [
        {
          id: 'tx1',
          type: 'reward',
          amount: 15000,
          description: 'Bienvenue DBS Coin - Bonus d\'inscription',
          date: '2026-04-01T10:00:00',
        },
        {
          id: 'tx2',
          type: 'credit',
          amount: 10000,
          description: 'Achat de DBS Coin',
          date: '2026-04-05T14:30:00',
        },
      ],

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: `tx-${Date.now()}`,
          date: new Date().toISOString(),
        }
        set((state) => ({
          transactions: [newTx, ...state.transactions],
        }))
      },

      useCoins: (amount, description, orderId) => {
        const { balance } = get()
        if (balance < amount) return false
        set((state) => ({
          balance: state.balance - amount,
          transactions: [
            {
              id: `tx-${Date.now()}`,
              type: 'debit',
              amount,
              description,
              date: new Date().toISOString(),
              orderId,
            },
            ...state.transactions,
          ],
        }))
        return true
      },

      addCoins: (amount, description, type = 'credit') => {
        set((state) => ({
          balance: state.balance + amount,
          transactions: [
            {
              id: `tx-${Date.now()}`,
              type,
              amount,
              description,
              date: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        }))
      },
    }),
    {
      name: 'dbs-wallet',
    }
  )
)
