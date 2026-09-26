import { Link, useParams } from 'react-router-dom'
import { Download, ArrowLeft, CheckCircle } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { formatPrice, formatDate } from '../utils/format'
import { Logo } from '../components/Logo'
import { QRCode } from '../components/QRCode'

export function ReceiptPage() {
  const { orderNumber } = useParams()
  const order = useUserStore((s) => s.getOrder(orderNumber || ''))

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Reçu introuvable</h1>
        <p className="text-dbs-silver mt-2">Aucune commande ne correspond à #{orderNumber}.</p>
        <Link to="/tracking" className="text-dbs-gold mt-4 inline-block">Suivre une commande</Link>
      </div>
    )
  }

  const qrValue = `DBS-RECU:${order.orderNumber}:${order.total}:${order.createdAt}`

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link to={`/tracking?order=${order.orderNumber}`} className="flex items-center gap-2 text-sm text-dbs-silver hover:text-dbs-gold">
          <ArrowLeft size={16} /> Retour
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-dbs-black font-bold text-sm"
        >
          <Download size={16} /> Télécharger en PDF
        </button>
      </div>

      <div id="receipt" className="bg-dbs-card border border-dbs-border rounded-2xl p-6 sm:p-8 print:border-none print:bg-white print:text-black">
        <div className="flex items-start justify-between border-b border-dbs-border pb-6 print:border-black/20">
          <div>
            <Logo size="md" />
            <p className="text-xs text-dbs-silver mt-2 print:text-black/60">Digital Business Store — Burkina Faso</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-dbs-gold print:text-black">REÇU DE COMMANDE</p>
            <p className="text-sm text-dbs-silver print:text-black/60">#{order.orderNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 text-sm border-b border-dbs-border print:border-black/20">
          <div>
            <p className="text-dbs-muted print:text-black/50">Date</p>
            <p className="font-medium">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-dbs-muted print:text-black/50">Client</p>
            <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
          </div>
          <div>
            <p className="text-dbs-muted print:text-black/50">Téléphone</p>
            <p className="font-medium">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-dbs-muted print:text-black/50">Mode de paiement</p>
            <p className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</p>
          </div>
        </div>

        <div className="py-6 border-b border-dbs-border print:border-black/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-dbs-muted print:text-black/50">
                <th className="pb-2 font-normal">Produit</th>
                <th className="pb-2 font-normal text-center">Qté</th>
                <th className="pb-2 font-normal text-right">Prix unitaire</th>
                <th className="pb-2 font-normal text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.product.id} className="border-t border-dbs-border/50 print:border-black/10">
                  <td className="py-2 pr-2">{item.product.name}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">{formatPrice(item.product.price)}</td>
                  <td className="py-2 text-right font-medium">{formatPrice(item.product.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="py-6 flex flex-col sm:flex-row gap-6 sm:items-end sm:justify-between">
          <div className="space-y-1.5 text-sm sm:order-2">
            <div className="flex justify-between gap-8"><span className="text-dbs-muted print:text-black/50">Sous-total</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between gap-8"><span className="text-dbs-muted print:text-black/50">Livraison</span><span>{order.shipping === 0 ? 'Gratuite' : formatPrice(order.shipping)}</span></div>
            {order.discount > 0 && <div className="flex justify-between gap-8 text-green-500"><span>Remise</span><span>-{formatPrice(order.discount)}</span></div>}
            <div className="flex justify-between gap-8 text-base font-bold pt-2 border-t border-dbs-border print:border-black/20"><span>Total</span><span className="text-dbs-gold print:text-black">{formatPrice(order.total)}</span></div>
          </div>
          <div className="flex flex-col items-center gap-2 sm:order-1">
            <QRCode value={qrValue} size={110} />
            <p className="text-[10px] text-dbs-muted print:text-black/50">Scanner pour vérifier</p>
          </div>
        </div>

        <div className="pt-4 border-t border-dbs-border print:border-black/20 flex items-center gap-2 text-sm text-dbs-silver print:text-black/60">
          <CheckCircle size={16} className="text-green-500 shrink-0" />
          Merci pour votre confiance — DBS, l'innovation au service de votre quotidien.
        </div>
      </div>
    </div>
  )
}
