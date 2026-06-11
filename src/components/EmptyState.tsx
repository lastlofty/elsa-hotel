interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-gold-400/20 bg-gold-400/5 flex items-center justify-center text-gold-400/60">
        {icon ?? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <h3 className="font-display text-xl text-cream mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
