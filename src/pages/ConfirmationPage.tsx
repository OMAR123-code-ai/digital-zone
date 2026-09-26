import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Download, Package, ArrowLeft } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { formatPrice, formatDate } from '../utils/format'

export function ConfirmationPage() {
  const { orderNumber } = useParams()
  const order = useUserStore((s) => s.getOrder(orderNumber || ''))

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-green-400" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Commande confirmée !</h1>
      <p className="text-dbs-silver mb-6">Votre commande a été enregistrée avec succès.</p>
      <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 text-left mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-dbs-silver">Numéro de commande</span>
          <span className="font-bold text-dbs-gold">#{orderNumber}</span>
        </div>
        {order && (
          <>
            <div className="flex justify-between text-sm mb-2"><span className="text-dbs-silver">Date</span><span>{formatDate(order.createdAt)}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-dbs-silver">Total</span><span className="font-bold">{formatPrice(order.total)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-dbs-silver">Paiement</span><span className="capitalize">{order.paymentMethod.replace('_', ' ')}</span></div>
          </>
        )}
      </div>
      <p className="text-sm text-dbs-silver mb-6">Un reçu a été envoyé par email et WhatsApp.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to={`/tracking?order=${orderNumber}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-dbs-gold text-dbs-gold font-semibold hover:bg-dbs-gold hover:text-dbs-black transition">
          <Package size={18} /> Voir ma commande
        </Link>
        <Link to={`/recu/${orderNumber}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl gold-gradient text-dbs-black font-bold">
          <Download size={18} /> Voir mon reçu
        </Link>
      </div>
      <Link to="/" className="flex items-center justify-center gap-2 mt-8 text-sm text-dbs-silver hover:text-dbs-gold"><ArrowLeft size={14} /> Retour à l'accueil</Link>
    </div>
  )
}
