# Tortoise Supplier Portal

Professional device management portal for Tortoise's device leasing marketplace with MongoDB backend.

## Recent Improvements (v2.0)

- **Enhanced UI/UX**: Significantly improved font sizes and readability across the application.
- **Mobile Responsiveness**: optimized layouts for mobile devices, including wrapping filters, responsive grids, and better touch targets.
- **Swipe-enabled Sidebar**: New sidebar implementation with touch gestures (swipe right to open, swipe left to close) and smooth animations.
- **Desktop Visibility**: Fixed sidebar visibility issues on larger screens.

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
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## Project Structure

```
tortoise/
├── frontend/             # React frontend (Vite)
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

- ✅ **Device Listing Management**: Create, read, update, and delete device listings.
- ✅ **Real-time Stock Updates**: Monitor inventory levels with visual indicators.
- ✅ **Multi-tier Lease Pricing**: Manage pricing for different lease durations (12m, 18m, 24m).
- ✅ **Offer Management**: Create and track promotional offers.
- ✅ **Analytics Dashboard**: Visual insights into revenue, stock levels, and top-performing devices.
- ✅ **Responsive Design**: Fully functional on mobile, tablet, and desktop.
- ✅ **Touch Gestures**: Swipe-enabled sidebar for mobile browsing.
- ✅ **MongoDB Integration**: Robust data persistence.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Lucide Icons
**Backend:** Node.js, Express, MongoDB, Mongoose
**Architecture:** RESTful API, SPA

## Assignment

This project fulfills the Tortoise Product Manager internship assignment to create a supplier-facing portal for managing device listings, pricing, offers, and inventory with real-time synchronization.