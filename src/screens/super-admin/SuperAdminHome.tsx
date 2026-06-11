import { useNavigate } from 'react-router-dom'
import { useHotelStore } from '@/store/hotel'
import { Header } from '@/components/Header'

export function SuperAdminHome() {
  const navigate = useNavigate()
  const admins = useHotelStore((s) => s.admins)
  const guests = useHotelStore((s) => s.guests)
  const logs = useHotelStore((s) => s.logs)
  const owner = useHotelStore((s) => s.superAdmins[0])

  const activeGuests = guests.filter((g) => g.status === 'active').length
  const pendingGuests = guests.filter((g) => g.status === 'pending').length

  return (
    <div className="min-h-screen pb-32">
      <Header
        role="super_admin"
        userName={`${owner.firstName} ${owner.lastName ?? ''}`.trim()}
        subtitle="Главная панель владельца. Полный доступ ко всем сотрудникам и гостям отеля."
      />

      <main className="px-5 space-y-6">
        {/* Статистика */}
        <section className="grid grid-cols-3 gap-2">
          <StatCard label="Админов" value={admins.length} />
          <StatCard label="Гостей" value={activeGuests} accent />
          <StatCard label="Ожидание" value={pendingGuests} />
        </section>

        {/* Раздел: Администраторы */}
        <SectionCard
          eyebrow="Управление персоналом"
          title="Администраторы"
          description="Сотрудники ресепшен и менеджеры. Они управляют гостями отеля."
          stat={`${admins.length} ${pluralize(admins.length, ['человек', 'человека', 'человек'])}`}
          onClick={() => navigate('/super-admin/admins')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        {/* Раздел: Гости */}
        <SectionCard
          eyebrow="Контроль доступа"
          title="Гости отеля"
          description="Все, кто заселён или ожидает заселения. Можно редактировать напрямую."
          stat={`${guests.length} ${pluralize(guests.length, ['гость', 'гостя', 'гостей'])}`}
          onClick={() => navigate('/super-admin/guests')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        {/* Лента событий */}
        <section>
          <div className="ornament mb-3">Последние действия</div>
          <div className="space-y-2">
            {logs.slice(0, 5).map((log) => (
              <ActivityRow key={log.id} log={log} />
            ))}
            {logs.length === 0 && (
              <p className="text-sm text-[var(--text-muted)] text-center py-4">
                Действий пока нет
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div className="card p-3 text-center">
      <div
        className={`font-display text-3xl ${
          accent ? 'gold-text' : 'text-cream'
        } leading-none`}
      >
        {value}
      </div>
      <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mt-1.5">
        {label}
      </div>
    </div>
  )
}

function SectionCard({
  eyebrow,
  title,
  description,
  stat,
  icon,
  onClick,
}: {
  eyebrow: string
  title: string
  description: string
  stat: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="card w-full text-left p-5 group active:scale-[0.99]"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.2em] uppercase text-gold-400/70 mb-1">
            {eyebrow}
          </div>
          <h3 className="font-display text-2xl text-cream leading-tight mb-1">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gold-300">{stat}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gold-400 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  )
}

function ActivityRow({ log }: { log: ReturnType<typeof useHotelStore.getState>['logs'][number] }) {
  const actionLabels: Record<typeof log.action, string> = {
    create_admin: 'добавил администратора',
    update_admin: 'изменил администратора',
    delete_admin: 'удалил администратора',
    create_guest: 'добавил гостя',
    update_guest: 'изменил гостя',
    delete_guest: 'удалил гостя',
    check_out: 'выписал гостя',
  }

  const isDelete = log.action.startsWith('delete')

  return (
    <div className="flex items-center gap-3 text-xs py-2 px-3 rounded-lg bg-white/[0.02]">
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isDelete ? 'bg-red-400' : 'bg-gold-400'
        } shrink-0`}
      />
      <span className="text-[var(--text-secondary)] flex-1 truncate">
        {actionLabels[log.action]}{' '}
        <span className="text-cream">{log.targetName}</span>
      </span>
      <span className="text-[var(--text-muted)] font-mono text-[10px] shrink-0">
        {formatRelative(log.timestamp)}
      </span>
    </div>
  )
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return 'сейчас'
  if (m < 60) return `${m} мин`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} ч`
  const d = Math.floor(h / 24)
  return `${d} д`
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
