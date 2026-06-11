import { Navigate, Route, Routes } from 'react-router-dom'
import { useHotelStore } from './store/hotel'
import { SuperAdminHome } from './screens/super-admin/SuperAdminHome'
import { AdminsList } from './screens/super-admin/AdminsList'
import { SuperAdminGuests } from './screens/super-admin/SuperAdminGuests'
import { AdminHome } from './screens/admin/AdminHome'
import { AdminGuests } from './screens/admin/AdminGuests'
import { GuestHome } from './screens/guest/GuestHome'
import { Blocked } from './screens/Blocked'
import { RoleSwitcher } from './components/RoleSwitcher'

function App() {
  const role = useHotelStore((s) => s.currentRole)

  // Корневой редирект: куда отправить пользователя по дефолту
  const defaultPath =
    role === 'super_admin'
      ? '/super-admin'
      : role === 'admin'
        ? '/admin'
        : role === 'guest'
          ? '/guest'
          : '/blocked'

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />

        {/* Super Admin */}
        <Route path="/super-admin" element={<SuperAdminHome />} />
        <Route path="/super-admin/admins" element={<AdminsList />} />
        <Route path="/super-admin/guests" element={<SuperAdminGuests />} />

        {/* Admin (ресепшен) */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/guests" element={<AdminGuests />} />

        {/* Guest */}
        <Route path="/guest" element={<GuestHome />} />

        {/* Незарегистрированный */}
        <Route path="/blocked" element={<Blocked />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Routes>

      {/* DEV-переключатель ролей. В Telegram — определяется по initData. */}
      <RoleSwitcher />
    </>
  )
}

export default App
