# 🌟 BridgeImpact (Sankalp Social Awareness Network)

> **Democratizing Corporate CSR Capital, Verified Grassroots Impact & Citizen Volunteering across India.**

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20TailwindCSS-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)

---

## 🏛️ Executive Leadership

- **Founder & Executive Director:** **Mr. Manmath N. Sangave**
- **Platform Initiative:** **BridgeImpact Network**
- **Vision:** Eliminating administrative friction between corporate CSR resources, NITI Aayog Darpan-verified non-profits, and passionate citizen volunteers through immutable digital certification and real-time community mobilization.

---

## 🚀 Key Platform Capabilities

### 1. 🤝 Unified Tri-Party Operating Model
- **For Corporates & PSUs:** Fulfill MCA Section 135 mandates, browse verified 80G non-profit profiles, upload official HR/CEO sanction letters (NOC), and export automated ESG impact dossiers.
- **For Non-Profit Partners:** Centralized DBMS to manage awareness campaigns across Government Offices, Public Sectors, Colleges, and Schools; issue verifiable digital credentials with QR code validation.
- **For Volunteers:** Explore on-ground community drives or quick 2–5 hour micro-tasks (legal, design, content, coding), log authentic service hours, and download tamper-proof certificates.

### 2. 📜 Cryptographic Digital QR Certificate Studio
- Immutable SHA-256 digital signature hashes embedded in every issued certificate.
- Scannable dynamic QR codes for instant recruiter, HR, and institutional auditability.
- **1-Click LinkedIn Integration:** Direct dispatch schema pushing verified credentials to LinkedIn profiles.
- Integrated **Verify Credential Studio** inside the logged-in Volunteer Hub.

### 3. 🤖 AI-Assisted Corporate-NGO Matchmaker
- Algorithmic matching scoring non-profits by cause alignment, district proximity, volunteer capacity, and 80G tax exemption records.

### 4. 🚨 SOS Rapid Disaster & Crisis Response
- Geo-radius (50km) emergency dispatch banner for immediate resource mobilization during floods, crises, and urgent relief operations.

### 5. 🔒 High-Contrast Adaptive Design System
- Modern glassmorphism UI with seamless **Dark Mode / Light Mode** switching.
- Strict high-contrast typography ensuring crystal-clear text readability on all registration and authentication forms.
- Passwordless 6-digit email OTP verification backed by Nodemailer & Express.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | React 18, Vite 5, TailwindCSS 3, Lucide Icons, Canvas Confetti |
| **Styling & Theme** | Modern Glassmorphism 2.0, Dark/Light Mode Sync, Plus Jakarta Sans |
| **Backend & APIs** | Node.js, Express 5, Nodemailer, Rate Limiting, CORS |
| **Database & ORM** | PostgreSQL & Prisma ORM Schema (`prisma/schema.prisma`) |
| **Deployment** | Vercel (SPA Routing Fallbacks & Rewrites), Netlify Support |

---

## 📂 Project Architecture

```plaintext
Sankalp/
├── public/                      # Static assets & routing redirects
│   ├── _redirects              # Netlify SPA fallback
│   └── favicon.svg             # Application brand favicon
├── prisma/
│   └── schema.prisma           # Prisma ORM PostgreSQL schema
├── src/
│   ├── assets/
│   │   └── images/             # Photographic evidence & founder profile assets
│   ├── components/             # Reusable UI components & modals
│   │   ├── AuthModal.jsx       # Security gateway & OTP authentication
│   │   ├── CertificateStudio.jsx # Accredited PDF/Print certificate studio
│   │   ├── CorporateRequestModal.jsx # HR/CEO NOC sanction upload modal
│   │   ├── EventCard.jsx       # Interactive event drive card
│   │   ├── Navbar.jsx          # Compact horizontal navigation & theme toggle
│   │   ├── SosEmergencyBanner.jsx # SOS crisis dispatch alert
│   │   └── ToastNotification.jsx # Real-time reactive feedback toast
│   ├── context/
│   │   └── AppContext.jsx      # Global state, authentication, and DBMS store
│   ├── utils/
│   │   └── qrCodeGenerator.js  # Pure SVG QR code generation engine
│   ├── views/                  # Primary full-page views
│   │   ├── AboutUsView.jsx     # Founder spotlight (Mr. Manmath N. Sangave) & BridgeImpact
│   │   ├── AdminDbmsView.jsx   # NGO administration, session audit & NOC inspector
│   │   ├── AiMatchmakerView.jsx # AI-powered CSR matchmaker wizard
│   │   ├── CertificateVerificationView.jsx # Public QR audit page
│   │   ├── CompanyLoginView.jsx # Corporate / Institutional portal
│   │   ├── CorporatePartnerView.jsx # Multi-NGO directory & ESG reports
│   │   ├── EsgReportGeneratorView.jsx # MCA Section 135 compliance export
│   │   ├── EventsView.jsx      # Skill-based & micro-volunteering hub
│   │   ├── HomeView.jsx        # Landing hero, impact statistics & triage
│   │   ├── NgoLoginView.jsx    # Partner access & Darpan onboarding
│   │   ├── PastHistoryView.jsx # Documented photographic audit archive
│   │   └── VolunteerDashboardView.jsx # Volunteer Hub & Verify Credential Studio
│   ├── App.jsx                 # View router, compact footer & modals
│   ├── index.css               # Global base tokens & high-contrast input layer
│   └── main.jsx                # React DOM entry point
├── server.js                   # Node.js backend for Email OTP dispatch
├── vercel.json                 # Vercel deployment SPA rewrite configuration
└── package.json                # Project dependencies and build scripts
```

---

## ⚡ Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/manmath2005/Sankalp-.git
cd Sankalp-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Run Development Server
```bash
# Terminal 1: Run Vite Frontend
npm run dev

# Terminal 2 (Optional): Run Email OTP Backend Server
npm run server
```

The application will be available at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```

---

## 🔐 Role Demo Reference (For Evaluators)

| Portal / Role | Email | Auth Method |
| :--- | :--- | :--- |
| 👤 **Volunteer Hub** | `rohan.verma@example.com` | `volunteer123` *(or passwordless 6-digit email OTP)* |
| 🏢 **Corporate / PSU Portal** | `corporate@sbi-staff.org` | `company123password` *(or passwordless email OTP)* |
| 🛡️ **Partner Portal** | `contact@sankalpfoundation.org` | `ngo123password` *(or passwordless email OTP)* |
| 🔒 **System Security Admin** | `admin@sankalp.org` | `admin123password` |

---

## 📜 Compliance & Accreditations
- **MCA Section 135**: Compliant corporate CSR documentation and audit trails.
- **NITI Aayog Darpan**: NGO accreditation ledger integration.
- **Tax Exemptions**: Form 80G & 12A compliant reporting workflows.

---

## 👨‍💻 Maintainer & Founder
**Mr. Manmath N. Sangave**  
*Founder & Executive Director, BridgeImpact*  
*Repository:* [https://github.com/manmath2005/Sankalp-](https://github.com/manmath2005/Sankalp-)
