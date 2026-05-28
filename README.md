# She Can Foundation - World-Class Social Impact NGO Platform

A visually stunning, emotionally powerful, and highly premium cinematic full-stack NGO platform designed to end period poverty, support rural girl child education, host wellness clinics, and establish female vocational self-reliance across India.

---

## 🌟 Visual Aesthetics & Design System

The visual layout matches leading global non-profit designs (e.g. *charity: water*, *UN Women*, and *Apple-style cinematic storytelling*) featuring:
- **Primary Palette:** Deep Purple (`#5B21B6`), Royal Violet (`#7C3AED`)
- **Secondary Palette:** Warm Pink (`#EC4899`), Peach Glow (`#FDBA74`)
- **Neutral Palette:** Soft White (`#FAFAFA`), Charcoal Black (`#111827`)
- **Visual Utilities:** Transparent-to-glassmorphic scrolling navigation, floating glow drop-shadow filters, fluid CSS mesh gradients, and watercolor texture overlays.
- **Micro-Animations:** Interactive before/after storytelling cards, count-up statistical numbers, hover-tilt programs sliders, and canvas-confetti success alerts.

---

## 🛠️ Full-Stack Technology Stack

- **Frontend Core:** Next.js 15/16 (App Router), TypeScript, and TailwindCSS (v4 @theme overrides).
- **Interactions:** Framer Motion transition curves and dynamic client states.
- **Database Layer:** Prisma ORM connecting securely to a cloud PostgreSQL database (Supabase).
- **Payment Processing:** Secure Razorpay SDK integration supporting orders creation APIs, crypto signature checksum validations, and automated PDF tax receipt downloads.
- **AI Assist Tools:** Floating natural-conversation chatbot, AI analytical report compilers, and AI CMS blog brainstorm generators.

---

## 📂 Core Folder & Directory Architecture

```
shecanfoundation/
├── prisma/
│   └── schema.prisma         # Database schemas for Users, Donations, Campaigns, etc.
├── src/
│   ├── app/                  # App Router layout and pages
│   │   ├── api/              # Secure REST APIs (Auth, Order creation, Sign verification)
│   │   ├── about/            # History, leadership, and legal trust credentials
│   │   ├── blog/             # Impact stories and CMS filters
│   │   ├── contact/          # Support ticket portal and FAQ accordion sheets
│   │   ├── dashboard/        # Advanced SaaS admin dashboard workspace
│   │   ├── donate/           # Campaign status slider, payments checkout, and PDF receipts
│   │   ├── events/           # Countdown timetables, location coordinates, and RSVPs
│   │   ├── programs/         # Strategic focus fields and progress bar metrics
│   │   ├── volunteer/        # Skill matrix selectors and experience certificates print
│   │   ├── globals.css       # Custom mesh gradient configurations & @theme v4 overrides
│   │   ├── layout.tsx        # Base page wrapper with globally sticky Navbar/Footer/Chatbot
│   │   └── page.tsx          # Cinematic Homepage
│   ├── components/           # Reusable shared interactive modular segments
│   │   ├── Chatbot.tsx       # AI Floating chat assistant
│   │   ├── Footer.tsx        # 80G tax details and email newsletters
│   │   └── Navbar.tsx        # Responsive transparent-to-glass nav header
│   └── lib/
│       └── db.ts             # Prisma client global cached singleton connection
```

---

## 🔧 Installation & Database Setup Guide

Follow these quick commands to install dependencies, run migrations, and spin up the developer server:

### 1. Initialize and install packages:
```bash
# Navigate to the workspace (or ensure you are in it)
npm install
```

### 2. Configure Environment Variables:
Examine the `.env` template file at the root. Replace with your actual Supabase database URLs and Razorpay dashboard keys:
```env
# Database URL (Supabase direct connections string)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres?schema=public"

# Razorpay credentials
RAZORPAY_KEY_ID="rzp_test_YourKeyHere"
RAZORPAY_KEY_SECRET="YourSecretKeyHere"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_YourKeyHere"

# AI sandbox mode (Set to 'true' to run simulated local AI modules without OpenAI keys)
AI_SANDBOX_MODE="true"
```

### 3. Deploy DB Migrations:
```bash
# Push the schema definitions securely onto your Supabase database instance
npx prisma db push
```

### 4. Initiate local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser to view the premium live platform!

---

## 💳 Payment Gateway & Receipt Generation Flow
1. **Initiation:** User picks an amount (₹500 to ₹10,000) on `/donate`, triggering real-time impact calculations.
2. **Order Placement:** Submitting forms calls `/api/donate/order` to instantiate a secure order through Razorpay Node.js APIs and logs the transaction.
3. **Checkout UI:** Razorpay checkout popup launches. *If using placeholder sandbox keys, the platform automatically launches a stunning simulated UPI QR scanner modal so the developers can easily verify the checkout logic.*
4. **Signature Checks:** Successful checkout calls `/api/donate/verify` to double-check checksum signatures via SHA-256 HMAC encryption, updating campaigns database records instantly.
5. **PDF Receipt:** Celebration confetti triggers, compiling an invoice-style print layout dynamically with legal compliance numbers (Section 80G status, NITI Aayog IDs).

---

## 🧠 AI Helper Features Overview
- **Interactive Chatbot:** Exposes help options regarding hygiene camps and tax questions, generating answers via context-aware keyword engines.
- **AI Report Generator:** Pulls processed donor sums, active camp indices, and volunteer listings, writing a formal social recommendations summary printable instantly.
- **AI Blog Brainstormer:** Instantly creates educational headlines and article parameters centered around women's hygiene.
