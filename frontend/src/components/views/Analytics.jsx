import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import StatsCard from "../ui/StatsCard";
import { TrendingUp, Package, ShoppingCart, Award } from "lucide-react";

const Analytics = ({ devices }) => {
  const totalStock = devices.reduce((sum, d) => sum + d.stock, 0) || 156;
  const totalRevenue = devices.reduce((sum, d) => sum + (d.mrp * d.stock * 0.08), 0) || 385000;
  const avgStock = devices.length ? (totalStock / devices.length).toFixed(1) : 6.5;
  const inStock = devices.filter(d => d.stock > 0).length || 22;
  const outOfStock = devices.filter(d => d.stock === 0).length || 2;

  const categories = ["Smartphone", "Laptop", "Tablet", "Wearable"].map((name) => {
    const items = devices.filter(d => d.category === name);
    const value = items.reduce((sum, d) => sum + (d.mrp * d.stock), 0);
    const defaults = { Smartphone: 2400000, Laptop: 1800000, Tablet: 450000, Wearable: 200000 };
    return { name, value: value || defaults[name] };
  });
  const maxVal = Math.max(...categories.map(c => c.value));

  const topDevices = [...devices].sort((a, b) => (b.stock * b.mrp) - (a.stock * a.mrp)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Analytics</h1>
        <p className="text-base text-muted-foreground mt-1">Performance insights</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Est. Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} change="+18%" changeType="positive" icon={TrendingUp} />
        <StatsCard title="Total Stock" value={totalStock} change="+24" changeType="positive" icon={Package} />
        <StatsCard title="Avg. Stock" value={avgStock} change="Healthy" changeType="neutral" icon={ShoppingCart} />
        <StatsCard title="Listings" value={devices.length || 24} change="+3" changeType="positive" icon={Award} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Category Performance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between text-base">
                  <span className="text-foreground font-medium">{cat.name}</span>
                  <span className="text-muted-foreground">₹{(cat.value / 100000).toFixed(1)}L</span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(cat.value / maxVal) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Stock Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" className="stroke-secondary" />
                  <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(inStock / (inStock + outOfStock)) * 251.2} 251.2`} className="stroke-primary" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-semibold text-foreground">{totalStock}</span>
                  <span className="text-xs text-muted-foreground">Units</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-success\/10 text-center">
                <p className="text-lg font-semibold text-success">{inStock}</p>
                <p className="text-xs text-muted-foreground">In Stock</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive\/10 text-center">
                <p className="text-lg font-semibold text-destructive">{outOfStock}</p>
                <p className="text-xs text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Top Devices</CardTitle></CardHeader>
        <CardContent>
          {topDevices.length > 0 ? (
            <div className="space-y-1">
              {topDevices.map((device, i) => (
                <div key={device._id} className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg hover:bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'} flex items-center justify-center text-xs font-bold`}>{i + 1}</div>
                    <img src={device.image} alt="" className="w-9 h-9 rounded-lg object-cover bg-secondary" />
                    <div>
                      <p className="text-base font-medium text-foreground">{device.brand} {device.model}</p>
                      <p className="text-sm text-muted-foreground">{device.variant}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-foreground">₹{((device.stock * device.mrp) / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground">{device.stock} units</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground text-sm">Add devices to see analytics</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
