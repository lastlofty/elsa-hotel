interface BackBarProps {
  onBack: () => void
  title?: string
}

export function BackBar({ onBack, title }: BackBarProps) {
  return (
    <div className="px-3 pt-3 flex items-center">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gold-300 active:opacity-60 px-2 py-1.5 rounded-lg"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Назад
      </button>
      {title && (
        <span className="ml-auto mr-3 text-xs uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </span>
      )}
    </div>
  )
}
