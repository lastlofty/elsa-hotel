import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Затемняющий слой */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Контейнер */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-md bg-ink-900 border-t sm:border border-gold-400/20 sm:rounded-2xl rounded-t-3xl shadow-2xl animate-slide-up max-h-[92vh] flex flex-col"
      >
        {/* Drag-индикатор */}
        <div className="sm:hidden flex justify-center pt-2">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Заголовок */}
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="font-display text-2xl text-cream">{title}</h2>
        </div>

        {/* Содержимое */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {/* Футер */}
        {footer && (
          <div className="px-5 py-4 border-t border-white/5 flex gap-2">{footer}</div>
        )}
      </div>
    </div>
  )
}
