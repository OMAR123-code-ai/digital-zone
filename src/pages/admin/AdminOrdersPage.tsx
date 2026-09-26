import { useEffect } from 'react'
import { useAdminStore } from '../../store/adminStore'
import { useUserStore } from '../../store/userStore'
import { formatPrice, formatDate } from '../../utils/format'
import type { OrderStatus } from '../../types'

const STATUSES: OrderStatus[] = [
  'received',
  'payment_confirmed',
  'preparing',
  'shipped',
  'delivered',
  'cancelled',
]

const statusLabel: Record<OrderStatus, string> = {
  received: 'Reçue',
  payment_confirmed: 'Payée',
  preparing: 'Préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
}

export function AdminOrdersPage() {
  const orders = useAdminStore((s) => s.orders)
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus)
  const importOrders = useAdminStore((s) => s.importOrdersFromUser)
  const userOrders = useUserStore((s) => s.orders)

  useEffect(() => {
    if (userOrders.length) importOrders(userOrders)
  }, [userOrders, importOrders])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Commandes</h1>
        <p className="text-sm text-dbs-silver mt-1">{orders.length} commande(s)</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-dbs-card border border-dbs-border rounded-2xl p-10 text-center text-dbs-muted text-sm">
          Aucune commande. Crée-en une depuis la boutique (checkout) pour la gérer ici.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-dbs-border">
          <table className="w-full text-sm text-left min-w-[640px]">
            <thead className="bg-dbs-dark text-dbs-silver">
              <tr>
                <th className="px-4 py-3 font-medium">N°</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Paiement</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.orderNumber} className="border-t border-dbs-border bg-dbs-card">
                  <td className="px-4 py-3 font-medium text-dbs-gold">#{o.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p className="text-white">{o.customer.firstName} {o.customer.lastName}</p>
                    <p className="text-xs text-dbs-muted">{o.customer.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-dbs-silver">{formatDate(o.createdAt)}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 capitalize text-dbs-silver">
                    {o.paymentMethod.replace('_', ' ')}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.orderNumber, e.target.value as OrderStatus)}
                      className="bg-dbs-dark border border-dbs-border rounded-lg px-2 py-1.5 text-xs text-white focus:border-dbs-gold outline-none"
                      aria-label={`Statut commande ${o.orderNumber}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
