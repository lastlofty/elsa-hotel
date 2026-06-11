import { useHotelStore } from '@/store/hotel'
import type { Role } from '@/types'
import { useNavigate } from 'react-router-dom'

const ROLES: { role: Role; label: string; path: string }[] = [
  { role: 'super_admin', label: 'Владелец', path: '/super-admin' },
  { role: 'admin', label: 'Админ', path: '/admin' },
  { role: 'guest', label: 'Гость', path: '/guest' },
  { role: 'unregistered', label: 'Не зарег.', path: '/blocked' },
]

/**
 * DEV-only переключатель ролей.
 * В Telegram WebApp реальная роль определяется по initData.
 */
export function RoleSwitcher() {
  const currentRole = useHotelStore((s) => s.currentRole)
  const setCurrentRole = useHotelStore((s) => s.setCurrentRole)
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 px-2 py-1.5 rounded-full bg-ink-900/90 backdrop-blur-md border border-gold-400/20 shadow-2xl flex gap-1">
      {ROLES.map(({ role, label, path }) => (
        <button
          key={role}
          onClick={() => {
            setCurrentRole(role)
            navigate(path)
          }}
          className={`px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-full transition-all ${
            currentRole === role
              ? 'bg-gold-400 text-ink-950 font-semibold'
              : 'text-[var(--text-secondary)] hover:text-gold-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
