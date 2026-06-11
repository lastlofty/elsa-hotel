import { Logo } from './Logo'
import { ROLE_LABELS, type Role } from '@/types'

interface HeaderProps {
  role: Role
  userName: string
  subtitle?: string
}

export function Header({ role, userName, subtitle }: HeaderProps) {
  return (
    <header className="px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <Logo size={44} />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.3em] text-gold-400 uppercase">
            Elsa-Hotel
          </div>
          <div className="font-display text-2xl text-cream leading-tight truncate">
            {userName}
          </div>
        </div>
        <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-full border border-gold-400/30 text-gold-300 bg-gold-400/5 whitespace-nowrap">
          {ROLE_LABELS[role]}
        </span>
      </div>

      {subtitle && (
        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className="hairline mt-5" />
    </header>
  )
}
