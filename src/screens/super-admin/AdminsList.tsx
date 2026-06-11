import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotelStore } from '@/store/hotel'
import { Header } from '@/components/Header'
import { UserCard } from '@/components/UserCard'
import { SearchBar } from '@/components/SearchBar'
import { EmptyState } from '@/components/EmptyState'
import { Fab } from '@/components/Fab'
import { AdminFormModal } from './AdminFormModal'
import type { Admin } from '@/types'
import { BackBar } from '@/components/BackBar'

export function AdminsList() {
  const navigate = useNavigate()
  const admins = useHotelStore((s) => s.admins)
  const owner = useHotelStore((s) => s.superAdmins[0])
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Admin | null>(null)
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return admins
    return admins.filter((a) =>
      [a.firstName, a.lastName, a.username, a.position, a.phone]
        .filter(Boolean)
        .some((s) => s!.toLowerCase().includes(q))
    )
  }, [admins, search])

  return (
    <div className="min-h-screen pb-32">
      <BackBar onBack={() => navigate('/super-admin')} />
      <Header
        role="super_admin"
        userName={`${owner.firstName} ${owner.lastName ?? ''}`.trim()}
        subtitle="Администраторы — сотрудники, которые управляют гостями отеля."
      />

      <main className="px-5 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Поиск по имени, должности..."
        />

        <div className="flex items-baseline justify-between">
          <div className="ornament flex-1">Список персонала</div>
          <span className="text-xs font-mono text-gold-300 ml-3">{filtered.length}</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={search ? 'Никого не найдено' : 'Нет администраторов'}
            description={
              search
                ? 'Попробуйте изменить запрос или сбросить фильтр.'
                : 'Добавьте первого администратора — нажмите кнопку ниже.'
            }
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((a) => (
              <UserCard key={a.id} user={a} onClick={() => setEditing(a)} />
            ))}
          </div>
        )}
      </main>

      <Fab onClick={() => setCreating(true)} label="Добавить" />

      {creating && (
        <AdminFormModal mode="create" onClose={() => setCreating(false)} />
      )}
      {editing && (
        <AdminFormModal mode="edit" admin={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  )
}
