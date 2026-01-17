const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  variant: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Smartphone', 'Laptop', 'Tablet', 'Wearable']
  },
  mrp: {
    type: Number,
    required: true,
    min: 0
  },
  lease_12m: {
    type: Number,
    required: true,
    min: 0
  },
  lease_18m: {
    type: Number,
    required: true,
    min: 0
  },
  lease_24m: {
    type: Number,
    required: true,
    min: 0
  },
  deposit: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

deviceSchema.index({ brand: 1, model: 1 });
deviceSchema.index({ sku: 1 });
deviceSchema.index({ category: 1 });

module.exports = mongoose.model('Device', deviceSchema);
