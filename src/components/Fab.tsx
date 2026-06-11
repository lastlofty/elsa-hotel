interface FabProps {
  onClick: () => void
  label?: string
}

export function Fab({ onClick, label = 'Добавить' }: FabProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-20 right-5 z-30 px-5 py-3.5 rounded-full bg-gold-gradient text-ink-950 font-semibold shadow-gold-glow flex items-center gap-2 active:scale-95 transition-transform"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  )
}
