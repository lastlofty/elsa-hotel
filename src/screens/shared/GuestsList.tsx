import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotelStore } from '@/store/hotel'
import { Header } from '@/components/Header'
import { UserCard } from '@/components/UserCard'
import { SearchBar } from '@/components/SearchBar'
import { EmptyState } from '@/components/EmptyState'
import { Fab } from '@/components/Fab'
import { GuestFormModal } from './GuestFormModal'
import { BackBar } from '@/components/BackBar'
import type { Guest, GuestStatus, Role } from '@/types'

interface Props {
  /** Чья это панель — определяет, что показывать в шапке и куда вести "назад". */
  viewerRole: Role
  viewerName: string
  backTo: string
}

const STATUS_FILTERS: { value: GuestStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Заселены' },
  { value: 'pending', label: 'Ожидают' },
  { value: 'checked_out', label: 'Выехали' },
]

export function GuestsList({ viewerRole, viewerName, backTo }: Props) {
  const navigate = useNavigate()
  const guests = useHotelStore((s) => s.guests)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<GuestStatus | 'all'>('all')
  const [editing, setEditing] = useState<Guest | null>(null)
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return guests
      .filter((g) => statusFilter === 'all' || g.status === statusFilter)
      .filter((g) =>
        !q
          ? true
          : [g.firstName, g.lastName, g.username, g.roomNumber, g.phone]
              .filter(Boolean)
              .some((s) => s!.toLowerCase().includes(q))
      )
  }, [guests, search, statusFilter])

  const subtitle =
    viewerRole === 'super_admin'
      ? 'Все гости отеля. Полный доступ — добавление, редактирование, удаление.'
      : 'Управление заселением и заявками гостей.'

  return (
    <div className="min-h-screen pb-32">
      <BackBar onBack={() => navigate(backTo)} />
      <Header role={viewerRole} userName={viewerName} subtitle={subtitle} />

      <main className="px-5 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Имя, номер, телефон..."
        />

        {/* Фильтр по статусу */}
        <div className="flex gap-1.5 -mx-5 px-5 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-all ${
                statusFilter === f.value
                  ? 'bg-gold-400 text-ink-950 font-semibold'
                  : 'bg-white/[0.04] text-[var(--text-secondary)] border border-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-baseline justify-between">
          <div className="ornament flex-1">Гости</div>
          <span className="text-xs font-mono text-gold-300 ml-3">{filtered.length}</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={search || statusFilter !== 'all' ? 'Ничего не найдено' : 'Нет гостей'}
            description={
              search || statusFilter !== 'all'
                ? 'Попробуйте изменить запрос или фильтр.'
                : 'Добавьте первого гостя, нажав на кнопку.'
            }
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((g) => (
              <UserCard key={g.id} user={g} onClick={() => setEditing(g)} />
            ))}
          </div>
        )}
      </main>

      <Fab onClick={() => setCreating(true)} label="Заселить" />

      {creating && <GuestFormModal mode="create" onClose={() => setCreating(false)} />}
      {editing && (
        <GuestFormModal mode="edit" guest={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  )
}
