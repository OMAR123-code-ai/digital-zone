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

  if (
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/confirmation') ||
    location.pathname.startsWith('/recu')
  ) {
    return null
  }

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dbs-black/95 backdrop-blur-md border-t border-dbs-border pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Navigation principale mobile"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {links.map((link) => {
          const active =
            link.to === '/'
              ? location.pathname === '/'
              : link.label === 'Recherche'
                ? false
                : location.pathname.startsWith(link.to) && link.to !== '/'
          const badgeLabel =
            link.badge && link.badge > 0
              ? `, ${link.badge} article${link.badge > 1 ? 's' : ''}`
              : ''
          return (
            <Link
              key={link.label}
              to={link.to}
              aria-label={`${link.label}${badgeLabel}`}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] py-1 text-[10px] transition ${
                active ? 'text-dbs-gold' : 'text-dbs-silver'
              }`}
            >
              <link.icon size={22} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
              <span className="leading-none" aria-hidden="true">{link.label}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span
                  className="absolute top-0 right-2 bg-dbs-gold text-dbs-black text-[9px] font-bold min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {link.badge > 9 ? '9+' : link.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
