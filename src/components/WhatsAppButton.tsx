import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '22677177636'
const MESSAGE = encodeURIComponent('Bonjour DBS, j\'ai une question concernant vos produits.')

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle size={24} fill="white" />
      <span className="hidden sm:inline font-medium text-sm pr-1">WhatsApp</span>
    </a>
  )
}
