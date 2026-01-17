import { Package, TrendingUp, AlertTriangle, DollarSign, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { useState } from "react";
import DeviceForm from "../DeviceForm";

const Dashboard = ({ devices, userRole, onUpdateDevice }) => {
  const [editingDevice, setEditingDevice] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const totalListings = devices.length;
  const activeListings = devices.filter(d => d.status === "active").length;
  const lowStockItems = devices.filter(d => d.stock > 0 && d.stock <= 5).length;
  const outOfStock = devices.filter(d => d.stock === 0).length;
  const totalStockValue = devices.reduce((sum, d) => sum + (d.mrp * d.stock), 0);

  const stats = [
    {
      label: "Total Listings",
      value: totalListings,
      icon: Package,
      color: "text-blue-600",
    },
    {
      label: "Total Stock Value",
      value: `₹${(totalStockValue / 100000).toFixed(2)}L`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Low Stock Alerts",
      value: lowStockItems,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: TrendingUp,
      color: "text-red-600",
    },
  ];

  const handleEdit = (device) => {
    setEditingDevice(device);
    setShowForm(true);
  };

  const handleSubmit = (deviceData) => {
    if (editingDevice) {
      onUpdateDevice(editingDevice._id, deviceData);
    }
    setShowForm(false);
    setEditingDevice(null);
  };

  if (showForm) {
    return (
      <DeviceForm
        device={editingDevice}
        onSubmit={handleSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingDevice(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Overview of your device listings and inventory
          {userRole && <span className="ml-2 text-primary font-semibold">({userRole.charAt(0).toUpperCase() + userRole.slice(1)} View)</span>}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {devices.slice(0, 5).map((device) => (
              <div 
                key={device._id} 
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 hover:bg-accent/50 p-2 rounded transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img src={device.image} alt={device.model} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <p className="font-medium">{device.brand} {device.model}</p>
                    <p className="text-sm text-muted-foreground">{device.variant}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium">Stock: {device.stock}</p>
                    <p className="text-sm text-muted-foreground">₹{device.mrp.toLocaleString()}</p>
                  </div>
                  {userRole === "admin" && (
                    <button
                      onClick={() => handleEdit(device)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-primary/10 rounded-md cursor-pointer"
                      title="Edit device"
                    >
                      <Edit className="h-4 w-4 text-primary" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats for Admin View */}
      {userRole === "admin" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Stock Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">
                  <span className="text-sm font-medium">High Stock ({">"} 10)</span>
                  <span className="text-sm font-bold">{devices.filter(d => d.stock > 10).length} items</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">
                  <span className="text-sm font-medium">Medium Stock (6-10)</span>
                  <span className="text-sm font-bold">{devices.filter(d => d.stock >= 6 && d.stock <= 10).length} items</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">
                  <span className="text-sm font-medium">Low Stock (1-5)</span>
                  <span className="text-sm font-bold text-orange-600">{devices.filter(d => d.stock >= 1 && d.stock <= 5).length} items</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">
                  <span className="text-sm font-medium">Out of Stock</span>
                  <span className="text-sm font-bold text-red-600">{devices.filter(d => d.stock === 0).length} items</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Smartphone", "Laptop", "Tablet", "Wearable"].map(category => {
                  const count = devices.filter(d => d.category === category).length;
                  return (
                    <div key={category} className="flex justify-between items-center p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm font-bold">{count} items</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
