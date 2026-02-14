# CWC Traders Portal

A Robotrader-style portal for onboarding users, managing subscriptions, and controlling MT4/MT5 Expert Advisors (EAs) through a secure backend bridge.

## What This Project Is Building

Core goals:
- User authentication (signup/login)
- Trading portal dashboard
- MT4/MT5 broker account connection flow
- EA lifecycle controls (start/stop/risk)
- Production backend + database
- Mobile-friendly web experience

## Recommended Architecture

```text
User
  ↓
Frontend (Next.js / React)
  ↓ HTTPS
Backend API (Node.js or FastAPI)
  ↓
PostgreSQL
  ↓
Signal + Account APIs
  ↓
MT4/MT5 EA Bridge (installed on client terminal)
  ↓
Broker
```

### Why an EA Bridge Is Required
Web apps cannot directly place trades on most MT4/MT5 brokers. The standard pattern is:

1. EA polls (or streams from) your server
2. EA receives authorized signals/settings
3. EA executes orders locally on the user's terminal/account
4. EA posts account/trade status back to your backend

## Product Modules

### 1) Frontend Portal
- Auth pages (signup/login/reset)
- Dashboard overview (status, balance, equity, open trades)
- Account connection instructions
- Bot controls (risk %, symbols, start/stop)
- Subscription/billing pages
- Trade history and logs

### 2) Backend Platform
- Auth + role-based access
- Subscription enforcement
- Signal orchestration
- EA/device registration
- Broker account telemetry storage
- Admin panel APIs

### 3) MT4/MT5 EA Bridge
- Secure API token auth
- Pull strategy settings/signals
- Send heartbeats + account metrics
- Execute/manage trades
- Fail-safe logic if API unavailable

## Suggested Tech Stack

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Node.js (NestJS/Express) or Python (FastAPI)
- **Database:** PostgreSQL
- **Cache/Queue:** Redis + BullMQ/Celery
- **Hosting:** Ubuntu VPS (Hetzner / Contabo / DigitalOcean)
- **Reverse Proxy:** Nginx
- **TLS:** Let's Encrypt SSL

## MVP Delivery Plan

### Phase 1 — Foundation
- Setup monorepo/app structure
- Implement auth + protected dashboard
- Add subscription model and entitlement checks

### Phase 2 — EA Connectivity
- Build EA registration flow
- Implement `/api/signal` and `/api/heartbeat`
- Store account stats + terminal status

### Phase 3 — Trading Controls
- Add bot start/stop and risk controls
- Add audit logs and command history
- Add demo-account testing workflows

### Phase 4 — Production Hardening
- Monitoring + alerts
- Retry/fallback handling
- Backups and security review
- Billing automation (Stripe/PayFast/PayPal)

## Security Checklist

- JWT/session hardening
- Device-bound EA tokens
- Request signing + timestamp validation
- Rate limiting and WAF rules
- Encrypted secrets management
- Full audit trail for all trade commands

## Compliance & Legal Notes

If operating in South Africa, consult regulatory counsel regarding FSCA obligations. For most early-stage deployments, position the product as a software platform (not managed funds), include risk disclosures, and avoid profit guarantees.

## Immediate Next Steps

1. Approve stack (Next.js + FastAPI or Next.js + Node)
2. Scaffold frontend and backend services
3. Implement auth and subscription entities
4. Define EA API contract (`signal`, `heartbeat`, `status`, `orders`)
5. Run end-to-end demo on MT5 demo account
