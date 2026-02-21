# SecureRAG Frontend — Architecture Plan

This document defines the **static, responsive** frontend architecture for the Private RAG (SecureRAG) system. No complex state management or backend API logic is included yet.

---

## 1. User Journey Summary

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | **Login** | Email + Password; “Log In”; “Forgot Password?”. Centered card with SecureRAG logo. |
| 2 | **Empty Dashboard** | First-time or no-docs state: welcome message + “Upload Document” CTA, or drag-and-drop zone (“Drag & Drop your SEBI Circular or Legal PDF here” / “or click to browse files”) + “Upload Document” button. |
| 3 | **Populated Dashboard** | “Recent Documents” list: document icon, name, upload date, “Processed” status pill, search/view (🔍), “Analyze”. “+ Upload New Document” primary action. |
| 4 | **Regulatory Insight Engine** | Split screen: **Left** — PDF viewer (title, kebab menu, zoom ±, page thumbnails); **Right** — “AI Regulatory Assistant” (user/assistant chat bubbles, citation pills, “Type your question…” input + send). |

Flow: **Login → Dashboard (empty or populated) → [Analyze] → Regulatory Insight Engine**.

---

## 2. Page & Routing Structure (react-router-dom)

- **`/login`** — Login page (no app navbar; standalone card).
- **`/dashboard`** — Dashboard page. Renders either:
  - **Empty state**: welcome + upload CTA **or** drag-and-drop zone (both are “empty dashboard” variants).
  - **Populated state**: “Recent Documents” + list + “+ Upload New Document”.
- **`/document/:documentId`** (or **`/insight/:documentId`**) — Regulatory Insight Engine: split layout with document viewer + chat.

Suggested route config:

- Use a **layout route** for authenticated shell (navbar + outlet) on `/dashboard` and `/document/:documentId`.
- Keep `/login` outside that layout (no navbar).
- Optional: redirect `/` to `/dashboard` or `/login` (static only; no real auth yet).

**Route summary**

| Route | Page component | Layout |
|-------|----------------|--------|
| `/login` | `LoginPage` | None (full-page card) |
| `/dashboard` | `DashboardPage` | `AppLayout` (navbar + outlet) |
| `/document/:documentId` | `InsightEnginePage` | `AppLayout` (navbar + outlet) |

---

## 3. Component Tree & Reusable UI Elements

### 3.1 Layout & Shell

- **`AppLayout`** — Wraps authenticated pages; renders `Navbar` + `main` with `<Outlet />` for child routes.
- **`Navbar`** — Top bar: left = logo + “SecureRAG”; right = “User Profile” (link/button). Shared by Dashboard and Insight Engine.

### 3.2 Authentication (Login)

- **`LoginPage`** — Full-page container; centers `AuthCard`.
- **`AuthCard`** — White, rounded, shadowed card. Reusable for Login (and later Forgot Password / Register if needed).
- **`Logo`** — Shield icon + “SecureRAG” text. Used in `AuthCard` and `Navbar`.
- **`FormField`** / **`Input`** — Label/placeholder, border, padding. Used for Email and Password.
- **`Button`** — Variants: primary (e.g. “Log In”), secondary. Optional icon slot.
- **`TextLink`** — “Forgot Password?” style (small, muted).

### 3.3 Dashboard

- **`DashboardPage`** — Chooses empty vs populated view (e.g. via a simple prop or static flag for now).
- **Empty state**
  - **`EmptyDashboardView`** — Wrapper for empty UX.
  - **`WelcomeBlock`** — “Welcome to SecureRAG!”, “Start by uploading your first document.”, optional “No documents processed yet.”
  - **`UploadDropzone`** — Dashed border, cloud-upload icon, “Drag & Drop your SEBI Circular or Legal PDF here”, “or click to browse files”. Handles drag/drop + click-to-browse (markup only; no real upload logic).
  - **`Button`** — “Upload Document” (with optional upload icon).
- **Populated state**
  - **`DocumentDashboardView`** — Section title + “+ Upload New Document” + list.
  - **`DocumentList`** — Container for document rows.
  - **`DocumentListItem`** — Row: document icon, name, upload date, status pill, actions.
  - **`StatusPill`** — Green “✔ Processed” (or other statuses later).
  - **`IconButton`** — Search (🔍), “Analyze” (text + optional icon). Reusable elsewhere (e.g. kebab, send).

### 3.4 Regulatory Insight Engine (Split Screen)

- **`InsightEnginePage`** — Reads `documentId` from route; renders `SplitScreenLayout` with left and right panels.
- **`SplitScreenLayout`** — Two-column responsive layout (e.g. 50/50 or 40/60); on small screens stacks or shows one panel at a time (structure only).
- **Left: Document**
  - **`DocumentViewerPanel`** — Title bar (document name + kebab menu), scrollable content area, zoom controls, thumbnail strip.
  - **`DocumentViewerHeader`** — Document title + kebab `IconButton`.
  - **`DocumentViewerContent`** — Placeholder or static content area (no real PDF yet).
  - **`ZoomControls`** — “Zoom −” and “Zoom +” buttons.
  - **`DocumentThumbnailStrip`** — Horizontal strip of page thumbnails; current page highlighted (e.g. “4”).
- **Right: Chat**
  - **`ChatAssistantPanel`** — Title “AI Regulatory Assistant” + `ChatHistory` + `ChatInput`.
  - **`ChatHistory`** — Scrollable list of bubbles.
  - **`UserChatBubble`** — Message on right, optional user avatar.
  - **`AssistantChatBubble`** — Message on left, optional SecureRAG/assistant icon; optional `CitationPill` list below.
  - **`CitationPill`** — Green pill, e.g. “Page 4, Para 2.1”, “Page 5, Table A” (links or buttons; no navigation logic yet).
  - **`ChatInput`** — “Type your question…” with send `IconButton`.

### 3.5 Shared / Primitives

- **`Button`** — Primary, secondary, disabled; optional icon + text.
- **`IconButton`** — Icon-only (kebab, send, search, user, etc.).
- **`Input`** / **`FormField`** — Text/email/password; consistent border and padding.
- **`Logo`** — Shield + “SecureRAG”.
- **`StatusPill`** — Status label (e.g. Processed) with color variant.
- **`TextLink`** — Muted, small link style.

---

## 4. Proposed Directory Tree

```
src/
├── main.tsx
├── App.tsx                    # Router setup + routes
├── index.css
├── vite-env.d.ts
│
├── routes/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── InsightEnginePage.tsx
│
├── layouts/
│   └── AppLayout.tsx           # Navbar + Outlet
│
├── components/
│   ├── ui/                     # Primitives
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Input.tsx
│   │   ├── TextLink.tsx
│   │   └── StatusPill.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Logo.tsx
│   │
│   ├── auth/
│   │   └── AuthCard.tsx
│   │
│   ├── dashboard/
│   │   ├── EmptyDashboardView.tsx
│   │   ├── WelcomeBlock.tsx
│   │   ├── UploadDropzone.tsx
│   │   ├── DocumentDashboardView.tsx
│   │   ├── DocumentList.tsx
│   │   └── DocumentListItem.tsx
│   │
│   └── insight-engine/
│       ├── SplitScreenLayout.tsx
│       ├── DocumentViewerPanel.tsx
│       ├── DocumentViewerHeader.tsx
│       ├── DocumentViewerContent.tsx
│       ├── ZoomControls.tsx
│       ├── DocumentThumbnailStrip.tsx
│       ├── ChatAssistantPanel.tsx
│       ├── ChatHistory.tsx
│       ├── UserChatBubble.tsx
│       ├── AssistantChatBubble.tsx
│       ├── CitationPill.tsx
│       └── ChatInput.tsx
│
└── assets/                     # Optional: logos, icons (or use inline SVG / icon lib)
    └── (e.g. logo-shield.svg)
```

**Optional refinements**

- **`components/ui/FormField.tsx`** — Wraps `Input` with label and error slot if you want a single form primitive.
- **`hooks/`** — Empty for now; later for `useDocument`, `useChat`, etc.
- **`types/`** — Optional `document.ts`, `chat.ts` for shared TypeScript types (e.g. `Document`, `ChatMessage`) used by components.
- **`constants/`** — App name, route paths, etc.

---

## 5. Technology Choices (Already in Place)

- **React 18** + **TypeScript** — Typed components and props.
- **Vite** — Build and dev server.
- **Tailwind CSS** — Utility-first styling for layout, spacing, colors, responsive breakpoints.
- **react-router-dom** — To be added; used for `/login`, `/dashboard`, `/document/:documentId` and `AppLayout` with `Outlet`.

---

## 6. Static Data & Responsiveness

- **No backend:** Pages use static or mock data (e.g. a fixed list of documents, a few chat messages) to build the layout and components.
- **Responsive:** Use Tailwind breakpoints so that:
  - **Dashboard:** List remains readable on small screens (stack or horizontal scroll as needed).
  - **Insight Engine:** Split layout becomes stacked or tabbed on narrow viewports (e.g. document above chat, or vice versa).

---

## 7. Summary

| Area | Decisions |
|------|-----------|
| **Routes** | `/login`, `/dashboard`, `/document/:documentId`; `AppLayout` for dashboard + insight. |
| **Reusable building blocks** | `Navbar`, `Logo`, `Button`, `IconButton`, `Input`, `TextLink`, `StatusPill`, `AuthCard`. |
| **Feature components** | Dashboard: `UploadDropzone`, `DocumentList` / `DocumentListItem`; Insight: `SplitScreenLayout`, document viewer pieces, chat panel + bubbles + citations + input. |
| **Directory** | `routes/`, `layouts/`, `components/{ui, layout, auth, dashboard, insight-engine}/`. |

Once you approve this structure, the next step is to add `react-router-dom` and implement the static layout and components in React + TypeScript + Tailwind without state or API logic.
