# SecureSight - CCTV Monitoring Dashboard

A comprehensive CCTV monitoring dashboard built with **Next.js 15**, featuring AI-powered threat detection, real-time incident management, and a modern UI/UX experience.

---

## 📸 Features

### ✅ Mandatory Features
- **Navbar**: Clean navigation bar with profile dropdown
- **Incident Player**: Video player with controls & camera thumbnails
- **Incident List**: Real-time feed of incidents with resolve button
- **Database Integration**: PostgreSQL with Camera & Incident models
- **API Routes**: RESTful endpoints for incident management
- **Optimistic UI**: Instant updates for smoother user experience

### ✅ Optional Features
- **Interactive Timeline**: 24-hour view with incident markers
- **Responsive Design**: Mobile-first layout
- **Live Updates**: Real-time incident feed (polling-based)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Neon PostgreSQL
- **UI Components**: [shadcn/ui](https://ui.shadcn.com), Lucide Icons
- **Database**: PostgreSQL (Neon serverless)

---

## 🧱 Database Schema

### 📷 Cameras Table
```sql
id SERIAL PRIMARY KEY,
name VARCHAR,
location VARCHAR,
created_at TIMESTAMP DEFAULT now()
````

### 🚨 Incidents Table

```sql
id SERIAL PRIMARY KEY,
camera_id INTEGER REFERENCES cameras(id),
type VARCHAR,
ts_start TIMESTAMP,
ts_end TIMESTAMP,
thumbnail_url VARCHAR,
resolved BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT now()
```

---

## 🔌 API Endpoints

| Method | Endpoint                        | Description                       |
| ------ | ------------------------------- | --------------------------------- |
| GET    | `/api/incidents?resolved=false` | Fetch unresolved incidents        |
| PATCH  | `/api/incidents/:id/resolve`    | Toggle incident resolution status |

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aryam643/securesight-dashboard.git
cd securesight-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create `.env.local` in the root:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 4. Set Up Database

Run your SQL schema & seed data:

```bash
# Execute the following in your PostgreSQL database
psql -U <username> -d <database> -f scripts/schema.sql
psql -U <username> -d <database> -f scripts/seed.sql
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🌐 Deployment

This app is optimized for deployment on **Vercel**:

1. Connect your GitHub repository on [vercel.com](https://vercel.com/)
2. Add `DATABASE_URL` as an environment variable
3. Deploy automatically on push to `main`

---

## ⚙️ Tech Decisions

### Why Next.js 15?

* App Router with server components
* Built-in API Routes
* TypeScript-first and optimized builds

### Why Neon PostgreSQL?

* Serverless and globally distributed
* Fast auto-scaling with easy dev setup

### Why Tailwind CSS?

* Utility-first, mobile-first design
* Custom theming and faster UI iteration

### Why shadcn/ui?

* Accessible, ARIA-compliant components
* Customizable design with modern APIs

---

## 🧠 If I Had More Time...

### 🔄 Performance

* [ ] WebSockets for real-time updates
* [ ] Redis caching for fast reads
* [ ] Image blur placeholders with `next/image`
* [ ] Virtualized incident list

### 🧩 Features

* [ ] 3D Dashboard with React Three Fiber
* [ ] Draggable Timeline synced with video
* [ ] Multi-Camera Grid View
* [ ] AI Integration: Threat detection with confidence scores
* [ ] PDF & Clip Export Functionality
* [ ] User Roles & Permissions
* [ ] React Native Companion App
* [ ] Analytics & Trend Dashboards

### 🧪 Testing & DX

* [ ] Unit Tests with Jest + React Testing Library
* [ ] E2E Tests with Playwright
* [ ] Error tracking via Sentry
* [ ] Logging with Winston
* [ ] OpenAPI docs for backend
* [ ] CI/CD with GitHub Actions

### 🔒 Security

* [ ] Auth with NextAuth.js
* [ ] RBAC (role-based access control)
* [ ] Rate Limiting & Abuse Protection
* [ ] Zod for type-safe input validation
* [ ] SSL & Security Headers

### 💎 UX Improvements

* [ ] Dark/Light Mode Toggle
* [ ] Keyboard Shortcuts
* [ ] Full WCAG Accessibility
* [ ] Framer Motion animations
* [ ] Toasts & Push Notifications

---

## 👨‍💻 Author

**Aryam Sharma**
📫 [@aryam643](https://github.com/aryam643)
🌐 [aryamsharma.dev](https://aryamsharma.dev)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
