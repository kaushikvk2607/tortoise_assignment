# Tortoise Supplier Portal

Professional device management portal for Tortoise's device leasing marketplace with MongoDB backend.

## Quick Start

### 1. Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### 2. Setup Backend (Terminal 1)
```bash
cd backend
npm install
npm run seed
npm run dev
```
Backend runs on: http://localhost:5000

### 3. Setup Frontend (Terminal 2)
```bash
cd supplier-portal
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## Project Structure

```
tortoise/
├── supplier-portal/       # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── services/     # API layer
│   │   └── App.jsx
│   ├── README.md
│   └── package.json
│
├── backend/              # Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── config/          # Database config
│   ├── scripts/         # Seed scripts
│   ├── README.md
│   └── package.json
│
└── README.md            # This file
```

## Features

- ✅ Device listing management (CRUD)
- ✅ Real-time stock updates
- ✅ Multi-tier lease pricing
- ✅ Offer management
- ✅ Analytics dashboard
- ✅ MongoDB integration
- ✅ RESTful API

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Lucide Icons  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Architecture:** RESTful API, SPA

## Assignment

This project fulfills the Tortoise Product Manager internship assignment to create a supplier-facing portal for managing device listings, pricing, offers, and inventory with real-time synchronization.