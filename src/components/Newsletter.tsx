import { useState } from 'react'
import { Mail, Gift } from 'lucide-react'
import { useToastStore } from '../store/toastStore'
import { useWalletStore } from '../store/walletStore'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const addToast = useToastStore((s) => s.addToast)
  const addCoins = useWalletStore((s) => s.addCoins)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      addToast('error', 'Veuillez entrer un email valide')
      return
    }
    setLoading(true)
    setTimeout(() => {
      addCoins(2000, 'Bonus newsletter — Bienvenue chez DBS', 'reward')
      addToast('success', 'Inscription réussie ! +2 000 DBS Coin offerts 🎉')
      setEmail('')
      setLoading(false)
    }, 800)
  }

  return (
    <section className="bg-gradient-to-r from-dbs-dark via-dbs-card to-dbs-dark border-y border-dbs-border py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dbs-gold/10 border border-dbs-gold/30 text-dbs-gold text-xs font-medium mb-4">
          <Gift size={14} /> Offre exclusive
        </div>
        <h2 className="text-2xl font-bold mb-2">
          Rejoignez le club <span className="gold-text">DBS</span>
        </h2>
        <p className="text-dbs-silver text-sm mb-6 max-w-md mx-auto">
          Recevez les nouveautés, offres privées et gagnez <strong className="text-dbs-gold">2 000 DBS Coin</strong> dès votre inscription.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dbs-silver" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full bg-dbs-black border border-dbs-border rounded-full py-3 pl-10 pr-4 text-sm outline-none focus:border-dbs-gold"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full gold-gradient text-dbs-black font-bold text-sm hover:shadow-lg hover:shadow-dbs-gold/30 transition disabled:opacity-60"
          >
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>
      </div>
    </section>
  )
}
