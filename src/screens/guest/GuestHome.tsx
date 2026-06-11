import { useHotelStore } from '@/store/hotel'
import { Header } from '@/components/Header'

export function GuestHome() {
  const guests = useHotelStore((s) => s.guests)
  const currentUserId = useHotelStore((s) => s.currentUserId)
  const me = guests.find((g) => g.id === currentUserId) ?? guests[0]

  if (!me) {
    return (
      <div className="min-h-screen p-5 flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Гость не найден</p>
      </div>
    )
  }

  const nights = Math.max(
    1,
    Math.round(
      (new Date(me.checkOut).getTime() - new Date(me.checkIn).getTime()) / 86_400_000
    )
  )

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(me.checkOut).getTime() - Date.now()) / 86_400_000)
  )

  const statusInfo = {
    active: { label: 'Вы заселены', tone: 'emerald' as const },
    pending: { label: 'Ожидание заселения', tone: 'gold' as const },
    checked_out: { label: 'Спасибо за визит', tone: 'muted' as const },
  }[me.status]

  return (
    <div className="min-h-screen pb-32">
      <Header
        role="guest"
        userName={`${me.firstName} ${me.lastName ?? ''}`.trim()}
        subtitle="Ваш личный кабинет в Elsa-Hotel."
      />

      <main className="px-5 space-y-5">
        {/* Главная карточка брони */}
        <section className="card p-6 relative overflow-hidden">
          {/* Декоративный фон */}
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-emerald_h-500/5 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  statusInfo.tone === 'emerald'
                    ? 'bg-emerald_h-400 animate-pulse'
                    : statusInfo.tone === 'gold'
                      ? 'bg-gold-400'
                      : 'bg-white/20'
                }`}
              />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]">
                {statusInfo.label}
              </span>
            </div>

            {me.roomNumber && (
              <>
                <div className="font-display text-7xl gold-text leading-none mt-3">
                  {me.roomNumber}
                </div>
                <div className="text-xs tracking-[0.25em] uppercase text-[var(--text-muted)] mt-2">
                  Номер
                </div>
              </>
            )}

            <div className="hairline my-5" />

            <div className="grid grid-cols-2 gap-4">
              <DateBlock label="Заезд" date={me.checkIn} />
              <DateBlock label="Выезд" date={me.checkOut} />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)]">
                {nights} {pluralize(nights, ['ночь', 'ночи', 'ночей'])}
              </span>
              {me.status === 'active' && daysLeft > 0 && (
                <span className="text-gold-300 font-mono">
                  Осталось: {daysLeft} {pluralize(daysLeft, ['день', 'дня', 'дней'])}
                </span>
              )}
            </div>
          </div>
        </section>

        {me.notes && (
          <section className="card p-4">
            <div className="text-[10px] tracking-[0.2em] uppercase text-gold-400/70 mb-2">
              Особые пожелания
            </div>
            <p className="text-sm text-cream leading-relaxed">{me.notes}</p>
          </section>
        )}

        {/* В разработке — placeholder для будущих функций */}
        <section>
          <div className="ornament mb-4">Скоро в приложении</div>
          <div className="grid grid-cols-2 gap-2">
            <ComingSoonTile
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 7h18M3 7l1 12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              }
              title="Сервисы"
              text="Завтрак, спа, прачечная"
            />
            <ComingSoonTile
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
              title="Чат"
              text="Связь с ресепшен"
            />
            <ComingSoonTile
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              }
              title="События"
              text="Афиша отеля"
            />
            <ComingSoonTile
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                </svg>
              }
              title="Программа лояльности"
              text="Бонусы и привилегии"
            />
          </div>
        </section>

        <p className="text-center text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] pt-2">
          Раздел «Гость» в разработке
        </p>
      </main>
    </div>
  )
}

function DateBlock({ label, date }: { label: string; date: string }) {
  const d = new Date(date)
  return (
    <div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1">
        {label}
      </div>
      <div className="font-display text-2xl text-cream leading-tight">
        {d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })}
      </div>
      <div className="text-xs text-[var(--text-secondary)] font-mono">
        {d.toLocaleDateString('ru-RU', { weekday: 'short', year: 'numeric' })}
      </div>
    </div>
  )
}

function ComingSoonTile({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="card p-4 opacity-60">
      <div className="text-gold-400/60 mb-2">{icon}</div>
      <div className="font-display text-base text-cream">{title}</div>
      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{text}</div>
    </div>
  )
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
