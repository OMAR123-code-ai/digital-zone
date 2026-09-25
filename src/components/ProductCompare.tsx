import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GitCompare, X, Plus } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice } from '../utils/format'
import type { Product } from '../types'

export function ProductCompare() {
  const [selected, setSelected] = useState<Product[]>([])
  const [pickerOpen, setPickerOpen] = useState(false)

  const add = (p: Product) => {
    if (selected.find((x) => x.id === p.id)) return
    if (selected.length >= 3) return
    setSelected([...selected, p])
    setPickerOpen(false)
  }

  const remove = (id: string) => setSelected(selected.filter((p) => p.id !== id))

  const available = products.filter((p) => !selected.find((s) => s.id === p.id))

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-dbs-gold/10 flex items-center justify-center">
          <GitCompare size={20} className="text-dbs-gold" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">Comparer des produits</h2>
          <p className="text-sm text-dbs-silver">Jusqu'à 3 produits côte à côte</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((slot) => {
          const p = selected[slot]
          if (!p) {
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setPickerOpen(true)}
                className="min-h-[220px] rounded-2xl border border-dashed border-dbs-border bg-dbs-card/50 flex flex-col items-center justify-center gap-2 text-dbs-silver hover:border-dbs-gold hover:text-dbs-gold transition"
              >
                <Plus size={28} />
                <span className="text-sm">Ajouter un produit</span>
              </button>
            )
          }
          return (
            <div key={p.id} className="relative rounded-2xl border border-dbs-border bg-dbs-card overflow-hidden">
              <button
                type="button"
                onClick={() => remove(p.id)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-dbs-black/70 text-dbs-silver hover:text-white"
                aria-label="Retirer"
              >
                <X size={14} />
              </button>
              <Link to={`/produit/${p.slug}`}>
                <div className="aspect-square bg-dbs-dark">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-dbs-gold">{p.brand}</p>
                  <h3 className="text-sm font-medium text-white line-clamp-2 mt-1">{p.name}</h3>
                  <p className="text-dbs-gold font-bold mt-2">{formatPrice(p.price)}</p>
                  {p.originalPrice && (
                    <p className="text-xs text-dbs-silver line-through">{formatPrice(p.originalPrice)}</p>
                  )}
                  <ul className="mt-3 space-y-1 text-xs text-dbs-silver">
                    <li>Note : {p.rating}/5 ({p.reviewCount} avis)</li>
                    <li>Stock : {p.stock > 0 ? `${p.stock} unités` : 'Rupture'}</li>
                    {p.features?.slice(0, 3).map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4" onClick={() => setPickerOpen(false)}>
          <div
            className="bg-dbs-card border border-dbs-border rounded-2xl w-full max-w-lg max-h-[70vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-dbs-border">
              <h3 className="font-bold text-white">Choisir un produit</h3>
              <button type="button" onClick={() => setPickerOpen(false)} className="text-dbs-silver hover:text-white">
                <X size={20} />
              </button>
            </div>
            <ul className="overflow-y-auto max-h-[55vh] p-2">
              {available.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => add(p)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-dbs-dark text-left transition"
                  >
                    <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white line-clamp-1">{p.name}</p>
                      <p className="text-xs text-dbs-gold">{formatPrice(p.price)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
