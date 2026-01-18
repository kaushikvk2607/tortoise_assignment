import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/views/Dashboard";
import Listings from "./components/views/Listings";
import Offers from "./components/views/Offers";
import Analytics from "./components/views/Analytics";
import Footer from "./components/Footer";
import { deviceApi, offerApi } from "./services/api";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [devices, setDevices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("supplier");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
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
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background flex">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpen={() => setSidebarOpen(true)}
        />

        <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
          <Header
            userRole={userRole}
            onToggleRole={toggleUserRole}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onToggleSidebar={toggleSidebar}
          />

          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={renderView()} />
              <Route path="/listings" element={renderView()} />
              <Route path="/offers" element={renderView()} />
              <Route path="/analytics" element={renderView()} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
