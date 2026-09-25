import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, Tag, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/format'
import { useState } from 'react'

export function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getShipping, getTotal, promoCode, promoDiscount, applyPromo, removePromo } = useCartStore()
  const [promoInput, setPromoInput] = useState('')

  const handlePromo = () => {
    if (promoInput.toUpperCase() === 'DBS2024') applyPromo('DBS2024', 10000)
    else if (promoInput.toUpperCase() === 'BIENVENUE') applyPromo('BIENVENUE', 5000)
    else alert('Code promo invalide')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-dbs-silver mb-8">Découvrez nos produits et commencez vos achats.</p>
        <Link to="/boutique" className="inline-flex items-center gap-2 px-8 py-3 rounded-full gold-gradient text-dbs-black font-bold">Continuer mes achats</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Mon panier <span className="text-dbs-silver text-lg font-normal">({items.length} article{items.length > 1 ? 's' : ''})</span></h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-4 bg-dbs-card border border-dbs-border rounded-2xl">
              <Link to={`/produit/${item.product.slug}`} className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/produit/${item.product.slug}`} className="font-medium text-sm hover:text-dbs-gold line-clamp-2">{item.product.name}</Link>
                <p className="text-dbs-gold font-bold mt-1">{formatPrice(item.product.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-dbs-border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:text-dbs-gold"><Minus size={14} /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:text-dbs-gold"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="p-1.5 text-dbs-silver hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="text-right font-bold text-sm hidden sm:block">{formatPrice(item.product.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 h-fit sticky top-28">
          <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>
          <div className="mb-4">
            {promoCode ? (
              <div className="flex items-center justify-between bg-dbs-gold/10 border border-dbs-gold/30 rounded-lg px-3 py-2 text-sm">
                <span className="text-dbs-gold flex items-center gap-1"><Tag size={14} /> {promoCode}</span>
                <button onClick={removePromo} className="text-dbs-silver hover:text-red-400 text-xs">Retirer</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Code promo" className="flex-1 bg-dbs-dark border border-dbs-border rounded-lg px-3 py-2 text-sm outline-none focus:border-dbs-gold" />
                <button onClick={handlePromo} className="px-4 py-2 border border-dbs-gold text-dbs-gold rounded-lg text-sm hover:bg-dbs-gold hover:text-dbs-black transition">Appliquer</button>
              </div>
            )}
            <p className="text-[10px] text-dbs-silver mt-1">Essayez : DBS2024 ou BIENVENUE</p>
          </div>
          <div className="space-y-2 text-sm border-t border-dbs-border pt-4">
            <div className="flex justify-between"><span className="text-dbs-silver">Sous-total</span><span>{formatPrice(getSubtotal())}</span></div>
            <div className="flex justify-between"><span className="text-dbs-silver">Livraison</span><span>{getShipping() === 0 ? 'Gratuite' : formatPrice(getShipping())}</span></div>
            {promoDiscount > 0 && <div className="flex justify-between text-green-400"><span>Réduction</span><span>-{formatPrice(promoDiscount)}</span></div>}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-dbs-border"><span>Total</span><span className="text-dbs-gold">{formatPrice(getTotal())}</span></div>
          </div>
          <Link to="/checkout" className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gold-gradient text-dbs-black font-bold hover:shadow-lg hover:shadow-dbs-gold/30 transition">
            Passer la commande <ArrowRight size={18} />
          </Link>
          <Link to="/boutique" className="mt-3 block text-center text-sm text-dbs-silver hover:text-dbs-gold">Continuer mes achats</Link>
        </div>
      </div>
    </div>
  )
}
