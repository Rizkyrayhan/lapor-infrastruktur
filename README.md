# LaporInfrastruktur.id - Sistem Pelaporan Infrastruktur Terpadu

LaporInfrastruktur.id adalah platform monorepo terpadu untuk melaporkan dan memantau masalah infrastruktur publik (seperti jalan rusak, lampu jalan padam, jembatan rusak, dll.). Platform ini terbagi menjadi tiga komponen utama yang terintegrasi.

## 🏗️ Arsitektur Sistem

Monorepo ini berisi modul-modul berikut di bawah direktori `apps/`:

1. **`apps/backend`**: REST API Server yang dibangun dengan **NestJS** dan database **PostgreSQL** melalui ORM **Prisma**.
2. **`apps/admin`**: Dashboard berbasis web untuk Admin dan Petugas yang dibangun dengan **Next.js** (App Router) dan **TailwindCSS**.
3. **`apps/mobile`**: Aplikasi ponsel pintar untuk warga yang dibangun dengan **React Native** menggunakan framework **Expo**.

## ⚙️ Persyaratan Sistem

Pastikan Anda telah memasang:
- **Node.js** (v18 atau lebih baru)
- **PostgreSQL** database yang sedang berjalan
- **Git** untuk version control

## 🚀 Panduan Memulai Cepat

Silakan baca berkas [RUNNING_GUIDE.md](RUNNING_GUIDE.md) untuk instruksi mendalam mengenai instalasi dependencies, konfigurasi basis data, dan menjalankan masing-masing server secara lokal.
