import { useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { formatPrice } from '../../utils/format'
import type { Product, Category } from '../../types'

const CATEGORIES: Category[] = [
  'electronique',
  'mode',
  'accessoires',
  'maison',
  'beaute',
  'sport',
  'high-tech',
  'promotions',
]

export function AdminProductsPage() {
  const products = useAdminStore((s) => s.products)
  const addProduct = useAdminStore((s) => s.addProduct)
  const updateProduct = useAdminStore((s) => s.updateProduct)
  const deleteProduct = useAdminStore((s) => s.deleteProduct)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'electronique' as Category,
    brand: 'DBS',
    shortDescription: '',
  })

  const reset = () => {
    setForm({ name: '', price: '', stock: '', category: 'electronique', brand: 'DBS', shortDescription: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const price = Number(form.price) || 0
    const stock = Number(form.stock) || 0
    if (!form.name.trim()) return

    if (editingId) {
      updateProduct(editingId, {
        name: form.name,
        price,
        stock,
        category: form.category,
        brand: form.brand,
        shortDescription: form.shortDescription,
      })
    } else {
      const slug = form.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      const product: Product = {
        id: `prod-${Date.now()}`,
        name: form.name,
        slug,
        description: form.shortDescription || form.name,
        shortDescription: form.shortDescription || form.name,
        price,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
        category: form.category,
        brand: form.brand,
        stock,
        rating: 5,
        reviewCount: 0,
        isNew: true,
      }
      addProduct(product)
    }
    reset()
  }

  const startEdit = (p: Product) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      price: String(p.price),
      stock: String(p.stock),
      category: p.category,
      brand: p.brand,
      shortDescription: p.shortDescription,
    })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Produits</h1>
          <p className="text-sm text-dbs-silver mt-1">{products.length} produit(s)</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gold-gradient text-dbs-black font-bold text-sm"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-dbs-card border border-dbs-border rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold text-white">{editingId ? 'Modifier' : 'Nouveau produit'}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              required
              placeholder="Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-dbs-dark border border-dbs-border rounded-xl px-3 py-2.5 text-sm text-white"
            />
            <input
              required
              type="number"
              placeholder="Prix (FCFA)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="bg-dbs-dark border border-dbs-border rounded-xl px-3 py-2.5 text-sm text-white"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="bg-dbs-dark border border-dbs-border rounded-xl px-3 py-2.5 text-sm text-white"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="bg-dbs-dark border border-dbs-border rounded-xl px-3 py-2.5 text-sm text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              placeholder="Marque"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="bg-dbs-dark border border-dbs-border rounded-xl px-3 py-2.5 text-sm text-white"
            />
            <input
              placeholder="Description courte"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="bg-dbs-dark border border-dbs-border rounded-xl px-3 py-2.5 text-sm text-white sm:col-span-2"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-5 py-2 rounded-xl gold-gradient text-dbs-black font-bold text-sm">
              Enregistrer
            </button>
            <button type="button" onClick={reset} className="px-5 py-2 rounded-xl border border-dbs-border text-sm text-dbs-silver">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-dbs-border">
        <table className="w-full text-sm text-left min-w-[560px]">
          <thead className="bg-dbs-dark text-dbs-silver">
            <tr>
              <th className="px-4 py-3 font-medium">Produit</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-dbs-border bg-dbs-card">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{p.name}</p>
                  <p className="text-xs text-dbs-muted">{p.brand}</p>
                </td>
                <td className="px-4 py-3 capitalize text-dbs-silver">{p.category}</td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="p-2 rounded-lg border border-dbs-border text-dbs-silver hover:text-dbs-gold"
                      aria-label={`Modifier ${p.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Supprimer « ${p.name} » ?`)) deleteProduct(p.id)
                      }}
                      className="p-2 rounded-lg border border-dbs-border text-dbs-silver hover:text-red-400"
                      aria-label={`Supprimer ${p.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
