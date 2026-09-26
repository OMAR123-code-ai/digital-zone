import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Check, Circle } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { formatDate } from '../utils/format'
import type { TrackingStep } from '../types'

const defaultSteps: TrackingStep[] = [
  { status: 'received', label: 'Commande reçue', completed: true },
  { status: 'payment_confirmed', label: 'Paiement confirmé', completed: true },
  { status: 'preparing', label: 'Préparation en cours', completed: false },
  { status: 'shipped', label: 'Expédition', completed: false },
  { status: 'delivered', label: 'Livrée', completed: false },
]

export function TrackingPage() {
  const [searchParams] = useSearchParams()
  const [orderNum, setOrderNum] = useState(searchParams.get('order') || '')
  const [phone, setPhone] = useState('')
  const [searched, setSearched] = useState(!!searchParams.get('order'))
  const order = useUserStore((s) => s.getOrder(orderNum))
  const steps = order?.trackingSteps || defaultSteps

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-8">Suivre ma commande</h1>
      <form onSubmit={(e) => { e.preventDefault(); setSearched(true) }} className="bg-dbs-card border border-dbs-border rounded-2xl p-6 mb-8 space-y-4">
        <div><label className="text-sm text-dbs-silver">Numéro de commande</label><input value={orderNum} onChange={(e) => setOrderNum(e.target.value)} placeholder="DBS10245" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
        <div><label className="text-sm text-dbs-silver">Téléphone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+226 70 00 00 00" className="mt-1 w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold" /></div>
        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gold-gradient text-dbs-black font-bold"><Search size={18} /> Suivre ma commande</button>
      </form>
      {searched && (
        <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6">
          {order ? (
            <>
              <div className="flex justify-between mb-6"><span className="text-sm text-dbs-silver">Commande</span><span className="font-bold text-dbs-gold">#{order.orderNumber}</span></div>
              <div className="space-y-0">
                {steps.map((step, i) => (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500 text-white' : i === steps.findIndex((s) => !s.completed) ? 'bg-dbs-gold text-dbs-black' : 'bg-dbs-border text-dbs-silver'}`}>
                        {step.completed ? <Check size={16} /> : <Circle size={12} />}
                      </div>
                      {i < steps.length - 1 && <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-dbs-border'}`} />}
                    </div>
                    <div className="pb-8">
                      <p className={`font-medium ${step.completed ? 'text-white' : 'text-dbs-silver'}`}>{step.label}</p>
                      {step.date && <p className="text-xs text-dbs-silver mt-0.5">{formatDate(step.date)}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-dbs-silver">{orderNum ? `Aucune commande trouvée pour #${orderNum}` : 'Entrez un numéro de commande'}</p>
              <p className="text-xs text-dbs-silver mt-2">Les commandes passées sur ce site apparaîtront ici.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
