# 🗂️ Mini Workboard — Task Management App

A lightweight and modern task management app built with **Next.js**, **TypeScript**, **React Query**, and **shadcn/ui**.
Create tasks, set priorities, assign team members, and manage workflow with a fast and accessible UI.

---

## 🚀 Getting Started

Install dependencies:

```bash
yarn install
# or
npm install
```

Run the development server:

```bash
yarn dev
# or
npm run dev
```

Visit the app at:

```
http://localhost:3000
```

---

## ✨ Features

### ✔️ Task Management

* Create tasks through an accessible modal
* Add title, description, assignee, priority, status, and due date
* Form validation with inline error highlighting
* Toast notifications using **sonner**

### 🎨 UI & Styling

* Built with **shadcn/ui**
* Fully keyboard-accessible dialogs and forms
* Clean, minimal design
* Icons powered by **lucide-react**

### ⚡ Data Fetching & Mutations (React Query)

* Fetch tasks with `useQuery`
* Create tasks with `useMutation`
* Automatic cache updates using `QueryClientProvider`
* Smooth optimistic UI handling

### 🧪 Testing (Jest + React Testing Library)

* MSW (Mock Service Worker) for API mocking
* Zod for JSON schema validation
* Tests for:

  * API fetch logic
  * Task creation
  * Form validation

---


## 🧩 Technologies Used

| Tech        | Purpose                  |
| ----------- | ------------------------ |
| Next.js     | Framework                |
| TypeScript  | Type safety              |
| shadcn/ui   | Accessible UI components |
| React Query | Data fetching + caching  |
| MSW         | API request mocking      |
| Zod         | Schema validation        |
| Vitest      | Testing                  |
| Sonner      | Toast notifications      |

---

## 📦 Scripts

```bash
yarn dev        # Run dev server
yarn build      # Build production
yarn start      # Run production build
yarn test       # Run test suite
```

---

