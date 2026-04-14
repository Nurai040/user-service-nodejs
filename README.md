# user-service-nodejs

## Стек

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (аутентификация)

---

## Установка

git clone <repo-url>
cd user-service-nodejs
npm install

## Следующий шаг

- Создать .env файл (есть .env-example)

## Запуск базы данных (Docker)

docker compose up -d

## Prisma

npx prisma generate
npx prisma migrate dev

## Запуск сервера

npm run dev

Сервер будет доступен по адресу: http://localhost:3000

## API Endpoints

_Регистрация_

- POST /api/users/register

_Авторизация_

- POST /api/users/login

_Получить пользователя_

- GET /api/users/:id
  (доступ: admin или владелец)

_Список пользователей_

- GET /api/users
  (доступ: только admin)

_Блокировка пользователя_

- PATCH /api/users/:id/block
  (доступ: admin или сам пользователь)

## Авторизация

- Используется JWT токен:

Authorization: Bearer <token>
