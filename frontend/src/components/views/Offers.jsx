import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import Badge from "../ui/Badge";
import { Tag } from "lucide-react";

const Offers = ({ offers, devices, userRole }) => {
  const getDeviceNames = (deviceIds) => {
    if (!deviceIds || deviceIds.length === 0) return 'No devices';
    
    return deviceIds
      .map((deviceObj) => {
        const deviceId = typeof deviceObj === 'object' ? deviceObj._id : deviceObj;
        const device = devices.find((d) => d._id === deviceId);
        return device ? `${device.brand} ${device.model}` : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Offers & Promotions</h2>
        <p className="text-muted-foreground mt-1">
          Active promotional campaigns
          {userRole && <span className="ml-2 text-primary font-semibold">({userRole.charAt(0).toUpperCase() + userRole.slice(1)} View)</span>}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((offer) => (
          <Card key={offer._id} className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">{" "}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{offer.name}</CardTitle>
                </div>
                <Badge variant="success">{offer.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offer Type</p>
                <p className="text-lg font-semibold">
                  {offer.type === "percentage"
                    ? `${offer.value}% Off`
                    : `₹${offer.value.toLocaleString()} Off`}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Applied to</p>
                <p className="text-sm mt-1">{getDeviceNames(offer.deviceIds)}</p>
              </div>

              <div className="flex justify-between pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium">{formatDate(offer.startDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="text-sm font-medium">{formatDate(offer.endDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {offers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No active offers at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Offers;
