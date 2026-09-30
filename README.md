# 🚀 Advanced Todo Web App

An enterprise-grade, full-stack **Task Management & Advanced Todo Application** built with **Next.js 15+ (App Router)**, **TypeScript**, **Tailwind CSS**, and modern web standards. Designed for high performance, accessibility, and smooth user experience.

---

## ✨ Features

- **⚡ Instant UX & SSR:** Built on Next.js App Router utilizing Server Components and Streaming for optimal speed.
- **🔐 User Authentication:** Secure signup, login, and session management (OAuth & Email/Password).
- **📋 Task Management:**
  - Create, edit and delete tasks.
  - Priority levels (Low, Medium, High, Urgent).
  - Task categories, tags, and custom labels.
  - Due dates with visual indicator alerts.
- **🔍 Advanced Filtering & Search:** Real-time search, sorting, and status-based filtering (Pending, In Progress, Completed).
<!-- - **📊 Analytics & Insights:** Visual task progress metrics and productivity tracking. -->
<!-- - **🌗 Dark / Light Mode:** Dynamic theme switching with system preference detection. -->
- **📱 Responsive & Accessible:** Fully mobile-optimized UI following WCAG accessibility guidelines.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context API
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & ORM:** Prisma / Drizzle / MongoDB / PostgreSQL _(Customize as needed)_
- **Authentication:** NextAuth.js (Auth.js) / Clerk

---

## 📁 Project Structure

```text
.
├── src/
│   ├── app/                    # Next.js App Router routes & layouts
│   │   ├── (auth)/             # Authentication route group (login, register)
│   │   ├── dashboard/          # Task management dashboard pages
│   │   ├── api/                # API Route Handlers
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Atomic UI primitives (Buttons, Inputs, Modals)
│   │   ├── todos/              # Todo-specific components (List, Cards, Forms)
│   │   └── shared/             # Navbar, Footer, Sidebar
│   ├── context/                # React Context Providers (Theme, Auth, Todo state)
│   ├── lib/                    # Server utilities, DB clients, and helpers
│   │   ├── db.ts               # Database connection instance
│   │   └── utils.ts            # Helper functions
│   ├── types/                  # TypeScript interfaces and global type definitions
│   └── proxy.ts                # Next.js Proxy/Routing interceptor
├── public/                     # Static assets (images, icons)
├── .env.example                # Environment variables template
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```
