import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  ArrowLeft,
  Coins,
} from 'lucide-react'
import { useAdminStore } from '../store/adminStore'
import { Logo } from '../components/Logo'

const nav = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Vue d\'ensemble' },
  { to: '/admin/commandes', icon: Package, label: 'Commandes' },
  { to: '/admin/produits', icon: ShoppingBag, label: 'Produits' },
  { to: '/admin/clients', icon: Users, label: 'Clients' },
  { to: '/admin/dbs-coin', icon: Coins, label: 'DBS Coin' },
]

export function AdminLayout() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)
  const logout = useAdminStore((s) => s.logout)
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-dbs-black flex flex-col lg:flex-row">
      <aside className="lg:w-60 border-b lg:border-b-0 lg:border-r border-dbs-border bg-dbs-dark shrink-0">
        <div className="p-4 flex items-center justify-between lg:justify-start gap-3">
          <Logo size="sm" />
          <span className="text-[10px] uppercase tracking-widest text-dbs-gold border border-dbs-gold/40 px-2 py-0.5 rounded">
            Admin
          </span>
        </div>
        <nav className="px-2 pb-4 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Admin">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm whitespace-nowrap transition ${
                  isActive
                    ? 'bg-dbs-gold/15 text-dbs-gold'
                    : 'text-dbs-silver hover:bg-dbs-card hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block px-2 pb-4 space-y-1 border-t border-dbs-border pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-dbs-silver hover:text-white hover:bg-dbs-card"
          >
            <ArrowLeft size={18} /> Boutique
          </button>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-dbs-card"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-dbs-border">
          <button type="button" onClick={() => navigate('/')} className="text-sm text-dbs-silver">
            ← Boutique
          </button>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
            className="text-sm text-red-400"
          >
            Déconnexion
          </button>
        </header>
        <main className="p-4 md:p-6 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
