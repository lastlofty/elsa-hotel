import { useNavigate } from 'react-router-dom'
import { useHotelStore } from '@/store/hotel'
import { Header } from '@/components/Header'

export function AdminHome() {
  const navigate = useNavigate()
  const guests = useHotelStore((s) => s.guests)
  const admins = useHotelStore((s) => s.admins)
  const currentUserId = useHotelStore((s) => s.currentUserId)

  const me = admins.find((a) => a.id === currentUserId) ?? admins[0]

  const active = guests.filter((g) => g.status === 'active').length
  const pending = guests.filter((g) => g.status === 'pending').length
  const arrivingToday = guests.filter((g) => {
    const today = new Date().toDateString()
    return new Date(g.checkIn).toDateString() === today && g.status !== 'checked_out'
  }).length
  const leavingToday = guests.filter((g) => {
    const today = new Date().toDateString()
    return new Date(g.checkOut).toDateString() === today && g.status === 'active'
  }).length

  return (
    <div className="min-h-screen pb-32">
      <Header
        role="admin"
        userName={`${me.firstName} ${me.lastName ?? ''}`.trim()}
        subtitle={`${me.position ?? 'Администратор'} · ${me.shift === 'day' ? 'дневная смена' : me.shift === 'night' ? 'ночная смена' : 'гибкий график'}`}
      />

      <main className="px-5 space-y-5">
        {/* Большая дневная сводка */}
        <section className="card p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold-400/70 mb-2">
            Сегодня в отеле
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="font-display text-6xl gold-text leading-none">{active}</span>
            <span className="text-sm text-[var(--text-secondary)] mb-2">
              {pluralize(active, ['гость заселён', 'гостя заселены', 'гостей заселены'])}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <MiniStat label="Заезд сегодня" value={arrivingToday} />
            <MiniStat label="Выезд сегодня" value={leavingToday} />
          </div>
        </section>

        {/* Главное действие — гости */}
        <button
          onClick={() => navigate('/admin/guests')}
          className="card w-full text-left p-5 group active:scale-[0.99]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.2em] uppercase text-gold-400/70 mb-1">
                Управление
              </div>
              <h3 className="font-display text-2xl text-cream leading-tight mb-1">
                Гости
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Заселение, выселение, редактирование данных
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gold-400 self-center group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        {/* Ожидающие — быстрая лента */}
        {pending > 0 && (
          <section>
            <div className="ornament mb-3">Ожидают заселения</div>
            <div className="space-y-2">
              {guests
                .filter((g) => g.status === 'pending')
                .slice(0, 3)
                .map((g) => (
                  <button
                    key={g.id}
                    onClick={() => navigate('/admin/guests')}
                    className="w-full card p-3 flex items-center gap-3 text-left active:scale-[0.99]"
                  >
                    <div className="w-9 h-9 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-300 text-sm font-semibold shrink-0">
                      {g.firstName[0]}
                      {g.lastName?.[0] ?? ''}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-cream truncate">
                        {g.firstName} {g.lastName ?? ''}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Заезд {formatDate(g.checkIn)} · номер {g.roomNumber ?? '—'}
                      </div>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-gold-400/30 text-gold-300 shrink-0">
                      Ждёт
                    </span>
                  </button>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-ink-950/50 border border-white/5 rounded-xl p-3">
      <div className="font-display text-2xl text-cream leading-none">{value}</div>
      <div className="text-[10px] tracking-wider uppercase text-[var(--text-muted)] mt-1">
        {label}
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
