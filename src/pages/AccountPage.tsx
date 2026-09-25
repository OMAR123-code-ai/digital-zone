import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Package, MapPin, Heart, Wallet, User, LogOut, Coins } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { useWalletStore } from '../store/walletStore'
import { products } from '../data/products'
import { formatPrice, formatDate } from '../utils/format'
import { ProductCard } from '../components/ProductCard'

const tabs = [
  { id: 'commandes', label: 'Mes commandes', icon: Package },
  { id: 'adresses', label: 'Mes adresses', icon: MapPin },
  { id: 'favoris', label: 'Mes favoris', icon: Heart },
  { id: 'wallet', label: 'Portefeuille DBS Coin', icon: Wallet },
  { id: 'infos', label: 'Mes informations', icon: User },
]

export function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'commandes'
  const { isLoggedIn, customer, orders, favorites, logout, login } = useUserStore()
  const { balance, transactions, addCoins } = useWalletStore()
  const [buyAmount, setBuyAmount] = useState(10000)
  const favProducts = products.filter((p) => favorites.includes(p.id))

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
        <p className="text-dbs-silver mb-8">Connectez-vous pour accéder à vos commandes, favoris et DBS Coin.</p>
        <button onClick={() => login({ firstName: 'Jean', lastName: 'Dupont', email: 'jean@email.com', phone: '+226 70 00 00 00', country: 'Burkina Faso', city: 'Ouagadougou', address: 'Secteur 12' })} className="px-8 py-3 rounded-xl gold-gradient text-dbs-black font-bold">Se connecter (démo)</button>
        <p className="text-xs text-dbs-silver mt-4">Mode démo — connexion automatique.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold">Bonjour, {customer?.firstName}</h1><p className="text-sm text-dbs-silver">{customer?.email}</p></div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-dbs-silver hover:text-red-400"><LogOut size={16} /> Déconnexion</button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <nav className="bg-dbs-card border border-dbs-border rounded-2xl p-2 space-y-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setSearchParams({ tab: t.id })} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${tab === t.id ? 'bg-dbs-gold text-dbs-black font-semibold' : 'text-dbs-silver hover:bg-dbs-dark hover:text-white'}`}>
                <t.icon size={18} />{t.label}
              </button>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          {tab === 'commandes' && (
            <div>
              <h2 className="font-bold text-lg mb-4">Mes commandes</h2>
              {orders.length === 0 ? <p className="text-dbs-silver">Aucune commande.</p> : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="bg-dbs-card border border-dbs-border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                      <div><p className="font-bold text-dbs-gold">#{o.orderNumber}</p><p className="text-xs text-dbs-silver">{formatDate(o.createdAt)}</p></div>
                      <span className="px-2 py-1 rounded bg-dbs-gold/10 text-dbs-gold text-xs">{o.status}</span>
                      <p className="font-bold">{formatPrice(o.total)}</p>
                      <Link to={`/tracking?order=${o.orderNumber}`} className="text-sm text-dbs-gold hover:underline">Voir</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'favoris' && (
            <div>
              <h2 className="font-bold text-lg mb-4">Mes favoris</h2>
              {favProducts.length === 0 ? <p className="text-dbs-silver">Aucun favori.</p> : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{favProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
              )}
            </div>
          )}
          {tab === 'wallet' && (
            <div>
              <h2 className="font-bold text-lg mb-4">Portefeuille DBS Coin</h2>
              <div className="bg-gradient-to-br from-dbs-gold/20 to-dbs-card border border-dbs-gold/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-2"><Coins size={28} className="text-dbs-gold" /><span className="text-sm text-dbs-silver">Mon solde</span></div>
                <p className="text-3xl font-bold text-dbs-gold">{balance.toLocaleString('fr-FR')} <span className="text-lg">DBS</span></p>
                <p className="text-xs text-dbs-silver mt-1">1 DBS = 1 FCFA</p>
              </div>
              <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 mb-6">
                <h3 className="font-semibold mb-3">Acheter des DBS Coin</h3>
                <div className="flex gap-3">
                  <input type="number" value={buyAmount} onChange={(e) => setBuyAmount(Number(e.target.value))} min={1000} step={1000} className="flex-1 bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2 outline-none focus:border-dbs-gold" />
                  <button onClick={() => { addCoins(buyAmount, `Achat de ${buyAmount} DBS Coin`); alert(`${buyAmount} DBS Coin ajoutés !`) }} className="px-6 py-2 rounded-xl gold-gradient text-dbs-black font-bold text-sm">Acheter</button>
                </div>
              </div>
              <h3 className="font-semibold mb-3">Historique</h3>
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between bg-dbs-card border border-dbs-border rounded-xl px-4 py-3">
                    <div><p className="text-sm">{tx.description}</p><p className="text-xs text-dbs-silver">{formatDate(tx.date)}</p></div>
                    <span className={`font-bold text-sm ${tx.type === 'debit' ? 'text-red-400' : 'text-green-400'}`}>{tx.type === 'debit' ? '-' : '+'}{tx.amount.toLocaleString('fr-FR')} DBS</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'infos' && customer && (
            <div>
              <h2 className="font-bold text-lg mb-4">Mes informations</h2>
              <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-dbs-silver">Nom</span><span>{customer.firstName} {customer.lastName}</span></div>
                <div className="flex justify-between"><span className="text-dbs-silver">Email</span><span>{customer.email}</span></div>
                <div className="flex justify-between"><span className="text-dbs-silver">Téléphone</span><span>{customer.phone}</span></div>
                <div className="flex justify-between"><span className="text-dbs-silver">Pays</span><span>{customer.country}</span></div>
                <div className="flex justify-between"><span className="text-dbs-silver">Ville</span><span>{customer.city}</span></div>
              </div>
            </div>
          )}
          {tab === 'adresses' && (
            <div>
              <h2 className="font-bold text-lg mb-4">Mes adresses</h2>
              <p className="text-dbs-silver text-sm">{customer?.address ? `${customer.address}, ${customer.city}, ${customer.country}` : 'Aucune adresse enregistrée.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
