import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, ShoppingCart, User, Search } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export function MobileNav() {
  const location = useLocation()
  const itemCount = useCartStore((s) => s.getItemCount())

  const links = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/boutique', icon: ShoppingBag, label: 'Boutique' },
    { to: '/boutique', icon: Search, label: 'Recherche' },
    { to: '/panier', icon: ShoppingCart, label: 'Panier', badge: itemCount },
    { to: '/compte', icon: User, label: 'Compte' },
  ]

  if (location.pathname.startsWith('/checkout') || location.pathname.startsWith('/confirmation')) {
    return null
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dbs-black/95 backdrop-blur-md border-t border-dbs-border safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {links.map((link) => {
          const active =
            link.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.to) && link.to !== '/'
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] transition ${
                active ? 'text-dbs-gold' : 'text-dbs-silver'
              }`}
            >
              <link.icon size={20} />
              <span>{link.label}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span className="absolute top-0 right-1 bg-dbs-gold text-dbs-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {link.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
