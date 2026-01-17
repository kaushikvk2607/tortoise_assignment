# Tortoise Supplier Portal - Backend API

RESTful API for managing device listings and offers in the Tortoise device leasing marketplace.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Setup

### Prerequisites
- Node.js v18+
- MongoDB v6+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tortoise-supplier
NODE_ENV=development
```

3. Seed the database:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Devices

**Get all devices**
```
GET /api/devices
Query params: ?search=iPhone&category=Smartphone
```

**Get single device**
```
GET /api/devices/:id
```

**Create device**
```
POST /api/devices
Body: {
  brand: "Apple",
  model: "iPhone 15 Pro",
  variant: "256GB, Natural Titanium",
  category: "Smartphone",
  mrp: 134900,
  lease_12m: 11241,
  lease_18m: 7494,
  lease_24m: 5621,
  deposit: 13490,
  stock: 15,
  sku: "APL-IP15P-256-NT",
  image: "https://example.com/image.jpg"
}
```

**Update device**
```
PUT /api/devices/:id
Body: { stock: 20, mrp: 130000 }
```

**Update stock only**
```
PATCH /api/devices/:id/stock
Body: { stock: 10 }
```

**Delete device**
```
DELETE /api/devices/:id
```

### Offers

**Get all offers**
```
GET /api/offers
```

**Get single offer**
```
GET /api/offers/:id
```

**Create offer**
```
POST /api/offers
Body: {
  name: "Summer Sale",
  type: "percentage",
  value: 20,
  deviceIds: ["deviceId1", "deviceId2"],
  startDate: "2026-06-01",
  endDate: "2026-06-30"
}
```

**Update offer**
```
PUT /api/offers/:id
Body: { value: 25 }
```

**Delete offer**
```
DELETE /api/offers/:id
```

## Database Models

### Device Schema
```javascript
{
  brand: String (required),
  model: String (required),
  variant: String (required),
  category: String (enum: ['Smartphone', 'Laptop', 'Tablet', 'Wearable']),
  mrp: Number (required),
  lease_12m: Number (required),
  lease_18m: Number (required),
  lease_24m: Number (required),
  deposit: Number (required),
  stock: Number (default: 0),
  sku: String (unique, required),
  image: String (required),
  status: String (enum: ['active', 'inactive'], default: 'active'),
  createdAt: Date,
  updatedAt: Date
}
```

### Offer Schema
```javascript
{
  name: String (required),
  type: String (enum: ['percentage', 'flat'], required),
  value: Number (required),
  deviceIds: [ObjectId] (ref: 'Device'),
  startDate: Date (required),
  endDate: Date (required),
  status: String (enum: ['active', 'inactive', 'expired'], default: 'active'),
  createdAt: Date,
  updatedAt: Date
}
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "message": "Error description"
}
```
