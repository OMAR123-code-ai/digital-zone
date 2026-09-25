import { useState } from 'react'
import { Search, Send } from 'lucide-react'
import { useToastStore } from '../store/toastStore'

export function ProductRequest() {
  const [productName, setProductName] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const addToast = useToastStore((s) => s.addToast)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName.trim()) {
      addToast('error', 'Indiquez le nom du produit recherché')
      return
    }
    setLoading(true)
    setTimeout(() => {
      addToast('success', 'Demande envoyée ! Notre équipe vous contactera bientôt.')
      setProductName('')
      setContact('')
      setLoading(false)
    }, 800)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative overflow-hidden rounded-2xl border border-dbs-border bg-gradient-to-br from-dbs-card via-dbs-dark to-dbs-card p-8 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-dbs-gold/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dbs-gold/10 border border-dbs-gold/30 text-dbs-gold text-xs font-medium mb-3">
              <Search size={14} /> Service sur mesure
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Produit introuvable ?
            </h2>
            <p className="text-dbs-silver text-sm md:text-base max-w-md">
              Proposez-le ici et notre équipe le trouvera pour vous. Nous sourçons les produits que vous cherchez.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md space-y-3">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nom du produit (ex: iPhone 16 Pro Max 256 Go)"
              className="w-full bg-dbs-black/80 border border-dbs-border rounded-xl px-4 py-3 text-sm outline-none focus:border-dbs-gold placeholder:text-dbs-muted"
              required
            />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="WhatsApp ou email (optionnel)"
              className="w-full bg-dbs-black/80 border border-dbs-border rounded-xl px-4 py-3 text-sm outline-none focus:border-dbs-gold placeholder:text-dbs-muted"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gold-gradient text-dbs-black font-bold text-sm hover:shadow-lg hover:shadow-dbs-gold/20 transition disabled:opacity-60"
            >
              <Send size={16} />
              {loading ? 'Envoi...' : 'Proposer ce produit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
