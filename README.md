# 🎗️ She Can Foundation - World-Class Social Impact NGO Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-7.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-F43F5E?style=for-the-badge&logo=framer-motion)](https://www.framer.com/motion/)

A visually stunning, emotionally powerful, and highly premium cinematic full-stack NGO platform designed to end period poverty, support rural girl child education, host wellness clinics, and establish female vocational self-reliance across India. 

---

## 🌟 Full-Stack Development Internship Task Highlights

This platform was built as part of the **Full-Stack Development Internship Task** for the **She Can Foundation**. It successfully fulfills all baseline requirements while incorporating advanced, enterprise-grade architecture.

### 📋 Requirements Mapping

| Requirement | Implementation Status | Technical Implementation Details |
| :--- | :---: | :--- |
| **Name Field** | ✅ Yes | Strictly validated input field with auto-capitalization and white-space trimming. |
| **Email Field** | ✅ Yes | RFC-compliant standard validation on both the client (React state) and the server (Next.js serverless route). |
| **Message/Resume Field** | ✅ Yes | General contact message field **plus** a premium drag-and-drop resume uploader (`.pdf`/`.doc`/`.docx`). |
| **Submit Button** | ✅ Yes | Animated, state-aware button with loading spinners, disabling on active submission to prevent duplicate postings. |
| **Success Banner** | ✅ Yes | Renders a gorgeous glassmorphic success banner saying **"Form Submitted Successfully"** along with a canvas confetti celebration. |

### 🚀 Beyond the Call of Duty (Advanced Features)
* **Live PostgreSQL Database Integration:** Connected to a cloud-hosted PostgreSQL database using **Prisma ORM** to log volunteer requests and donations securely.
* **Drag-and-Drop Resume File Upload:** Fully custom uploader that parses files to Base64 strings, saving them securely inside PostgreSQL text blocks—eliminating the need for complex, costly S3 buckets.
* **Secured Admin Control Panel:** A fully featured workspace at `/dashboard` displaying dynamic donor lists, active volunteer matrices, and interactive **"Download & View Resume"** badges.
* **Strict RegEx Client & Server Validations:** Standardized formatting validations for emails and Indian phone numbers (10 digits, starts with 6-9, automatically strips brackets/hyphens/spaces) on both client components and POST API endpoints.
* **Dynamic UPI QR Donation Integration:** An interactive donation dashboard mapping user presets to real-world impacts, supported by a beautifully styled scannable UPI QR code modal (`/donate.png`) and Razorpay SDK webhooks.
* **Interactive Dynamic Counters:** Real-time metrics counters on the homepage synced directly to backend endpoints (`/api/stats`), starting from realistic historical baselines (`1000+` Girls Mentored, `10000+` Pads Distributed, `2000+` Champions).

---

## 🎨 Visual Aesthetics & Design System

The visual layout matches leading global non-profit designs (e.g., *charity: water*, *UN Women*, and *Apple-style cinematic storytelling*) featuring:
* **Primary Palette:** Deep Purple (`#5B21B6`), Royal Violet (`#7C3AED`) — representing elegance, strength, and royalty.
* **Secondary Palette:** Warm Pink (`#EC4899`), Peach Glow (`#FDBA74`) — representing warmth, care, and organic connection.
* **Neutral Palette:** Soft White (`#FAFAFA`), Charcoal Black (`#111827`) — providing high contrast, readability, and a premium print feel.
* **Visual Utilities:** Transparent-to-glassmorphic scrolling navigation, floating glow drop-shadow filters, fluid CSS mesh gradients, and soft watercolor texture overlays.
* **Micro-Animations:** Interactive before/after storytelling cards, count-up statistical numbers, hover-tilt program sliders, and canvas-confetti success alerts.

---

## 🛠️ Technology Stack

* **Frontend Core:** Next.js 16 (App Router), TypeScript, and TailwindCSS.
* **Interactions & Animations:** Framer Motion transition curves, dynamic React client states, and Lucide Icons.
* **Database Layer:** Prisma ORM connecting securely to a cloud PostgreSQL database (Supabase).
* **Payment Processing:** Secure Razorpay SDK integration supporting order creation APIs, signature checksum validations, and automated PDF tax receipt downloads.
* **AI Assist Tools:** Floating natural-conversation chatbot, AI analytical report compilers, and AI CMS blog brainstorm generators.

---

## 📂 Core Folder & Directory Architecture

```
shecanfoundation/
├── prisma/
│   ├── schema.prisma         # Database schemas for Volunteers, Donations, Campaigns, etc.
│   └── migrations/           # Database migration logs
├── public/
│   ├── SheCan.png            # Official premium logo asset
│   ├── donate.png            # Scannable UPI QR code
│   └── volunteers_distributing.png # Custom generated hero illustration
├── src/
│   ├── app/                  # App Router layout and pages
│   │   ├── api/              # Secure REST APIs (Auth, Stats, Volunteers, Order Creation)
│   │   ├── about/            # History, mission, vision, and legal trust credentials
│   │   ├── blog/             # Impact stories and CMS filters
│   │   ├── contact/          # Support ticket portal and FAQ accordion sheets
│   │   ├── dashboard/        # Advanced SaaS admin dashboard workspace
│   │   ├── donate/           # Campaign status slider, payments checkout, and PDF receipts
│   │   ├── events/           # Countdown timetables, location coordinates, and RSVPs
│   │   ├── programs/         # Strategic focus fields and progress bar metrics
│   │   ├── volunteer/        # Skill matrix selectors and drag-and-drop resume upload
│   │   ├── globals.css       # Custom mesh gradient configurations & Tailwind directives
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

Follow these simple commands to install dependencies, run migrations, and spin up the developer server:

### 1. Clone the repository and install packages:
```bash
cd shecanfoundation
npm install
```

### 2. Configure Environment Variables:
Create a `.env` file at the root of the project. Replace with your actual Supabase database URLs and Razorpay dashboard keys:
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
Push the schema definitions securely onto your Supabase database instance:
```bash
npx prisma db push
```

### 4. Initiate Local Development Server:
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

* **Interactive Chatbot:** Exposes help options regarding hygiene camps and tax questions, generating answers via context-aware keyword engines.
* **AI Report Generator:** Pulls processed donor sums, active camp indices, and volunteer listings, writing a formal social recommendations summary printable instantly.
* **AI Blog Brainstormer:** Instantly creates educational headlines and article parameters centered around women's hygiene.
