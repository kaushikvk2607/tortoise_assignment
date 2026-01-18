import { useState } from "react";
import { ArrowLeft, Smartphone, Laptop, Tablet, Watch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";

const DeviceForm = ({ device, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    brand: device?.brand || "", model: device?.model || "", variant: device?.variant || "",
    category: device?.category || "Smartphone", mrp: device?.mrp || "", lease_12m: device?.lease_12m || "",
    lease_18m: device?.lease_18m || "", lease_24m: device?.lease_24m || "", deposit: device?.deposit || "",
    stock: device?.stock || "", sku: device?.sku || "", image: device?.image || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, mrp: +form.mrp, lease_12m: +form.lease_12m, lease_18m: +form.lease_18m, lease_24m: +form.lease_24m, deposit: +form.deposit, stock: +form.stock });
  };

  const categories = [
    { name: "Smartphone", icon: Smartphone }, { name: "Laptop", icon: Laptop },
    { name: "Tablet", icon: Tablet }, { name: "Wearable", icon: Watch },
  ];

  return (
    <div className="max-w-2xl">
      <button onClick={onCancel} className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
        <ArrowLeft className="h-5 w-5" /> Back
      </button>
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-1">{device ? "Edit Device" : "Add Device"}</h1>
      <p className="text-base text-muted-foreground mb-6">Fill in the device details</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-base font-medium text-foreground block mb-2">Brand</label><Input name="brand" value={form.brand} onChange={handleChange} required /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">Model</label><Input name="model" value={form.model} onChange={handleChange} required /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">Variant</label><Input name="variant" value={form.variant} onChange={handleChange} required /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">SKU</label><Input name="sku" value={form.sku} onChange={handleChange} required /></div>
            </div>
            <div>
              <label className="text-base font-medium text-foreground block mb-2">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button key={c.name} type="button" onClick={() => setForm({ ...form, category: c.name })}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-lg border cursor-pointer transition-colors ${form.category === c.name ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                      <Icon className="h-6 w-6" /><span className="text-sm font-medium">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-base font-medium text-foreground block mb-2">Stock</label><Input name="stock" type="number" value={form.stock} onChange={handleChange} required min="0" /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">Image URL</label><Input name="image" value={form.image} onChange={handleChange} required /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-base font-medium text-foreground block mb-2">MRP (₹)</label><Input name="mrp" type="number" value={form.mrp} onChange={handleChange} required min="0" /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">Deposit (₹)</label><Input name="deposit" type="number" value={form.deposit} onChange={handleChange} required min="0" /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><label className="text-base font-medium text-foreground block mb-2">12M Lease</label><Input name="lease_12m" type="number" value={form.lease_12m} onChange={handleChange} required min="0" /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">18M Lease</label><Input name="lease_18m" type="number" value={form.lease_18m} onChange={handleChange} required min="0" /></div>
              <div><label className="text-base font-medium text-foreground block mb-2">24M Lease</label><Input name="lease_24m" type="number" value={form.lease_24m} onChange={handleChange} required min="0" /></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{device ? "Save" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
