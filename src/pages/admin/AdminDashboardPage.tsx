import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag, Users, TrendingUp, ArrowRight } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { useUserStore } from '../../store/userStore'
import { formatPrice, formatDate } from '../../utils/format'

export function AdminDashboardPage() {
  const products = useAdminStore((s) => s.products)
  const orders = useAdminStore((s) => s.orders)
  const importOrders = useAdminStore((s) => s.importOrdersFromUser)
  const userOrders = useUserStore((s) => s.orders)

  // Synchronise les commandes créées côté boutique (localStorage)
  useEffect(() => {
    if (userOrders.length) importOrders(userOrders)
  }, [userOrders, importOrders])

  const stats = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + (o.paymentStatus === 'paid' ? o.total : 0), 0)
    const pending = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length
    const clients = new Set(orders.map((o) => o.customer.email || o.customer.phone)).size
    return { revenue, pending, clients, productCount: products.length, orderCount: orders.length }
  }, [orders, products])

  const recent = orders.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Vue d'ensemble</h1>
        <p className="text-sm text-dbs-silver mt-1">Pilotage DBS Digital Business Store</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Chiffre d\'affaires', value: formatPrice(stats.revenue), icon: TrendingUp, color: 'text-dbs-gold' },
          { label: 'Commandes', value: String(stats.orderCount), icon: Package, color: 'text-blue-400' },
          { label: 'En cours', value: String(stats.pending), icon: Package, color: 'text-amber-400' },
          { label: 'Produits', value: String(stats.productCount), icon: ShoppingBag, color: 'text-green-400' },
        ].map((s) => (
          <div key={s.label} className="bg-dbs-card border border-dbs-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-dbs-silver">{s.label}</span>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-dbs-card border border-dbs-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Dernières commandes</h2>
            <Link to="/admin/commandes" className="text-xs text-dbs-gold flex items-center gap-1">
              Tout voir <ArrowRight size={12} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-dbs-muted py-6 text-center">
              Aucune commande pour l'instant.
              <br />
              <span className="text-xs">Passe une commande sur la boutique pour la voir ici.</span>
            </p>
          ) : (
            <ul className="space-y-3">
              {recent.map((o) => (
                <li key={o.orderNumber} className="flex items-center justify-between text-sm border-b border-dbs-border/50 pb-2">
                  <div>
                    <p className="font-medium text-dbs-gold">#{o.orderNumber}</p>
                    <p className="text-xs text-dbs-muted">{formatDate(o.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(o.total)}</p>
                    <p className="text-xs text-dbs-silver capitalize">{o.status.replace('_', ' ')}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-dbs-card border border-dbs-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Accès rapides</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/admin/commandes', label: 'Gérer commandes', icon: Package },
              { to: '/admin/produits', label: 'Gérer produits', icon: ShoppingBag },
              { to: '/admin/clients', label: 'Clients', icon: Users },
              { to: '/boutique', label: 'Voir la boutique', icon: TrendingUp },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-dbs-border hover:border-dbs-gold/40 hover:bg-dbs-dark transition text-center"
              >
                <a.icon size={22} className="text-dbs-gold" />
                <span className="text-xs text-dbs-silver">{a.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
