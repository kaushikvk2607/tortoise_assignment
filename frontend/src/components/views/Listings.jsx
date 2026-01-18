import { useState } from "react";
import { Plus, Edit2, Search, Package } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Badge from "../ui/Badge";
import DeviceForm from "../DeviceForm";

const Listings = ({ devices, onUpdateDevice, onAddDevice, userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Smartphone", "Laptop", "Tablet", "Wearable"];

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || device.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (device) => {
    setEditingDevice(device);
    setShowForm(true);
  };

  const handleSubmit = (deviceData) => {
    if (editingDevice) {
      onUpdateDevice(editingDevice._id, deviceData);
    } else {
      onAddDevice(deviceData);
    }
    setShowForm(false);
    setEditingDevice(null);
  };

  const getStockBadge = (stock) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock <= 5) return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">In Stock</Badge>;
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">My Listings</h1>
          <p className="text-base text-muted-foreground mt-1">Manage your device catalog</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-base font-medium transition-colors cursor-pointer ${filter === cat
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDevices.map((device) => (
          <Card key={device._id} className="group overflow-hidden">
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative aspect-square bg-secondary">
                <img
                  src={device.image}
                  alt={device.model}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleEdit(device)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Edit2 className="h-4 w-4 text-foreground" />
                </button>
                <div className="absolute bottom-2 left-2">
                  {getStockBadge(device.stock)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-medium text-foreground">{device.brand} {device.model}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{device.variant}</p>

                <div className="flex items-end justify-between mt-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">MRP</p>
                    <p className="text-base font-semibold text-foreground">₹{device.mrp?.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Lease</p>
                    <p className="text-base font-semibold text-primary">₹{device.lease_12m?.toLocaleString()}/mo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty */}
      {filteredDevices.length === 0 && (
        <div className="py-16 text-center">
          <Package className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium text-foreground">No devices found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Listings;
