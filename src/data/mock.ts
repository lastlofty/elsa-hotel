import type { Admin, Guest, SuperAdmin, ActionLog } from '@/types'

// ───────────────── SUPER ADMINS (владельцы) ─────────────────
export const mockSuperAdmins: SuperAdmin[] = [
  {
    id: 'sa-001',
    telegramId: 100000001,
    firstName: 'Эльза',
    lastName: 'Бергманн',
    username: 'elsa_owner',
    phone: '+371 20 000 001',
    role: 'super_admin',
    createdAt: '2024-01-01T08:00:00Z',
  },
]

// ───────────────── ADMINS (ресепшен) ─────────────────
export const mockAdmins: Admin[] = [
  {
    id: 'a-001',
    telegramId: 200000001,
    firstName: 'Анна',
    lastName: 'Калниня',
    username: 'anna_reception',
    phone: '+371 20 100 001',
    role: 'admin',
    position: 'Старший администратор',
    shift: 'day',
    createdAt: '2024-03-15T09:00:00Z',
    createdBy: 'sa-001',
  },
  {
    id: 'a-002',
    telegramId: 200000002,
    firstName: 'Дмитрий',
    lastName: 'Озолс',
    username: 'dmitry_night',
    phone: '+371 20 100 002',
    role: 'admin',
    position: 'Ночной администратор',
    shift: 'night',
    createdAt: '2024-04-02T22:00:00Z',
    createdBy: 'sa-001',
  },
  {
    id: 'a-003',
    telegramId: 200000003,
    firstName: 'Лаура',
    lastName: 'Лиепа',
    username: 'laura_concierge',
    phone: '+371 20 100 003',
    role: 'admin',
    position: 'Консьерж',
    shift: 'flex',
    createdAt: '2024-06-10T14:00:00Z',
    createdBy: 'sa-001',
  },
]

// ───────────────── GUESTS ─────────────────
const today = new Date()
const inDays = (n: number) => new Date(today.getTime() + n * 86_400_000).toISOString()
const daysAgo = (n: number) => new Date(today.getTime() - n * 86_400_000).toISOString()

export const mockGuests: Guest[] = [
  {
    id: 'g-001',
    telegramId: 300000001,
    firstName: 'Михаил',
    lastName: 'Петровс',
    username: 'mikhail_p',
    phone: '+371 21 200 001',
    role: 'guest',
    roomNumber: '301',
    checkIn: daysAgo(1),
    checkOut: inDays(2),
    status: 'active',
    notes: 'Поздний заезд, вид на море.',
    createdAt: daysAgo(3),
    createdBy: 'a-001',
  },
  {
    id: 'g-002',
    telegramId: 300000002,
    firstName: 'Ольга',
    lastName: 'Берзиня',
    phone: '+371 21 200 002',
    role: 'guest',
    roomNumber: '512',
    checkIn: daysAgo(2),
    checkOut: inDays(5),
    status: 'active',
    notes: 'Свадебное путешествие — приготовить шампанское.',
    createdAt: daysAgo(5),
    createdBy: 'a-001',
  },
  {
    id: 'g-003',
    telegramId: 300000003,
    firstName: 'Артур',
    lastName: 'Вилкс',
    username: 'arturs_v',
    role: 'guest',
    roomNumber: '208',
    checkIn: inDays(1),
    checkOut: inDays(7),
    status: 'pending',
    createdAt: daysAgo(1),
    createdBy: 'a-002',
  },
  {
    id: 'g-004',
    telegramId: 300000004,
    firstName: 'Sofia',
    lastName: 'Müller',
    phone: '+49 30 1234 567',
    role: 'guest',
    roomNumber: '410',
    checkIn: daysAgo(7),
    checkOut: daysAgo(1),
    status: 'checked_out',
    notes: 'Постоянный гость, аллергия на орехи.',
    createdAt: daysAgo(10),
    createdBy: 'a-003',
  },
  {
    id: 'g-005',
    telegramId: 300000005,
    firstName: 'Янис',
    lastName: 'Калниньш',
    phone: '+371 21 200 005',
    role: 'guest',
    roomNumber: '105',
    checkIn: daysAgo(0),
    checkOut: inDays(3),
    status: 'active',
    createdAt: daysAgo(2),
    createdBy: 'a-001',
  },
]

// ───────────────── LOGS ─────────────────
export const mockLogs: ActionLog[] = [
  {
    id: 'log-001',
    actorId: 'a-001',
    actorRole: 'admin',
    action: 'create_guest',
    targetId: 'g-005',
    targetName: 'Янис Калниньш',
    timestamp: daysAgo(2),
  },
  {
    id: 'log-002',
    actorId: 'sa-001',
    actorRole: 'super_admin',
    action: 'create_admin',
    targetId: 'a-003',
    targetName: 'Лаура Лиепа',
    timestamp: '2024-06-10T14:00:00Z',
  },
  {
    id: 'log-003',
    actorId: 'a-003',
    actorRole: 'admin',
    action: 'check_out',
    targetId: 'g-004',
    targetName: 'Sofia Müller',
    timestamp: daysAgo(1),
  },
]

// ───────────────── Симулируемый "текущий пользователь" ─────────────────
// В реальности — определялся бы по Telegram initData.
// Для разработки можно переключать роль через UI (см. RoleSwitcher).
export const DEV_DEFAULT_ROLE = 'super_admin' as const
