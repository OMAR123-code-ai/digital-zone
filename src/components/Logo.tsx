import { Link } from 'react-router-dom'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-sm' },
    md: { icon: 40, text: 'text-lg' },
    lg: { icon: 56, text: 'text-2xl' },
  }
  const s = sizes[size]

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-lg gold-gradient shadow-lg shadow-dbs-gold/20 group-hover:shadow-dbs-gold/40 transition-shadow"
        style={{ width: s.icon, height: s.icon }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-3/5 h-3/5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="18" width="6" height="14" fill="#050505" rx="1" />
          <rect x="17" y="10" width="6" height="22" fill="#050505" rx="1" />
          <rect x="26" y="14" width="6" height="18" fill="#050505" rx="1" />
          <path d="M12 18 L20 8 L28 18" stroke="#050505" strokeWidth="2" fill="none" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-wider gold-text ${s.text}`}>DBS</span>
          <span className="text-[10px] text-dbs-silver tracking-widest uppercase hidden sm:block">
            Digital Business Store
          </span>
        </div>
      )}
    </Link>
  )
}
