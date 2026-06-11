import { useHotelStore } from '@/store/hotel'
import { GuestsList } from '../shared/GuestsList'

export function AdminGuests() {
  const admins = useHotelStore((s) => s.admins)
  const currentUserId = useHotelStore((s) => s.currentUserId)
  const me = admins.find((a) => a.id === currentUserId) ?? admins[0]

  return (
    <GuestsList
      viewerRole="admin"
      viewerName={`${me.firstName} ${me.lastName ?? ''}`.trim()}
      backTo="/admin"
    />
  )
}
