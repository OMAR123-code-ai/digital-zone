import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '22673190710'
const MESSAGE = encodeURIComponent("Bonjour DBS, j'ai une question concernant vos produits.")

/**
 * Icône optionnelle : place public/whatsapp-icon.png
 * Sinon icône Lucide par défaut.
 */
export function WhatsAppButton() {
  const [useCustom, setUseCustom] = useState(true)

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="print:hidden fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105"
      aria-label="Contacter sur WhatsApp"
    >
      {useCustom ? (
        <img
          src="/whatsapp-icon.png"
          alt=""
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
          onError={() => setUseCustom(false)}
        />
      ) : (
        <MessageCircle size={24} fill="white" />
      )}
      <span className="hidden sm:inline font-medium text-sm pr-1">WhatsApp</span>
    </a>
  )
}
