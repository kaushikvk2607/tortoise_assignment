import { useState } from "react";
import { Plus, Edit, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Badge from "../ui/Badge";
import DeviceForm from "../DeviceForm";

const Listings = ({ devices, onUpdateDevice, onAddDevice, userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const filteredDevices = devices.filter(
    (device) =>
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    if (stock <= 5) return <Badge variant="outline">Low Stock ({stock})</Badge>;
    return <Badge variant="success">In Stock ({stock})</Badge>;
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Listings</h2>
          <p className="text-muted-foreground mt-1">
            Manage your device catalog
            {userRole && <span className="ml-2 text-primary font-semibold">({userRole.charAt(0).toUpperCase() + userRole.slice(1)} View)</span>}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by brand, model, or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device) => (
          <Card key={device._id} className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <CardContent className="p-4">
              <div className="space-y-3">
                <img
                  src={device.image}
                  alt={device.model}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{device.brand} {device.model}</h3>
                      <p className="text-sm text-muted-foreground">{device.variant}</p>
                      <p className="text-xs text-muted-foreground mt-1">SKU: {device.sku}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(device)}
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">MRP:</span>
                      <span className="font-medium">₹{device.mrp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">12M Lease:</span>
                      <span className="font-medium">₹{device.lease_12m.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    {getStockBadge(device.stock)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No devices found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Listings;
