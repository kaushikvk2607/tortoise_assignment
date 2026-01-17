import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { TrendingUp, Eye, ShoppingCart } from "lucide-react";

const Analytics = ({ devices, userRole }) => {
  const totalRevenue = devices.reduce((sum, d) => sum + (d.mrp * d.stock * 0.08), 0);
  const avgStock = devices.reduce((sum, d) => sum + d.stock, 0) / devices.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground mt-1">
          Performance metrics and insights
          {userRole && <span className="ml-2 text-primary font-semibold">({userRole.charAt(0).toUpperCase() + userRole.slice(1)} View)</span>}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Monthly Revenue</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">Based on average lease value</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stock per Device</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgStock.toFixed(1)} units</div>
            <p className="text-xs text-muted-foreground mt-1">Across all listings</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Eye className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active listings</p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Top Performing Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices
              .sort((a, b) => b.stock * b.mrp - a.stock * a.mrp)
              .slice(0, 5)
              .map((device, index) => (
                <div key={device._id} className="flex items-center justify-between pb-3 border-b last:border-0 hover:bg-accent/50 p-2 rounded transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{device.brand} {device.model}</p>
                      <p className="text-sm text-muted-foreground">{device.variant}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{((device.stock * device.mrp) / 100000).toFixed(2)}L</p>
                    <p className="text-sm text-muted-foreground">{device.stock} units</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
