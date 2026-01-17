export const mockDevices = [
  {
    id: 1,
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
    status: "active",
    image: "https://images.unsplash.com/photo-1696446702403-63dc3cb338fe?w=400&h=400&fit=crop",
  },
  {
    id: 2,
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
    status: "active",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
  },
  {
    id: 3,
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
    status: "active",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
  },
  {
    id: 4,
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
    status: "active",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
  },
];

export const mockOffers = [
  {
    id: 1,
    name: "New Year Sale",
    type: "percentage",
    value: 15,
    deviceIds: [1, 2],
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    status: "active",
  },
  {
    id: 2,
    name: "Laptop Clearance",
    type: "flat",
    value: 5000,
    deviceIds: [3, 4],
    startDate: "2026-01-15",
    endDate: "2026-02-15",
    status: "active",
  },
];

let devices = [...mockDevices];
let offers = [...mockOffers];

export const getDevices = () => devices;
export const getOffers = () => offers;

export const addDevice = (device) => {
  const newDevice = {
    ...device,
    id: Math.max(...devices.map(d => d.id), 0) + 1,
    status: "active",
  };
  devices.push(newDevice);
  return newDevice;
};

export const updateDevice = (id, updates) => {
  const index = devices.findIndex(d => d.id === id);
  if (index !== -1) {
    devices[index] = { ...devices[index], ...updates };
    return devices[index];
  }
  return null;
};

export const addOffer = (offer) => {
  const newOffer = {
    ...offer,
    id: Math.max(...offers.map(o => o.id), 0) + 1,
    status: "active",
  };
  offers.push(newOffer);
  return newOffer;
};

export const updateOffer = (id, updates) => {
  const index = offers.findIndex(o => o.id === id);
  if (index !== -1) {
    offers[index] = { ...offers[index], ...updates };
    return offers[index];
  }
  return null;
};
