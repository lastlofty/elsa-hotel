import { Logo } from '@/components/Logo'

export function Blocked() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <Logo size={88} className="mb-6 opacity-90" />

      <div className="text-[10px] tracking-[0.4em] uppercase text-gold-400/70 mb-3">
        Elsa-Hotel
      </div>

      <h1 className="font-display text-4xl text-cream mb-4 leading-tight max-w-sm">
        Доступ ограничен
      </h1>

      <div className="hairline w-32 mb-6" />

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mb-8">
        Ваш аккаунт не зарегистрирован в системе.
        <br />
        Для получения доступа обратитесь на ресепшн отеля.
      </p>

      <div className="card px-6 py-5 max-w-xs w-full">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold-400/70 mb-2">
          Ресепшн
        </div>
        <a
          href="tel:+37160000000"
          className="font-display text-2xl gold-text leading-none block"
        >
          +371 6 000 0000
        </a>
        <div className="text-xs text-[var(--text-muted)] mt-2">
          Круглосуточно · 24/7
        </div>
      </div>
    </div>
  )
}
