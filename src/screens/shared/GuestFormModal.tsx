import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { Field, Select } from '@/components/Field'
import { useHotelStore } from '@/store/hotel'
import { haptic, tgConfirm } from '@/lib/telegram'
import type { Guest, GuestStatus } from '@/types'

type Props =
  | { mode: 'create'; onClose: () => void }
  | { mode: 'edit'; guest: Guest; onClose: () => void }

const toDateInput = (iso: string) => iso.slice(0, 10) // YYYY-MM-DD
const fromDateInput = (date: string) => new Date(date + 'T12:00:00').toISOString()

export function GuestFormModal(props: Props) {
  const addGuest = useHotelStore((s) => s.addGuest)
  const updateGuest = useHotelStore((s) => s.updateGuest)
  const deleteGuest = useHotelStore((s) => s.deleteGuest)

  const initial = props.mode === 'edit' ? props.guest : null
  const today = new Date().toISOString().slice(0, 10)
  const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10)

  const [firstName, setFirstName] = useState(initial?.firstName ?? '')
  const [lastName, setLastName] = useState(initial?.lastName ?? '')
  const [username, setUsername] = useState(initial?.username ?? '')
  const [phone, setPhone] = useState(initial?.phone ?? '')
  const [telegramId, setTelegramId] = useState(String(initial?.telegramId ?? ''))
  const [roomNumber, setRoomNumber] = useState(initial?.roomNumber ?? '')
  const [checkIn, setCheckIn] = useState(initial ? toDateInput(initial.checkIn) : today)
  const [checkOut, setCheckOut] = useState(
    initial ? toDateInput(initial.checkOut) : tomorrow
  )
  const [status, setStatus] = useState<GuestStatus>(initial?.status ?? 'active')
  const [notes, setNotes] = useState(initial?.notes ?? '')

  const isValid =
    firstName.trim().length > 0 &&
    telegramId.trim().length > 0 &&
    checkIn <= checkOut

  const handleSave = () => {
    if (!isValid) return
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
      username: username.trim() || undefined,
      phone: phone.trim() || undefined,
      telegramId: Number(telegramId),
      roomNumber: roomNumber.trim() || undefined,
      checkIn: fromDateInput(checkIn),
      checkOut: fromDateInput(checkOut),
      status,
      notes: notes.trim() || undefined,
    }
    if (props.mode === 'create') {
      addGuest(payload)
    } else {
      updateGuest(props.guest.id, payload)
    }
    haptic('success')
    props.onClose()
  }

  const handleDelete = async () => {
    if (props.mode !== 'edit') return
    const ok = await tgConfirm(
      `Удалить гостя ${props.guest.firstName}? Это действие нельзя отменить.`
    )
    if (!ok) return
    deleteGuest(props.guest.id)
    haptic('warning')
    props.onClose()
  }

  return (
    <Modal
      open
      onClose={props.onClose}
      title={props.mode === 'create' ? 'Новый гость' : 'Гость'}
      footer={
        <>
          {props.mode === 'edit' && (
            <button onClick={handleDelete} className="btn-danger">
              Удалить
            </button>
          )}
          <button onClick={props.onClose} className="btn-ghost flex-1">
            Отмена
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="btn-gold flex-1 disabled:opacity-40"
          >
            {props.mode === 'create' ? 'Заселить' : 'Сохранить'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="ornament">Личные данные</div>

        <Field label="Имя" value={firstName} onChange={setFirstName} required />
        <Field label="Фамилия" value={lastName} onChange={setLastName} />
        <Field
          label="Telegram ID"
          value={telegramId}
          onChange={setTelegramId}
          type="number"
          required
          hint="Числовой ID"
        />
        <Field label="Username" value={username} onChange={setUsername} hint="Без @" />
        <Field label="Телефон" value={phone} onChange={setPhone} type="tel" />

        <div className="ornament pt-2">Проживание</div>

        <Field
          label="Номер комнаты"
          value={roomNumber}
          onChange={setRoomNumber}
          placeholder="301"
        />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Заезд" value={checkIn} onChange={setCheckIn} type="date" required />
          <Field
            label="Выезд"
            value={checkOut}
            onChange={setCheckOut}
            type="date"
            required
          />
        </div>
        <Select
          label="Статус"
          value={status}
          onChange={setStatus}
          options={[
            { value: 'pending', label: 'Ожидание заселения' },
            { value: 'active', label: 'Заселён' },
            { value: 'checked_out', label: 'Выехал' },
          ]}
        />

        <label className="block">
          <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1.5">
            Примечания
          </div>
          <textarea
            className="input min-h-[80px] resize-y"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Особые пожелания, аллергии, время заезда..."
          />
        </label>
      </div>
    </Modal>
  )
}
