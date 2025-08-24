# Store Management

A demo project showcasing a **real-time store management**, **real-time order manager** and **stripe payment integration** using **Next.js**, **Express**, **Socket.IO**, and an in-memory **SQLite** database.

---

## Live Demo

Check out the live demo of this application at: [store-menegment](https://store-menegment.onrender.com/)

---

##  Features

- **Store Management** — Fetch and display store items.
- **Order Management** — Place orders in real time, orders update live using Socket.IO.
- **Simple Data Storage** — In-memory SQLite for quick setup and demonstration.
- **Stripe Payment Integration** — "Charge Extra" button using Stripe Checkout.

---

##  Tech Stack

- **Frontend:** Next.js
- **Backend:** Express.js with Socket.IO
- **Database:** SQLite (in-memory)
- **Payment:** Stripe Checkout

---

##  Quick Start

### Prerequisites

- Node.js
- npm

### Run the App

```bash
# In one terminal: server
cd server
npm install
npm run dev

# In another terminal: client
cd client
npm install
npm run dev
```

### Access the App

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000