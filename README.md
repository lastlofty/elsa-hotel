# Elsa-Hotel — Telegram Mini App

🇷🇺 [Русский](#-русский) · 🇬🇧 [English](#-english)

---

## 🇷🇺 Русский

Премиум система управления доступом для отеля Elsa-Hotel.
Стек: **Vite + React 18 + TypeScript + Tailwind + Zustand**.

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

## Поднятие через ngrok для тестов в Telegram

```bash
# в одном терминале
npm run dev

# в другом
ngrok http 5173
```

Затем в **@BotFather** → твой бот → **Bot Settings** → **Menu Button** / **Web App**
вставь полученный `https://...ngrok-free.app` URL.

> В `vite.config.ts` уже добавлены `allowedHosts: ['.ngrok.io', '.ngrok-free.app', '.ngrok.app']`,
> поэтому Vite не будет блокировать туннель.

## Архитектура

```
src/
├── components/         — переиспользуемые UI (Logo, Header, UserCard, Modal, Field, ...)
├── data/mock.ts        — моковые данные (заменяются на API позже)
├── lib/telegram.ts     — обёртка над Telegram WebApp SDK (ready, expand, haptic, confirm)
├── store/hotel.ts      — Zustand-стор с CRUD-логикой (in-memory)
├── types/index.ts      — типы домена: Role, SuperAdmin, Admin, Guest, ActionLog
├── screens/
│   ├── super-admin/    — экраны владельца
│   ├── admin/          — экраны ресепшен
│   ├── shared/         — общие экраны (список гостей, форма гостя)
│   ├── guest/          — личный кабинет гостя
│   └── Blocked.tsx     — экран для незарегистрированных
├── App.tsx             — роутинг
└── main.tsx            — точка входа + initTelegram()
```

## Роли (по ТЗ)

| Роль                | Возможности                                                     |
| ------------------- | --------------------------------------------------------------- |
| **Super Admin**     | CRUD над администраторами **и** гостями + лента действий + статистика |
| **Admin**           | CRUD над гостями + дневная сводка для ресепшен                  |
| **Guest**           | Персональная карточка брони (раздел в разработке — placeholder) |
| **Незарегистрированный** | Экран с контактами ресепшен                                |

## DEV-переключатель ролей

Внизу экрана плашка `Владелец / Админ / Гость / Не зарег.` — это **только для разработки**.
В реальном Telegram WebApp роль будет определяться по `Telegram.WebApp.initDataUnsafe.user.id`
через метод `findUserByTelegramId` в сторе. Перед продакшеном — убрать `<RoleSwitcher />` из `App.tsx`.

## Подключение реального бэкенда

Все CRUD-вызовы идут через Zustand-стор (`useHotelStore`). Чтобы подключить API:

1. В `src/store/hotel.ts` заменить мутации (`addAdmin`, `addGuest`, ...) на `fetch` к API.
2. Базовый URL API хранить в `.env` как `VITE_API_URL`.
3. Не забывать передавать `Telegram.WebApp.initData` в заголовке для верификации на бэке.

## Дизайн-токены

- Палитра: `gold-400 #d4af37`, `emerald_h-500 #2d5e3e`, `ink-950 #0a0d12`, `cream #f5ecd6`
- Display-шрифт: **Cormorant Garamond** (для заголовков)
- Body-шрифт: **Manrope**
- Mono: **JetBrains Mono**
- Тема — только тёмная (TG dark style + золото/изумруд из логотипа)

## Что реализовано

- [x] Super Admin: главный экран, список админов с поиском, форма CRUD админа, доступ к гостям, лента действий
- [x] Admin: главный экран с дневной сводкой, список гостей с фильтрами, форма CRUD гостя
- [x] Guest: персональная карточка с номером, датами, статусом, заглушки будущих сервисов
- [x] Блокировка для незарегистрированных
- [x] Адаптивная вёрстка под мобильный TG-вьюпорт
- [x] Tactile-обратная связь (Telegram HapticFeedback) при действиях
- [x] Подтверждение через `tg.showConfirm` при удалении
- [x] Логи действий (видны на главной у Super Admin)

## Что дальше

- [ ] Реальный бэкенд (Node + Express + SQLite или Postgres)
- [ ] Верификация `initData` на бэке (HMAC по `bot_token`)
- [ ] Расширение раздела Guest по ТЗ
- [ ] Push-уведомления через бота при заселении/выселении

---

## 🇬🇧 English

A premium access-management **Telegram Mini App** for Elsa-Hotel.
Stack: **Vite + React 18 + TypeScript + Tailwind + Zustand**.

### Run

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. For testing inside Telegram, expose the dev
server with `ngrok http 5173` and set the resulting URL as the bot's Web App in
**@BotFather** (allowed ngrok hosts are already configured in `vite.config.ts`).

### Roles

| Role | Capabilities |
| --- | --- |
| **Super Admin** | CRUD over admins **and** guests + action feed + stats |
| **Admin** | CRUD over guests + daily reception summary |
| **Guest** | Personal booking card (section in progress) |
| **Unregistered** | Screen with reception contacts |

### Architecture

UI state and all CRUD operations run through a Zustand store (`src/store/hotel.ts`,
currently in-memory with mock data). The Telegram WebApp SDK is wrapped in
`src/lib/telegram.ts` (ready/expand/haptics/confirm). A dev-only `<RoleSwitcher />`
lets you preview each role; in production the role is resolved from
`Telegram.WebApp.initDataUnsafe.user.id`.

### Connecting a real backend

1. Replace the store mutations (`addAdmin`, `addGuest`, …) with `fetch` calls.
2. Store the API base URL in `.env` as `VITE_API_URL`.
3. Pass `Telegram.WebApp.initData` in the request header for backend verification
   (HMAC over the `bot_token`).

### Design tokens

Dark theme only. Palette: gold `#d4af37`, emerald `#2d5e3e`, ink `#0a0d12`,
cream `#f5ecd6`. Fonts: Cormorant Garamond (display), Manrope (body),
JetBrains Mono (mono).

cd ~/docaudit && git pull --ff-only && docker compose -f compose.218.yml up -d --build api

ollama ps

docker exec docaudit-db-1 psql -U docaudit -d docaudit -c "select id,type,status,progress,total from jobs order by id desc limit 8;"

