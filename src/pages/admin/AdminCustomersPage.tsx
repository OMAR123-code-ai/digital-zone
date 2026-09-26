import { useEffect, useMemo } from 'react'
import { useAdminStore } from '../../store/adminStore'
import { useUserStore } from '../../store/userStore'
import { formatPrice } from '../../utils/format'

export function AdminCustomersPage() {
  const orders = useAdminStore((s) => s.orders)
  const importOrders = useAdminStore((s) => s.importOrdersFromUser)
  const userOrders = useUserStore((s) => s.orders)

  useEffect(() => {
    if (userOrders.length) importOrders(userOrders)
  }, [userOrders, importOrders])

  const clients = useMemo(() => {
    const map = new Map<
      string,
      { name: string; phone: string; email: string; orders: number; total: number }
    >()
    for (const o of orders) {
      const key = o.customer.email || o.customer.phone
      const prev = map.get(key) || {
        name: `${o.customer.firstName} ${o.customer.lastName}`,
        phone: o.customer.phone,
        email: o.customer.email,
        orders: 0,
        total: 0,
      }
      prev.orders += 1
      prev.total += o.total
      map.set(key, prev)
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total)
  }, [orders])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <p className="text-sm text-dbs-silver mt-1">{clients.length} client(s) ayant commandé</p>
      </div>

      {clients.length === 0 ? (
        <div className="bg-dbs-card border border-dbs-border rounded-2xl p-10 text-center text-dbs-muted text-sm">
          Aucun client pour l'instant.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-dbs-border">
          <table className="w-full text-sm text-left min-w-[480px]">
            <thead className="bg-dbs-dark text-dbs-silver">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Commandes</th>
                <th className="px-4 py-3 font-medium">Total dépensé</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.email || c.phone} className="border-t border-dbs-border bg-dbs-card">
                  <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                  <td className="px-4 py-3 text-dbs-silver">
                    <p>{c.phone}</p>
                    <p className="text-xs text-dbs-muted">{c.email}</p>
                  </td>
                  <td className="px-4 py-3">{c.orders}</td>
                  <td className="px-4 py-3 text-dbs-gold font-medium">{formatPrice(c.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
