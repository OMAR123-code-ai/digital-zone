import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '22673190710'
const MESSAGE = encodeURIComponent("Bonjour DBS, j'ai une question concernant vos produits.")

/**
 * Bouton flottant WhatsApp → +226 73 19 07 10
 * Icône blanche intégrée (pas de carré blanc autour).
 */
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="print:hidden fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg shadow-green-500/40 transition-all hover:scale-105"
      aria-label="Contacter sur WhatsApp"
    >
      {/* Icône téléphone style WhatsApp, blanche, sans fond blanc */}
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15">
        <MessageCircle size={18} fill="white" strokeWidth={0} className="text-white" />
      </span>
      <span className="font-semibold text-sm tracking-wide">WhatsApp</span>
    </a>
  )
}
