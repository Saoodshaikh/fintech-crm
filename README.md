# FinVest CRM

Smart Investment Management Platform — a frontend-only Brokerage CRM & Mutual Fund Management demo built with React 18, TypeScript, Vite, Tailwind CSS, React Router, Lucide Icons, and Recharts.

No backend, no API calls, no database — everything runs on local dummy data in `src/data/dummyData.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Sidebar, Topbar, Layout, shared UI (Card, Badge, KpiCard)
  data/         dummyData.ts — all mock clients, funds, transactions, notifications
  pages/        Login, Dashboard, Clients, ClientDetails, MutualFunds, Portfolio, Reports, Notifications, Settings
  App.tsx       Route definitions
  main.tsx      App entry point
```

## Pushing to GitHub

From inside this folder:

```bash
git init
git add .
git commit -m "Initial commit: FinVest CRM"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If prompted for credentials, use a GitHub Personal Access Token (not your password) — GitHub no longer accepts account passwords over HTTPS git operations. Create one at **GitHub → Settings → Developer settings → Personal access tokens**.
