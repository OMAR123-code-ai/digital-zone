import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingCart, Menu, X, Phone, Globe } from 'lucide-react'
import { Logo } from './Logo'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { categories } from '../data/products'

export function Header() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currency, setCurrency] = useState<'FCFA' | 'USD'>('FCFA')
  const [lang, setLang] = useState<'FR' | 'EN'>('FR')
  const navigate = useNavigate()
  const itemCount = useCartStore((s) => s.getItemCount())
  const favorites = useUserStore((s) => s.favorites)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileMenu(false)
    }
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top promo + currency / language */}
      <div className="bg-dbs-dark border-b border-dbs-border text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-dbs-gold text-center flex-1 min-w-0 truncate sm:whitespace-normal">
            Passionné(e) de bonnes affaires ? En gros ou en détail — DBS est là pour vous servir.
          </p>
          <div className="flex items-center gap-3 text-dbs-silver shrink-0">
            <button
              type="button"
              onClick={() => setCurrency(currency === 'FCFA' ? 'USD' : 'FCFA')}
              className="hover:text-dbs-gold transition"
            >
              {currency}
            </button>
            <span className="text-dbs-border">|</span>
            <button
              type="button"
              onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
              className="flex items-center gap-1 hover:text-dbs-gold transition"
            >
              <Globe size={12} /> {lang}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dbs-black/95 backdrop-blur-md border-b border-dbs-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-dbs-silver hover:text-dbs-gold"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Logo size="md" />

          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit, une marque, une catégorie..."
                className="w-full bg-dbs-card border border-dbs-border rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-dbs-muted focus:border-dbs-gold outline-none transition"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-dbs-gold">
                <Search size={18} />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-3 ml-auto">
            <Link to="/compte" className="flex flex-col items-center p-2 text-dbs-silver hover:text-dbs-gold transition" title="Mon compte">
              <User size={22} />
              <span className="text-[10px] hidden sm:block">Compte</span>
            </Link>
            <Link to="/compte?tab=favoris" className="relative flex flex-col items-center p-2 text-dbs-silver hover:text-dbs-gold transition" title="Favoris">
              <Heart size={22} />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 bg-dbs-gold text-dbs-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
              <span className="text-[10px] hidden sm:block">Favoris</span>
            </Link>
            <Link to="/panier" className="relative flex flex-col items-center p-2 text-dbs-silver hover:text-dbs-gold transition" title="Panier">
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-dbs-gold text-dbs-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{itemCount}</span>
              )}
              <span className="text-[10px] hidden sm:block">Panier</span>
            </Link>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-dbs-border/50">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1 py-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/boutique?categorie=${cat.id}`} className="px-3 py-1.5 text-sm text-dbs-silver hover:text-dbs-gold hover:bg-dbs-card rounded-md transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {mobileMenu && (
        <div className="lg:hidden bg-dbs-dark border-b border-dbs-border">
          <form onSubmit={handleSearch} className="p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full bg-dbs-card border border-dbs-border rounded-full py-2.5 pl-4 pr-12 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-dbs-gold">
                <Search size={18} />
              </button>
            </div>
          </form>
          <ul className="px-4 pb-4 space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/boutique?categorie=${cat.id}`} onClick={() => setMobileMenu(false)} className="block px-3 py-2.5 text-dbs-silver hover:text-dbs-gold hover:bg-dbs-card rounded-md">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://wa.me/22673190710" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 text-green-400 hover:bg-dbs-card rounded-md">
                <Phone size={16} /> WhatsApp Support
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
