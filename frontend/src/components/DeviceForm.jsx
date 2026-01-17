import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";

const DeviceForm = ({ device, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    brand: device?.brand || "",
    model: device?.model || "",
    variant: device?.variant || "",
    category: device?.category || "Smartphone",
    mrp: device?.mrp || "",
    lease_12m: device?.lease_12m || "",
    lease_18m: device?.lease_18m || "",
    lease_24m: device?.lease_24m || "",
    deposit: device?.deposit || "",
    stock: device?.stock || "",
    sku: device?.sku || "",
    image: device?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      mrp: Number(formData.mrp),
      lease_12m: Number(formData.lease_12m),
      lease_18m: Number(formData.lease_18m),
      lease_24m: Number(formData.lease_24m),
      deposit: Number(formData.deposit),
      stock: Number(formData.stock),
    };
    onSubmit(processedData);
  };

  const categories = ["Smartphone", "Laptop", "Tablet", "Wearable"];

  return (
    <div className="space-y-6">
      <div>
      <Button variant="ghost" onClick={onCancel} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Listings
      </Button>
        <h2 className="text-3xl font-bold tracking-tight">
          {device ? "Edit Device" : "Add New Device"}
        </h2>
        <p className="text-muted-foreground mt-1">
          {device ? "Update device information" : "Create a new device listing"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Apple, Samsung, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Input
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="iPhone 15 Pro"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Variant</label>
                <Input
                  name="variant"
                  value={formData.variant}
                  onChange={handleChange}
                  placeholder="256GB, Natural Titanium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-primary/50 focus:border-primary transition-colors cursor-pointer"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">SKU</label>
                <Input
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="APL-IP15P-256-NT"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Quantity</label>
                <Input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="50"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Pricing</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">MRP (₹)</label>
                  <Input
                    name="mrp"
                    type="number"
                    value={formData.mrp}
                    onChange={handleChange}
                    placeholder="134900"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Deposit (₹)</label>
                  <Input
                    name="deposit"
                    type="number"
                    value={formData.deposit}
                    onChange={handleChange}
                    placeholder="13490"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">12 Month Lease (₹/month)</label>
                  <Input
                    name="lease_12m"
                    type="number"
                    value={formData.lease_12m}
                    onChange={handleChange}
                    placeholder="11241"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">18 Month Lease (₹/month)</label>
                  <Input
                    name="lease_18m"
                    type="number"
                    value={formData.lease_18m}
                    onChange={handleChange}
                    placeholder="7494"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">24 Month Lease (₹/month)</label>
                  <Input
                    name="lease_24m"
                    type="number"
                    value={formData.lease_24m}
                    onChange={handleChange}
                    placeholder="5621"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {device ? "Update Device" : "Create Device"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default DeviceForm;
