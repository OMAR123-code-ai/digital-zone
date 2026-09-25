import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Check, CreditCard, Smartphone } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useWalletStore } from '../store/walletStore'
import { formatPrice } from '../utils/format'
import { createOrder, processPayment } from '../services/appsScriptAPI'
import type { Customer, PaymentMethod } from '../types'

const steps = ['Informations', 'Livraison', 'Paiement']

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getSubtotal, getShipping, getTotal, promoCode, promoDiscount, clearCart } = useCartStore()
  const { addOrder, login } = useUserStore()
  const { balance, useCoins } = useWalletStore()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [useDbsCoin, setUseDbsCoin] = useState(false)
  const [dbsCoinAmount, setDbsCoinAmount] = useState(0)
  const [form, setForm] = useState<Customer>({ firstName: '', lastName: '', email: '', phone: '', country: 'Burkina Faso', city: '', address: '' })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange_money')

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Panier vide</h1>
        <Link to="/boutique" className="text-dbs-gold mt-4 inline-block">Retour boutique</Link>
      </div>
    )
  }

  const total = getTotal()
  const coinToUse = useDbsCoin ? Math.min(dbsCoinAmount, balance, total) : 0
  const finalTotal = total - coinToUse
  const update = (field: keyof Customer, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const canNext = () => {
    if (step === 0) return form.firstName && form.lastName && form.email && form.phone
    if (step === 1) return form.country && form.city && form.address
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const payRes = await processPayment(paymentMethod, finalTotal, form.phone)
      if (!payRes.success) throw new Error(payRes.error)
      if (coinToUse > 0) useCoins(coinToUse, 'Paiement commande')
      const orderRes = await createOrder({
        customer: form,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity, price: i.product.price })),
        paymentMethod, subtotal: getSubtotal(), shipping: getShipping(), discount: promoDiscount + coinToUse,
        total: finalTotal, promoCode: promoCode || undefined, dbsCoinUsed: coinToUse || undefined,
      })
      if (orderRes.success && orderRes.data) {
        const order = { ...orderRes.data, items }
        addOrder(order)
        login(form)
        clearCart()
        navigate(`/confirmation/${order.orderNumber}`)
      }
    } catch {
      alert('Erreur lors du paiement. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Commande</h1>
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-dbs-gold text-dbs-black' : 'bg-dbs-card border border-dbs-border text-dbs-silver'}`}>
              {i < step ? <Check size={16} /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i === step ? 'text-white' : 'text-dbs-silver'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-dbs-border" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-lg mb-4">Informations personnelles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm text-dbs-silver">Prénom *</label><input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Jean" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
                <div><label className="text-sm text-dbs-silver">Nom *</label><input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Dupont" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
              </div>
              <div><label className="text-sm text-dbs-silver">Email *</label><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jean@email.com" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
              <div><label className="text-sm text-dbs-silver">Téléphone *</label><input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+226 70 00 00 00" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
            </div>
          )}
          {step === 1 && (
            <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-lg mb-4">Adresse de livraison</h2>
              <div><label className="text-sm text-dbs-silver">Pays *</label>
                <select value={form.country} onChange={(e) => update('country', e.target.value)} className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold">
                  <option>Burkina Faso</option><option>Côte d'Ivoire</option><option>Sénégal</option><option>Mali</option><option>Niger</option><option>Togo</option><option>Bénin</option><option>France</option>
                </select>
              </div>
              <div><label className="text-sm text-dbs-silver">Ville *</label><input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Ouagadougou" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
              <div><label className="text-sm text-dbs-silver">Adresse complète *</label><textarea value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Quartier, rue, numéro..." rows={3} className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold resize-none" /></div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4">Choisissez votre mode de paiement</h2>
                <div className="space-y-3">
                  {[{ id: 'orange_money' as PaymentMethod, label: 'Orange Money', color: 'bg-orange-500' }, { id: 'moov_money' as PaymentMethod, label: 'Moov Money', color: 'bg-blue-500' }, { id: 'wave' as PaymentMethod, label: 'Wave', color: 'bg-cyan-500' }, { id: 'card' as PaymentMethod, label: 'Carte bancaire', color: 'bg-indigo-500' }].map((m) => (
                    <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${paymentMethod === m.id ? 'border-dbs-gold bg-dbs-gold/5' : 'border-dbs-border hover:border-dbs-silver'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="accent-dbs-gold" />
                      <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center`}>{m.id === 'card' ? <CreditCard size={16} className="text-white" /> : <Smartphone size={16} className="text-white" />}</div>
                      <span className="font-medium">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6">
                <h3 className="font-bold mb-3">Payer avec DBS Coin</h3>
                <p className="text-sm text-dbs-silver mb-3">Solde : <span className="text-dbs-gold font-bold">{balance.toLocaleString('fr-FR')} DBS</span></p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={useDbsCoin} onChange={(e) => { setUseDbsCoin(e.target.checked); if (e.target.checked) setDbsCoinAmount(Math.min(balance, total)) }} className="accent-dbs-gold" />
                  <span className="text-sm">Utiliser mes DBS Coin</span>
                </label>
                {useDbsCoin && (
                  <div className="mt-3">
                    <input type="number" min={0} max={Math.min(balance, total)} value={dbsCoinAmount} onChange={(e) => setDbsCoinAmount(Number(e.target.value))} className="w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2 outline-none focus:border-dbs-gold" />
                    <p className="text-xs text-dbs-silver mt-1">1 DBS = 1 FCFA</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 0 ? <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-dbs-border rounded-xl text-sm hover:border-dbs-gold transition">Retour</button> : <Link to="/panier" className="px-6 py-2.5 text-sm text-dbs-silver hover:text-dbs-gold">← Retour panier</Link>}
            {step < 2 ? (
              <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()} className="px-8 py-2.5 rounded-xl gold-gradient text-dbs-black font-bold text-sm disabled:opacity-50">Continuer →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="px-8 py-2.5 rounded-xl gold-gradient text-dbs-black font-bold text-sm disabled:opacity-50">{loading ? 'Traitement...' : 'Payer maintenant'}</button>
            )}
          </div>
        </div>

        <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 h-fit sticky top-28">
          <h2 className="font-bold mb-4">Résumé de la commande</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img src={item.product.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0"><p className="text-sm line-clamp-1">{item.product.name}</p><p className="text-xs text-dbs-silver">x{item.quantity}</p></div>
                <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t border-dbs-border pt-4">
            <div className="flex justify-between"><span className="text-dbs-silver">Sous-total</span><span>{formatPrice(getSubtotal())}</span></div>
            <div className="flex justify-between"><span className="text-dbs-silver">Livraison</span><span>{getShipping() === 0 ? 'Gratuite' : formatPrice(getShipping())}</span></div>
            {promoDiscount > 0 && <div className="flex justify-between text-green-400"><span>Promo</span><span>-{formatPrice(promoDiscount)}</span></div>}
            {coinToUse > 0 && <div className="flex justify-between text-dbs-gold"><span>DBS Coin</span><span>-{formatPrice(coinToUse)}</span></div>}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-dbs-border"><span>Total</span><span className="text-dbs-gold">{formatPrice(finalTotal)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
