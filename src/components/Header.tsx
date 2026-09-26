import { useState, useEffect } from 'react'
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

  // Fermer le menu mobile avec Échap
  useEffect(() => {
    if (!mobileMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenu(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenu])

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
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Top promo + currency / language */}
      <div className="bg-dbs-dark border-b border-dbs-border text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-dbs-gold text-center flex-1 min-w-0 truncate sm:whitespace-normal">
            Passionné(e) de bonnes affaires ? En gros ou en détail — DBS est là pour vous servir.
          </p>
          <div className="flex items-center gap-1 text-dbs-silver shrink-0">
            <button
              type="button"
              onClick={() => setCurrency(currency === 'FCFA' ? 'USD' : 'FCFA')}
              className="touch-target px-2 hover:text-dbs-gold transition"
              aria-label={`Devise actuelle ${currency}, changer`}
            >
              {currency}
            </button>
            <span className="text-dbs-border" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
              className="touch-target px-2 flex items-center gap-1 hover:text-dbs-gold transition"
              aria-label={`Langue actuelle ${lang}, changer`}
            >
              <Globe size={12} aria-hidden="true" /> {lang}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dbs-black/95 backdrop-blur-md border-b border-dbs-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="lg:hidden touch-target p-2 text-dbs-silver hover:text-dbs-gold flex items-center justify-center"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenu}
            aria-controls="mobile-menu"
          >
            {mobileMenu ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>

          <Logo size="md" />

          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block" role="search">
            <label htmlFor="search-desktop" className="sr-only">Rechercher un produit</label>
            <div className="relative">
              <input
                id="search-desktop"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit, une marque, une catégorie..."
                className="w-full bg-dbs-card border border-dbs-border rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-dbs-muted focus:border-dbs-gold outline-none transition"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-dbs-gold touch-target flex items-center justify-center"
                aria-label="Lancer la recherche"
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-0 sm:gap-1 ml-auto">
            <Link
              to="/compte"
              className="touch-target flex flex-col items-center justify-center p-2 text-dbs-silver hover:text-dbs-gold transition"
              aria-label="Mon compte"
            >
              <User size={22} aria-hidden="true" />
              <span className="text-[10px] hidden sm:block">Compte</span>
            </Link>
            <Link
              to="/compte?tab=favoris"
              className="relative touch-target flex flex-col items-center justify-center p-2 text-dbs-silver hover:text-dbs-gold transition"
              aria-label={`Favoris${favorites.length > 0 ? `, ${favorites.length} articles` : ''}`}
            >
              <Heart size={22} aria-hidden="true" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 bg-dbs-gold text-dbs-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="true">
                  {favorites.length}
                </span>
              )}
              <span className="text-[10px] hidden sm:block">Favoris</span>
            </Link>
            <Link
              to="/panier"
              className="relative touch-target flex flex-col items-center justify-center p-2 text-dbs-silver hover:text-dbs-gold transition"
              aria-label={`Panier${itemCount > 0 ? `, ${itemCount} articles` : ''}`}
            >
              <ShoppingCart size={22} aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-dbs-gold text-dbs-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="true">
                  {itemCount}
                </span>
              )}
              <span className="text-[10px] hidden sm:block">Panier</span>
            </Link>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-dbs-border/50" aria-label="Catégories">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1 py-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/boutique?categorie=${cat.id}`}
                    className="px-3 py-1.5 text-sm text-dbs-silver hover:text-dbs-gold hover:bg-dbs-card rounded-md transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {mobileMenu && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-dbs-dark border-b border-dbs-border"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <form onSubmit={handleSearch} className="p-4" role="search">
            <label htmlFor="search-mobile" className="sr-only">Rechercher un produit</label>
            <div className="relative">
              <input
                id="search-mobile"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full bg-dbs-card border border-dbs-border rounded-full py-3 pl-4 pr-12 text-base text-white"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 touch-target flex items-center justify-center text-dbs-gold"
                aria-label="Lancer la recherche"
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </div>
          </form>
          <ul className="px-4 pb-4 space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/boutique?categorie=${cat.id}`}
                  onClick={() => setMobileMenu(false)}
                  className="block px-3 py-3 text-dbs-silver hover:text-dbs-gold hover:bg-dbs-card rounded-md min-h-[44px]"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/22673190710"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-3 text-green-400 hover:bg-dbs-card rounded-md min-h-[44px]"
              >
                <Phone size={16} aria-hidden="true" /> WhatsApp Support
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
