import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/views/Dashboard";
import Listings from "./components/views/Listings";
import Offers from "./components/views/Offers";
import Analytics from "./components/views/Analytics";
import Footer from "./components/Footer";
import { deviceApi, offerApi } from "./services/api";
import { ToggleRight } from "lucide-react";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [devices, setDevices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("supplier"); // 'supplier' or 'admin'

  const fetchData = async () => {
    try {
      setLoading(true);
      const [devicesData, offersData] = await Promise.all([
        deviceApi.getAll(),
        offerApi.getAll()
      ]);
      setDevices(devicesData);
      setOffers(offersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateDevice = async (id, updates) => {
    try {
      await deviceApi.update(id, updates);
      await fetchData();
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const handleAddDevice = async (device) => {
    try {
      await deviceApi.create(device);
      await fetchData();
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  const toggleUserRole = () => {
    setUserRole(prev => prev === "supplier" ? "admin" : "supplier");
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard devices={devices} userRole={userRole} onUpdateDevice={handleUpdateDevice} />;
      case "listings":
        return (
          <Listings
            devices={devices}
            onUpdateDevice={handleUpdateDevice}
            onAddDevice={handleAddDevice}
            userRole={userRole}
          />
        );
      case "offers":
        return <Offers offers={offers} devices={devices} userRole={userRole} />;
      case "analytics":
        return <Analytics devices={devices} userRole={userRole} />;
      default:
        return <Dashboard devices={devices} userRole={userRole} onUpdateDevice={handleUpdateDevice} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        
        {/* View Toggle */}
        <div className="ml-64 px-8 pt-4">
          <div className={`flex  justify-end`}>
            <button
              onClick={toggleUserRole}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ToggleRight className="h-4 w-4" style={{ transform: userRole === "supplier" ? "none" : "scaleX(-1)" }} />
              <span className="text-sm font-medium">
                {userRole === "supplier" ? "Switch to Admin View" : "Switch to Supplier View"}
              </span>
            </button>
          </div>
        </div>

        <main className="ml-64 p-8 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={renderView()} />
            <Route path="/listings" element={renderView()} />
            <Route path="/offers" element={renderView()} />
            <Route path="/analytics" element={renderView()} />
          </Routes>
        </main>
        
        <div className="ml-64">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
