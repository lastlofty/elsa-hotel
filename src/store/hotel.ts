import { create } from 'zustand'
import type { Admin, Guest, SuperAdmin, ActionLog, Role } from '@/types'
import {
  mockAdmins,
  mockGuests,
  mockSuperAdmins,
  mockLogs,
  DEV_DEFAULT_ROLE,
} from '@/data/mock'

interface HotelState {
  // Текущий пользователь (для разработки можно переключать)
  currentUserId: string
  currentRole: Role

  superAdmins: SuperAdmin[]
  admins: Admin[]
  guests: Guest[]
  logs: ActionLog[]

  // ───── Переключение роли (DEV) ─────
  setCurrentRole: (role: Role) => void

  // ───── ADMINS ─────
  addAdmin: (data: Omit<Admin, 'id' | 'role' | 'createdAt'>) => Admin
  updateAdmin: (id: string, patch: Partial<Omit<Admin, 'id' | 'role'>>) => void
  deleteAdmin: (id: string) => void

  // ───── GUESTS ─────
  addGuest: (data: Omit<Guest, 'id' | 'role' | 'createdAt'>) => Guest
  updateGuest: (id: string, patch: Partial<Omit<Guest, 'id' | 'role'>>) => void
  deleteGuest: (id: string) => void

  // ───── Утилиты ─────
  findUserByTelegramId: (tgId: number) => {
    user: SuperAdmin | Admin | Guest | null
    role: Role
  }
}

const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`

const now = () => new Date().toISOString()

export const useHotelStore = create<HotelState>((set, get) => ({
  currentUserId: 'sa-001',
  currentRole: DEV_DEFAULT_ROLE,

  superAdmins: mockSuperAdmins,
  admins: mockAdmins,
  guests: mockGuests,
  logs: mockLogs,

  setCurrentRole: (role) => {
    // При смене роли подставляем "соответствующего" дефолтного пользователя
    const state = get()
    let newId = state.currentUserId
    if (role === 'super_admin') newId = state.superAdmins[0]?.id ?? 'sa-001'
    if (role === 'admin') newId = state.admins[0]?.id ?? 'a-001'
    if (role === 'guest') newId = state.guests[0]?.id ?? 'g-001'
    if (role === 'unregistered') newId = ''
    set({ currentRole: role, currentUserId: newId })
  },

  // ───────────── ADMINS ─────────────
  addAdmin: (data) => {
    const admin: Admin = {
      ...data,
      id: uid('a'),
      role: 'admin',
      createdAt: now(),
      createdBy: get().currentUserId,
    }
    set((s) => ({
      admins: [admin, ...s.admins],
      logs: [
        {
          id: uid('log'),
          actorId: s.currentUserId,
          actorRole: s.currentRole,
          action: 'create_admin',
          targetId: admin.id,
          targetName: `${admin.firstName} ${admin.lastName ?? ''}`.trim(),
          timestamp: now(),
        },
        ...s.logs,
      ],
    }))
    return admin
  },

  updateAdmin: (id, patch) => {
    set((s) => ({
      admins: s.admins.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      logs: [
        {
          id: uid('log'),
          actorId: s.currentUserId,
          actorRole: s.currentRole,
          action: 'update_admin',
          targetId: id,
          targetName: s.admins.find((a) => a.id === id)?.firstName ?? id,
          timestamp: now(),
        },
        ...s.logs,
      ],
    }))
  },

  deleteAdmin: (id) => {
    const target = get().admins.find((a) => a.id === id)
    set((s) => ({
      admins: s.admins.filter((a) => a.id !== id),
      logs: [
        {
          id: uid('log'),
          actorId: s.currentUserId,
          actorRole: s.currentRole,
          action: 'delete_admin',
          targetId: id,
          targetName: target ? `${target.firstName} ${target.lastName ?? ''}`.trim() : id,
          timestamp: now(),
        },
        ...s.logs,
      ],
    }))
  },

  // ───────────── GUESTS ─────────────
  addGuest: (data) => {
    const guest: Guest = {
      ...data,
      id: uid('g'),
      role: 'guest',
      createdAt: now(),
      createdBy: get().currentUserId,
    }
    set((s) => ({
      guests: [guest, ...s.guests],
      logs: [
        {
          id: uid('log'),
          actorId: s.currentUserId,
          actorRole: s.currentRole,
          action: 'create_guest',
          targetId: guest.id,
          targetName: `${guest.firstName} ${guest.lastName ?? ''}`.trim(),
          timestamp: now(),
        },
        ...s.logs,
      ],
    }))
    return guest
  },

  updateGuest: (id, patch) => {
    set((s) => ({
      guests: s.guests.map((g) => (g.id === id ? { ...g, ...patch } : g)),
      logs: [
        {
          id: uid('log'),
          actorId: s.currentUserId,
          actorRole: s.currentRole,
          action: 'update_guest',
          targetId: id,
          targetName: s.guests.find((g) => g.id === id)?.firstName ?? id,
          timestamp: now(),
        },
        ...s.logs,
      ],
    }))
  },

  deleteGuest: (id) => {
    const target = get().guests.find((g) => g.id === id)
    set((s) => ({
      guests: s.guests.filter((g) => g.id !== id),
      logs: [
        {
          id: uid('log'),
          actorId: s.currentUserId,
          actorRole: s.currentRole,
          action: 'delete_guest',
          targetId: id,
          targetName: target ? `${target.firstName} ${target.lastName ?? ''}`.trim() : id,
          timestamp: now(),
        },
        ...s.logs,
      ],
    }))
  },

  findUserByTelegramId: (tgId) => {
    const s = get()
    const sa = s.superAdmins.find((u) => u.telegramId === tgId)
    if (sa) return { user: sa, role: 'super_admin' as Role }
    const adm = s.admins.find((u) => u.telegramId === tgId)
    if (adm) return { user: adm, role: 'admin' as Role }
    const g = s.guests.find((u) => u.telegramId === tgId)
    if (g) return { user: g, role: 'guest' as Role }
    return { user: null, role: 'unregistered' as Role }
  },
}))
