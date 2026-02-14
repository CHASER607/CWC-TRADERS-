# CWC Traders Portal

CWC Traders Portal is a Robotrader-style platform for users to manage subscriptions, connect MT4/MT5 terminals, and control Expert Advisors (EAs) safely through a server bridge.

## 1) Core System Components

You need three layers:

### Frontend (Web/App UI)
- Build with **React.js** or **Next.js** for web.
- Use **Flutter** if you also want a native mobile app.
- Main features:
  - Login / signup
  - User dashboard
  - EA controls (start/stop, risk)
  - Subscription management
- Must be responsive/mobile-friendly.

### Backend (Server & API)
- Build with **Node.js**, **Django**, or **FastAPI**.
- Stores:
  - Users
  - Subscription status
  - Trade signals/commands
  - Broker account telemetry from EA
- Exposes API endpoints so EAs can:
  - Pull commands/signals
  - Push account and trade updates

### Trading Bridge (EA + Broker)
- User installs your EA in MT4/MT5 terminal.
- EA connects to your API with `WebRequest`.
- EA executes trades on the user account.
- **Only the EA talks to the broker directly** (server does not log in to user broker accounts).

## 2) Recommended Architecture

```text
User → Web App → Your Server → MT4/MT5 EA → Broker
```

Why this model:
- Safer and scalable
- User keeps account control
- Your platform only sends signals/commands and receives status

## 3) Server & Hosting

Recommended baseline:
- **VPS:** Ubuntu 22.04, minimum 2–4GB RAM
- **Stack:** Node.js or Python, PostgreSQL/MySQL, Nginx, SSL

Server responsibilities:
- User authentication/authorization
- Subscription lifecycle and access control
- Signal storage and delivery
- EA communication endpoints

## 4) MT4/MT5 EA Logic

The EA should poll your server for bot commands (buy/sell, risk %, start/stop):

```mql4
string serverURL = "https://yourdomain.com/api/signal";

void OnTick()
{
   string response = WebRequest("GET", serverURL, "", "", 0, "", "");
   if(response == "BUY") { OrderSend(...); }
   else if(response == "SELL") { OrderSend(...); }
}
```

Important:
- Users must allow your domain in **MT4/MT5 WebRequest settings**.
- Include retry/fail-safe behavior if API is temporarily unavailable.

## 5) Optional Professional Broker Integration

For advanced enterprise setups only:
- FIX API
- MT5 Manager API

These options usually require broker agreements and are harder to obtain. Most startups should begin with:

```text
EA ↔ Server ↔ Broker
```

## 6) Dashboard / User Portal Features

Minimum practical dashboard:
- Connect trading account (via EA registration)
- Show balance/equity/open trades
- Activate/stop bots
- Risk management slider/controls
- Trade history
- Subscription status/expiry

## 7) Payments

Supported gateways (example):
- PayFast (South Africa)
- Stripe
- PayPal

Post-payment automation:
- Activate subscription automatically
- Grant portal access
- Send EA download/setup instructions

## 8) Start Small (MVP Roadmap)

1. Build login + dashboard + subscription logic
2. Create EA that connects to your API
3. Deploy backend/frontend on VPS
4. Test with demo broker accounts
5. Gradually add:
   - Trade history depth
   - Multi-bot management
   - Notifications and alerts

## Compliance Note

If you operate in South Africa and provide paid trading-related software/signals, get legal guidance on FSCA-related obligations. Position the product as software infrastructure, include clear risk disclosures, and avoid guaranteed-profit claims.
