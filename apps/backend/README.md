# LaporInfrastruktur.id — Backend API

REST API server untuk sistem pelaporan infrastruktur, dibangun menggunakan **NestJS**, **Prisma ORM**, dan **PostgreSQL**.

## Daftar Endpoint API

### Autentikasi (`/auth`)

| Method | Endpoint         | Deskripsi                     | Auth |
|--------|-----------------|-------------------------------|------|
| POST   | `/auth/register` | Registrasi akun pengguna baru | ❌   |
| POST   | `/auth/login`    | Login dan mendapatkan JWT     | ❌   |

### Laporan (`/reports`)

| Method | Endpoint              | Deskripsi                               | Auth |
|--------|----------------------|-----------------------------------------|------|
| GET    | `/reports`           | Mengambil semua laporan (dengan filter) | ❌   |
| GET    | `/reports/:id`       | Mengambil detail satu laporan           | ❌   |
| POST   | `/reports`           | Membuat laporan baru (dengan gambar)    | ✅   |
| PATCH  | `/reports/:id/status`| Mengubah status laporan                 | ✅ (ADMIN/OFFICER) |

### Query Parameters (`GET /reports`)

| Parameter   | Tipe   | Deskripsi                            |
|-------------|--------|--------------------------------------|
| `search`    | string | Pencarian berdasarkan judul/deskripsi|
| `citizenId` | string | Filter laporan milik warga tertentu  |
| `limit`     | number | Jumlah maksimal data yang ditampilkan|

## Role Pengguna

| Role     | Keterangan                                    |
|----------|-----------------------------------------------|
| CITIZEN  | Warga biasa, dapat membuat dan melihat laporan|
| ADMIN    | Administrator, dapat mengubah status laporan  |
| OFFICER  | Petugas lapangan, dapat mengubah status laporan|

## Status Laporan

| Status       | Keterangan                   |
|-------------|------------------------------|
| PENDING     | Laporan baru masuk           |
| VERIFIED    | Laporan telah diverifikasi   |
| IN_PROGRESS | Sedang dalam pengerjaan      |
| RESOLVED    | Masalah telah diperbaiki     |

## Menjalankan Server

```bash
cd apps/backend
npm install
npx prisma migrate dev --name init
npm run start:dev
```

Server akan berjalan di `http://localhost:3000`.
