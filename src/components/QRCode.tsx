import { useEffect, useRef } from 'react'
import QRCodeLib from 'qrcode'

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

/**
 * QR code généré localement (aucun appel réseau, aucune API externe).
 * Utilisé pour vérifier un reçu de commande ou un numéro de suivi.
 */
export function QRCode({ value, size = 120, className = '' }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    QRCodeLib.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: { dark: '#0a0a0a', light: '#F5F5F5' },
    }).catch(() => {})
  }, [value, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`rounded-lg bg-dbs-white p-1.5 ${className}`}
      aria-label="QR code de vérification"
    />
  )
}
