# Running Guide: LaporInfrastruktur.id

Follow these steps to get all components of the system running locally.

## 1. Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **Expo Go** app (optional, for testing the mobile app on a physical device)

---

## 2. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd apps/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env` file in `apps/backend/`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/lapor_infra?schema=public"
   JWT_SECRET="your_secret_key"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```bash
   npm run start:dev
   ```
   *The API will be available at `http://localhost:3000`*

---

## 3. Setup Admin CMS
1. Navigate to the admin directory:
   ```bash
   cd apps/admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The dashboard will be available at `http://localhost:3001` (or next available port)*

---

## 4. Setup Mobile App
1. Navigate to the mobile directory:
   ```bash
   cd apps/mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo server:
   ```bash
   npx expo start
   ```
4. Scan the QR code using the **Expo Go** app on your phone, or press `a` for Android Emulator / `i` for iOS Simulator.

---

## 🛠️ Useful Commands (Root)
From the root directory, you can install all dependencies at once:
```bash
npm install
```
