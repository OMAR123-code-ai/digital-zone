import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, X, ChevronDown } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { products, categories, brands } from '../data/products'
import type { Category } from '../types'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [sort, setSort] = useState('popularite')
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const categoryParam = searchParams.get('categorie') as Category | null
  const query = searchParams.get('q') || ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (categoryParam) list = list.filter((p) => p.category === categoryParam)
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    if (selectedBrands.length > 0) list = list.filter((p) => selectedBrands.includes(p.brand))
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sort) {
      case 'prix-asc': list.sort((a, b) => a.price - b.price); break
      case 'prix-desc': list.sort((a, b) => b.price - a.price); break
      case 'nouveautes': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      default: list.sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [categoryParam, query, selectedBrands, priceRange, sort])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {categoryParam ? categories.find((c) => c.id === categoryParam)?.name || 'Boutique' : query ? `Recherche : "${query}"` : 'Tous les produits'}
          </h1>
          <p className="text-sm text-dbs-silver mt-1">{filtered.length} produits trouvés</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-3 py-2 border border-dbs-border rounded-lg text-sm">
            <Filter size={16} /> Filtres
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-dbs-card border border-dbs-border rounded-lg px-3 py-2 text-sm outline-none focus:border-dbs-gold">
            <option value="popularite">Popularité</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="nouveautes">Nouveautés</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-dbs-black p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 shrink-0 space-y-6`}>
          {showFilters && (
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-bold">Filtres</h3>
              <button onClick={() => setShowFilters(false)}><X size={24} /></button>
            </div>
          )}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">Catégories <ChevronDown size={14} /></h3>
            <ul className="space-y-1.5">
              <li><button onClick={() => setSearchParams({})} className={`text-sm ${!categoryParam ? 'text-dbs-gold' : 'text-dbs-silver hover:text-white'}`}>Tous ({products.length})</button></li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button onClick={() => setSearchParams({ categorie: cat.id })} className={`text-sm ${categoryParam === cat.id ? 'text-dbs-gold' : 'text-dbs-silver hover:text-white'}`}>
                    {cat.name} ({cat.count})
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Prix (FCFA)</h3>
            <input type="range" min={0} max={2000000} step={10000} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-dbs-gold" />
            <div className="flex justify-between text-xs text-dbs-silver mt-1"><span>0</span><span>{priceRange[1].toLocaleString('fr-FR')}</span></div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Marques</h3>
            <ul className="space-y-2">
              {brands.map((b) => (
                <li key={b.name}>
                  <label className="flex items-center gap-2 text-sm text-dbs-silver cursor-pointer hover:text-white">
                    <input type="checkbox" checked={selectedBrands.includes(b.name)} onChange={() => toggleBrand(b.name)} className="accent-dbs-gold" />
                    {b.name} ({b.count})
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {showFilters && (
            <button onClick={() => setShowFilters(false)} className="w-full py-3 gold-gradient text-dbs-black font-bold rounded-xl lg:hidden">
              Voir {filtered.length} produits
            </button>
          )}
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-dbs-silver">
              <p className="text-lg">Aucun produit trouvé</p>
              <button onClick={() => { setSearchParams({}); setSelectedBrands([]); setPriceRange([0, 2000000]) }} className="mt-4 text-dbs-gold hover:underline">Réinitialiser les filtres</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
