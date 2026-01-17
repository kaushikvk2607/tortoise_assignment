require('dotenv').config();
const mongoose = require('mongoose');
const Device = require('../models/Device');
const Offer = require('../models/Offer');
const connectDB = require('../config/database');

const seedData = async () => {
  try {
    await connectDB();

    await Device.deleteMany({});
    await Offer.deleteMany({});

    const devices = await Device.insertMany([
      {
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
        image: "https://images.unsplash.com/photo-1704380895316-caa2e4d68a7e?w=400&h=400&fit=crop",
        status: "active"
      },
      {
        brand: "Samsung",
        model: "Galaxy S24 Ultra",
        variant: "512GB, Titanium Gray",
        category: "Smartphone",
        mrp: 129999,
        lease_12m: 10833,
        lease_18m: 7222,
        lease_24m: 5417,
        deposit: 12999,
        stock: 8,
        sku: "SAM-S24U-512-TG",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
        status: "active"
      },
      {
        brand: "Apple",
        model: "MacBook Pro 14",
        variant: "M3 Pro, 512GB",
        category: "Laptop",
        mrp: 199900,
        lease_12m: 16658,
        lease_18m: 11106,
        lease_24m: 8329,
        deposit: 19990,
        stock: 3,
        sku: "APL-MBP14-M3P-512",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        status: "active"
      },
      {
        brand: "Dell",
        model: "XPS 15",
        variant: "i7, 16GB, 1TB SSD",
        category: "Laptop",
        mrp: 175000,
        lease_12m: 14583,
        lease_18m: 9722,
        lease_24m: 7292,
        deposit: 17500,
        stock: 0,
        sku: "DELL-XPS15-I7-1TB",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
        status: "active"
      }
    ]);

    await Offer.insertMany([
      {
        name: "New Year Sale",
        type: "percentage",
        value: 15,
        deviceIds: [devices[0]._id, devices[1]._id],
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-01-31"),
        status: "active"
      },
      {
        name: "Laptop Clearance",
        type: "flat",
        value: 5000,
        deviceIds: [devices[2]._id, devices[3]._id],
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-02-15"),
        status: "active"
      }
    ]);

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
