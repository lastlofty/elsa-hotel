/**
 * Обертка над Telegram WebApp SDK.
 * Если приложение запущено вне Telegram (обычный браузер для разработки)
 * — отдаём моки, чтобы не падало.
 */

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: TelegramUser
    auth_date?: number
    hash?: string
  }
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
  isExpanded: boolean
  viewportHeight: number
  ready: () => void
  expand: () => void
  close: () => void
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  MainButton: {
    text: string
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
    offClick: (cb: () => void) => void
    setText: (t: string) => void
  }
  BackButton: {
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
    offClick: (cb: () => void) => void
  }
  showAlert: (msg: string, cb?: () => void) => void
  showConfirm: (msg: string, cb?: (ok: boolean) => void) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export function getTg(): TelegramWebApp | null {
  return window.Telegram?.WebApp ?? null
}

export function initTelegram(): void {
  const tg = getTg()
  if (!tg) {
    console.info('[Elsa] Запущено вне Telegram — режим разработки.')
    return
  }
  tg.ready()
  tg.expand()
}

export function getCurrentTelegramUser(): TelegramUser | null {
  const tg = getTg()
  return tg?.initDataUnsafe?.user ?? null
}

export function haptic(
  type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' = 'light'
): void {
  const tg = getTg()
  if (!tg?.HapticFeedback) return
  if (type === 'success' || type === 'error' || type === 'warning') {
    tg.HapticFeedback.notificationOccurred(type)
  } else {
    tg.HapticFeedback.impactOccurred(type)
  }
}

export function tgConfirm(message: string): Promise<boolean> {
  const tg = getTg()
  if (!tg) return Promise.resolve(window.confirm(message))
  return new Promise((resolve) => {
    tg.showConfirm(message, (ok) => resolve(ok))
  })
}

export function tgAlert(message: string): Promise<void> {
  const tg = getTg()
  if (!tg) {
    window.alert(message)
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    tg.showAlert(message, () => resolve())
  })
}
