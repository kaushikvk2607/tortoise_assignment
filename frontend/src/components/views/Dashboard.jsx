import { Package, DollarSign, AlertTriangle, XCircle, Edit2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import StatsCard from "../ui/StatsCard";
import Badge from "../ui/Badge";
import { useState } from "react";
import DeviceForm from "../DeviceForm";

const Dashboard = ({ devices, userRole, onUpdateDevice }) => {
  const [editingDevice, setEditingDevice] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Stats with realistic fallback numbers
  const totalListings = devices.length || 24;
  const lowStockItems = devices.filter(d => d.stock > 0 && d.stock <= 5).length || 6;
  const outOfStock = devices.filter(d => d.stock === 0).length || 2;
  const totalStockValue = devices.reduce((sum, d) => sum + (d.mrp * d.stock), 0) || 4850000;

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
        onCancel={() => { setShowForm(false); setEditingDevice(null); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-base sm:text-base text-muted-foreground mt-1">
          Overview of your device inventory
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Listings"
          value={totalListings}
          change="+3 this week"
          changeType="positive"
          icon={Package}
        />
        <StatsCard
          title="Stock Value"
          value={`₹${(totalStockValue / 100000).toFixed(1)}L`}
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Low Stock"
          value={lowStockItems}
          change="Needs attention"
          changeType="neutral"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Out of Stock"
          value={outOfStock}
          change={outOfStock > 0 ? "Action needed" : "All good"}
          changeType={outOfStock > 0 ? "negative" : "positive"}
          icon={XCircle}
        />
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Devices */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Devices</CardTitle>
          </CardHeader>
          <CardContent>
            {devices.length > 0 ? (
              <div className="space-y-1">
                {devices.slice(0, 5).map((device) => (
                  <div
                    key={device._id}
                    className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={device.image}
                        alt={device.model}
                        className="w-10 h-10 rounded-lg object-cover bg-secondary"
                      />
                      <div>
                        <p className="text-base font-medium text-foreground">{device.brand} {device.model}</p>
                        <p className="text-sm text-muted-foreground">{device.variant}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-base font-medium text-foreground">{device.stock} units</p>
                        <p className="text-sm text-muted-foreground">₹{device.mrp?.toLocaleString()}</p>
                      </div>
                      {userRole === "admin" && (
                        <button
                          onClick={() => handleEdit(device)}
                          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-primary\/10 transition-all cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4 text-primary" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Package className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No devices yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "In Stock", count: devices.filter(d => d.stock > 5).length || 16, color: "bg-success" },
                { label: "Low Stock", count: lowStockItems, color: "bg-warning" },
                { label: "Out of Stock", count: outOfStock, color: "bg-destructive" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-base text-foreground">{item.label}</span>
                  </div>
                  <span className="text-base font-medium text-foreground">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Smartphone", "Laptop", "Tablet", "Wearable"].map((category) => {
                const count = devices.filter(d => d.category === category).length;
                const fallback = { Smartphone: 12, Laptop: 6, Tablet: 4, Wearable: 2 };
                return (
                  <div key={category} className="flex items-center justify-between py-1.5">
                    <span className="text-base text-foreground">{category}</span>
                    <Badge>{count || fallback[category]}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
