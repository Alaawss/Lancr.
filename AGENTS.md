# Lancr — Agent Handoff Document (`AGENTS.md`)

This file is created for coding agents to resume, continue, or collaborate on the development of the **Lancr** waitlist SaaS application. It provides context on the architecture, current state of development, technology stack conventions, and next implementation steps.

---

## 1. Project Overview
Lancr is a waitlist-building SaaS where campaign owners (users) can create high-converting pre-launch pages (Campaigns), collect emails (Signups), track referrals, view analytics, and upgrade to a Premium plan.
- **Role 1: Campaign Owner**: Creates an account, manages campaigns via a Vercel/Stripe-like dashboard, and can upgrade to Premium.
- **Role 2: Signup / Joiner**: Enters their email on a public campaign page (`/c/[slug]`), receives a unique referral link, and can share it to increment their referral count.

---

## 2. Tech Stack & Configuration Details

### Core Tech Stack
- **Framework**: Next.js 15 (App Router, Server Actions, TypeScript)
- **Styling**: Tailwind CSS v4 (CSS-first configuration under `src/app/globals.css`)
- **Database / Auth / Storage**: Supabase (PostgreSQL, Supabase Auth, Supabase Storage for logos/banners)
- **Billing**: Paddle Billing v2 (Client overlay checkout + Backend Webhook)
- **Analytics**: PostHog (Telemetry tracking, custom reverse proxy ingestion path)

### Crucial Technical Constraints & Gotchas

#### Next.js 15 App Router Patterns
- **Asynchronous Request APIs**: `cookies()`, `headers()`, dynamic route `params`, and `searchParams` are Promises and **MUST BE AWAITED** before reading their properties.
  - Server components: `const { id } = await params;`
  - Client components: `const { slug } = React.use(params);` or similar.
- **Server Actions form handling**: Use React 19's `useActionState` instead of the deprecated `useFormState` hook.
- **No caching by default**: Requests are uncached by default. If caching is needed, use explicit caching headers or configurations.

#### Tailwind CSS v4 CSS-First Styling
- Tailwind v4 **does not** use a `tailwind.config.js` or `tailwind.config.ts`.
- Content detection is fully automatic.
- Custom tokens, utility classes, keyframes, and themes are declared inside `src/app/globals.css` using the `@theme` directive:
  ```css
  @import "tailwindcss";
  @theme {
    --color-brand-purple: #7c3aed;
    ...
  }
  ```
- PostCSS is configured with `@tailwindcss/postcss` in `postcss.config.mjs`.

#### Supabase Auth & SSR
- The server client (`src/lib/supabase/server.ts`) and middleware (`src/lib/supabase/middleware.ts`) implement the new `@supabase/ssr` cookies handler.
- Always use `supabase.auth.getUser()` (NOT `getSession()`) on the server to secure route layouts, actions, and page components.

---

## 3. Directory Structure & Key Files

The following files have already been successfully created:

```
lancr/
├── package.json                  # Next 15 + Tailwind 4 + Supabase SSR + Paddle + PostHog
├── postcss.config.mjs
├── tsconfig.json
├── .env.example                  # Environment variable reference
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Full PostgreSQL database schema, indexes, RLS policies
│
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind v4 Design system rules, custom animations
│   │   ├── layout.tsx            # App-wide layout (Inter font, toast container)
│   │   ├── page.tsx              # Main SaaS landing page composing all sections
│   │   │
│   │   ├── (auth)/               # Auth route group (login, register, shared layout)
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │
│   ├── components/
│   │   ├── landing/              # Landing page sections
│   │   │   ├── navbar.tsx, hero.tsx, live-preview.tsx, features.tsx
│   │   │   ├── examples.tsx, how-it-works.tsx, testimonials.tsx
│   │   │   └── pricing.tsx, faq.tsx, footer.tsx
│   │   │
│   │   └── ui/                   # Reusable premium UI components
│   │       ├── button.tsx, card.tsx, input.tsx, textarea.tsx, badge.tsx
│   │       ├── modal.tsx, toast.tsx, empty-state.tsx, stat-card.tsx
│   │       └── avatar-stack.tsx, dropdown.tsx, skeleton.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts              # Utility functions (cn, formatNumber, generateSlug, getRelativeTime)
│   │   └── supabase/             # Supabase clients (client, server, admin, middleware)
│   │
│   ├── actions/
│   │   └── auth.ts               # Server actions for register, login, logout, user session
│   │
│   ├── types/
│   │   ├── database.ts           # Hand-written types matching Supabase SQL schema
│   │   └── index.ts              # Custom domain types
│
├── middleware.ts                 # Next.js global route guard & token refresher
```

---

## 4. Current Status & Checklist

Check the detailed roadmap in `task.md` for overall progress. 

- **Phase 1: Foundation**: **100% COMPLETE**. Design system, Supabase clients, auth pages, layout, and a stunning marketing landing page are fully implemented and verified.
- **Phase 2: Campaign CRUD**: **UP NEXT**. Needs implementation of campaign server actions, database schema application (running migrations), creation forms, image storage uploading, and campaign list/edit pages.

---

## 5. Instructions for the Resuming Agent (Next Steps)

When you pick up this task:

### Step 1: Initialize the Supabase Database
Ensure you run the SQL migration script from `supabase/migrations/001_initial_schema.sql` in your Supabase project's SQL Editor to set up:
- The base tables (`users`, `campaigns`, `benefits`, `signups`, `subscriptions`, `campaign_views`)
- RLS policies protecting user data and gating signup updates
- Triggers linking Supabase Auth users to `public.users`

### Step 2: Implement Campaign Server Actions (`src/actions/campaigns.ts`)
Write server actions for handling:
- `createCampaign(data: CreateCampaignInput)` - Auto-generates unique slugs, checks limits for Free/Premium.
- `updateCampaign(id: string, data: UpdateCampaignInput)` - Updates details, validates category, themes, and premium toggles.
- `deleteCampaign(id: string)` - Deletes a campaign.
- `getCampaigns()` - Fetches current user's campaigns.
- `getCampaignById(id: string)` - Fetches a single campaign by ID (verify owner).
- `getCampaignBySlug(slug: string)` - Fetches published campaigns for public view.

### Step 3: Scaffold the Dashboard Pages (`src/app/(dashboard)/dashboard/...`)
Build the dashboard layout (sidebar navigation) and overview screens:
- `/dashboard` - Overview (Stat cards: Views → Signups → Conversion Rate → Referrals, quick actions, latest signups feed).
- `/dashboard/campaigns` - List of campaigns, create CTA.
- `/dashboard/campaigns/new` - Setup form (Logo, banner upload to Supabase bucket `campaign-assets`, launch date countdown settings, category selection).
- `/dashboard/campaigns/[id]` - Campaign management control room (tabs or layout with details, signups, customize, settings).

Use the components from `@/components/ui/` to ensure a consistent, premium Stripe/Vercel-like appearance.
