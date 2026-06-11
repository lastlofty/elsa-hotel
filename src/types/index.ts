// ───────────────── Роли в системе ─────────────────
export type Role = 'super_admin' | 'admin' | 'guest' | 'unregistered'

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Владелец',
  admin: 'Администратор',
  guest: 'Гость',
  unregistered: 'Не зарегистрирован',
}

// ───────────────── Базовая сущность пользователя ─────────────────
export interface BaseUser {
  id: string
  telegramId: number
  firstName: string
  lastName?: string
  username?: string
  phone?: string
  createdAt: string // ISO
  createdBy?: string // id того, кто добавил
}

// ───────────────── Super Admin (владелец) ─────────────────
export interface SuperAdmin extends BaseUser {
  role: 'super_admin'
}

// ───────────────── Admin (ресепшен) ─────────────────
export interface Admin extends BaseUser {
  role: 'admin'
  position?: string // должность: ресепшен, менеджер...
  shift?: 'day' | 'night' | 'flex'
}

// ───────────────── Guest ─────────────────
export type GuestStatus = 'active' | 'checked_out' | 'pending'

export interface Guest extends BaseUser {
  role: 'guest'
  roomNumber?: string
  checkIn: string // ISO
  checkOut: string // ISO
  status: GuestStatus
  notes?: string
}

export type AnyUser = SuperAdmin | Admin | Guest

// ───────────────── Логи действий (для будущей админки) ─────────────────
export type LogAction =
  | 'create_admin'
  | 'update_admin'
  | 'delete_admin'
  | 'create_guest'
  | 'update_guest'
  | 'delete_guest'
  | 'check_out'

export interface ActionLog {
  id: string
  actorId: string
  actorRole: Role
  action: LogAction
  targetId: string
  targetName: string
  timestamp: string
  details?: string
}
