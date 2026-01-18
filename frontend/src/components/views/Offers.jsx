import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import Badge from "../ui/Badge";
import { Tag, Calendar, Gift, Percent } from "lucide-react";

const Offers = ({ offers, devices }) => {
  const getDeviceNames = (deviceIds) => {
    if (!deviceIds || deviceIds.length === 0) return 'All devices';
    const names = deviceIds
      .map((d) => {
        const id = typeof d === 'object' ? d._id : d;
        const device = devices.find((dev) => dev._id === id);
        return device ? `${device.brand} ${device.model}` : null;
      })
      .filter(Boolean);
    return names.length > 2 ? `${names.slice(0, 2).join(", ")} +${names.length - 2}` : names.join(", ") || 'All devices';
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  // Fallback sample offers
  const sampleOffers = offers.length > 0 ? offers : [
    { _id: '1', name: 'New Year Sale', type: 'percentage', value: 15, status: 'Active', startDate: '2026-01-01', endDate: '2026-01-31', deviceIds: [] },
    { _id: '2', name: 'Flash Deal', type: 'fixed', value: 5000, status: 'Active', startDate: '2026-01-15', endDate: '2026-01-20', deviceIds: [] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Offers</h1>
        <p className="text-base text-muted-foreground mt-1">Manage promotional campaigns</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary\/10 flex items-center justify-center">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{sampleOffers.length}</p>
              <p className="text-sm text-muted-foreground">Active Offers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success\/10 flex items-center justify-center">
              <Percent className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">12%</p>
              <p className="text-sm text-muted-foreground">Avg. Discount</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning\/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offers */}
      <div className="grid gap-4 md:grid-cols-2">
        {sampleOffers.map((offer) => (
          <Card key={offer._id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary\/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-foreground">{offer.name}</h3>
                    <p className="text-sm text-muted-foreground">{offer.type === "percentage" ? "Percentage" : "Fixed"} discount</p>
                  </div>
                </div>
                <Badge variant="success">{offer.status}</Badge>
              </div>

              <div className="p-3 rounded-lg bg-secondary mb-4">
                <p className="text-xl font-semibold text-foreground">
                  {offer.type === "percentage" ? `${offer.value}% Off` : `₹${offer.value?.toLocaleString()} Off`}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Devices</span>
                  <span className="text-foreground">{getDeviceNames(offer.deviceIds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period</span>
                  <span className="text-foreground">{formatDate(offer.startDate)} - {formatDate(offer.endDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Offers;
