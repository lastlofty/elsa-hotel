import { useHotelStore } from '@/store/hotel'
import { GuestsList } from '../shared/GuestsList'

export function SuperAdminGuests() {
  const owner = useHotelStore((s) => s.superAdmins[0])
  return (
    <GuestsList
      viewerRole="super_admin"
      viewerName={`${owner.firstName} ${owner.lastName ?? ''}`.trim()}
      backTo="/super-admin"
    />
  )
}
