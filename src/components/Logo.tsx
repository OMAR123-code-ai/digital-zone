import { Link } from 'react-router-dom'
import { useState } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const [srcIndex, setSrcIndex] = useState(0)
  const sources = ['/logo-dbs.png', '/logo-dbs.svg']
  const sizes = {
    sm: { icon: 36, text: 'text-sm' },
    md: { icon: 48, text: 'text-base' },
    lg: { icon: 72, text: 'text-xl' },
  }
  const s = sizes[size]
  const showImg = srcIndex < sources.length

  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      {showImg ? (
        <img
          src={sources[srcIndex]}
          alt="DBS Digital Business Store"
          width={s.icon}
          height={s.icon}
          className="object-contain shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]"
          onError={() => setSrcIndex((i) => i + 1)}
        />
      ) : (
        <div className="relative flex items-center justify-center shrink-0" style={{ width: s.icon, height: s.icon }}>
          <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 58 A32 32 0 1 1 68 58" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="28" y="32" width="8" height="22" rx="1" fill="url(#goldGrad)" />
            <rect x="38" y="24" width="8" height="30" rx="1" fill="url(#goldGrad)" />
            <rect x="48" y="28" width="8" height="26" rx="1" fill="url(#goldGrad)" />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B8962E" />
                <stop offset="50%" stopColor="#F5D76E" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-wider ${s.text}`}>
            <span className="gold-text">DB</span>
            <span className="silver-text">S</span>
          </span>
          <span className="text-[9px] text-dbs-silver tracking-[0.15em] uppercase hidden sm:block mt-0.5">
            Digital Business Store
          </span>
        </div>
      )}
    </Link>
  )
}
