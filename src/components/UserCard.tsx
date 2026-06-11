import type { Admin, Guest } from '@/types'

type Props = {
  user: Admin | Guest
  onClick?: () => void
  rightSlot?: React.ReactNode
}

export function UserCard({ user, onClick, rightSlot }: Props) {
  const initials =
    (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? user.firstName?.[1] ?? '')

  // Подзаголовок зависит от типа пользователя
  let subtitle = ''
  let badge: { label: string; tone: 'gold' | 'emerald' | 'muted' | 'danger' } | null = null

  if (user.role === 'admin') {
    subtitle = user.position ?? 'Администратор'
    if (user.shift === 'day') badge = { label: 'День', tone: 'gold' }
    else if (user.shift === 'night') badge = { label: 'Ночь', tone: 'muted' }
    else if (user.shift === 'flex') badge = { label: 'Гибкий', tone: 'emerald' }
  } else {
    subtitle = user.roomNumber ? `Номер ${user.roomNumber}` : 'Номер не назначен'
    if (user.status === 'active') badge = { label: 'Заселён', tone: 'emerald' }
    else if (user.status === 'pending') badge = { label: 'Ожидание', tone: 'gold' }
    else badge = { label: 'Выехал', tone: 'muted' }
  }

  const toneClasses = {
    gold: 'border-gold-400/40 text-gold-300 bg-gold-400/5',
    emerald: 'border-emerald_h-400/40 text-emerald_h-400 bg-emerald_h-400/5',
    muted: 'border-white/10 text-[var(--text-muted)] bg-white/[0.02]',
    danger: 'border-red-500/30 text-red-400 bg-red-500/5',
  }

  return (
    <button
      onClick={onClick}
      className="card w-full text-left p-4 flex items-center gap-3 active:scale-[0.99]"
    >
      {/* Аватар */}
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400/20 to-emerald_h-500/20 border border-gold-400/30 flex items-center justify-center font-display text-lg text-gold-300 shrink-0 uppercase">
        {initials || '?'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-cream truncate">
            {user.firstName} {user.lastName ?? ''}
          </span>
          {user.username && (
            <span className="text-xs text-[var(--text-muted)] font-mono shrink-0">
              @{user.username}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-[var(--text-secondary)] truncate">{subtitle}</span>
          {badge && (
            <span
              className={`px-1.5 py-0.5 text-[9px] tracking-wider uppercase rounded border shrink-0 ${toneClasses[badge.tone]}`}
            >
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {rightSlot ?? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold-400/60"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      )}
    </button>
  )
}
