import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { Field, Select } from '@/components/Field'
import { useHotelStore } from '@/store/hotel'
import { haptic, tgConfirm } from '@/lib/telegram'
import type { Admin } from '@/types'

type Props =
  | { mode: 'create'; onClose: () => void }
  | { mode: 'edit'; admin: Admin; onClose: () => void }

export function AdminFormModal(props: Props) {
  const addAdmin = useHotelStore((s) => s.addAdmin)
  const updateAdmin = useHotelStore((s) => s.updateAdmin)
  const deleteAdmin = useHotelStore((s) => s.deleteAdmin)

  const initial = props.mode === 'edit' ? props.admin : null

  const [firstName, setFirstName] = useState(initial?.firstName ?? '')
  const [lastName, setLastName] = useState(initial?.lastName ?? '')
  const [username, setUsername] = useState(initial?.username ?? '')
  const [phone, setPhone] = useState(initial?.phone ?? '')
  const [position, setPosition] = useState(initial?.position ?? 'Администратор ресепшен')
  const [shift, setShift] = useState<NonNullable<Admin['shift']>>(initial?.shift ?? 'day')
  const [telegramId, setTelegramId] = useState(String(initial?.telegramId ?? ''))

  const isValid = firstName.trim().length > 0 && telegramId.trim().length > 0

  const handleSave = () => {
    if (!isValid) return
    if (props.mode === 'create') {
      addAdmin({
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        username: username.trim() || undefined,
        phone: phone.trim() || undefined,
        position,
        shift,
        telegramId: Number(telegramId),
      })
      haptic('success')
    } else {
      updateAdmin(props.admin.id, {
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        username: username.trim() || undefined,
        phone: phone.trim() || undefined,
        position,
        shift,
        telegramId: Number(telegramId),
      })
      haptic('success')
    }
    props.onClose()
  }

  const handleDelete = async () => {
    if (props.mode !== 'edit') return
    const ok = await tgConfirm(
      `Удалить администратора ${props.admin.firstName}? Это действие нельзя отменить.`
    )
    if (!ok) return
    deleteAdmin(props.admin.id)
    haptic('warning')
    props.onClose()
  }

  return (
    <Modal
      open
      onClose={props.onClose}
      title={props.mode === 'create' ? 'Новый администратор' : 'Редактирование'}
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
            {props.mode === 'create' ? 'Добавить' : 'Сохранить'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <Field
          label="Имя"
          value={firstName}
          onChange={setFirstName}
          placeholder="Анна"
          required
        />
        <Field
          label="Фамилия"
          value={lastName}
          onChange={setLastName}
          placeholder="Калниня"
        />
        <Field
          label="Telegram ID"
          value={telegramId}
          onChange={setTelegramId}
          placeholder="200000001"
          type="number"
          required
          hint="Числовой ID пользователя"
        />
        <Field
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="anna_reception"
          hint="Без @"
        />
        <Field
          label="Телефон"
          value={phone}
          onChange={setPhone}
          placeholder="+371 20 100 001"
          type="tel"
        />
        <Field
          label="Должность"
          value={position}
          onChange={setPosition}
          placeholder="Администратор ресепшен"
        />
        <Select
          label="Смена"
          value={shift}
          onChange={setShift}
          options={[
            { value: 'day', label: 'Дневная' },
            { value: 'night', label: 'Ночная' },
            { value: 'flex', label: 'Гибкая' },
          ]}
        />
      </div>
    </Modal>
  )
}
