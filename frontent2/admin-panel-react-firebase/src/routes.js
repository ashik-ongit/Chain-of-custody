// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

// Chain of Custody pages
import AddEvidence from "layouts/coc/AddEvidence";
import TransferEvidence from "layouts/coc/TransferEvidence";
import EvidenceTimeline from "layouts/coc/EvidenceTimeline";

// NEW DASHBOARDS
import InspectorDashboard from "layouts/coc/InspectorDashboard";
import CustodianDashboard from "layouts/coc/CustodianDashboard";
import AuditorDashboard from "layouts/coc/AuditorDashboard";

// MUI icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import * as React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

// Loading component
const LoadingScreen = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px'
  }}>
    Loading...
  </div>
);

// ROLE-BASED WRAPPERS
const AdminAuthRoutes = ({ children }) => {
  const { role, currentUser, loading } = useContext(AuthContext);
  
  // Wait for auth to initialize
  if (loading) {
    return <LoadingScreen />;
  }
  
  // Wait for auth to initialize - if user is logged in but role is not set yet, show loading
  if (currentUser && !role) {
    return <LoadingScreen />;
  }
  
  // If role is set and matches, show children
  if (role === "admin") {
    return children;
  }
  
  // Otherwise redirect to login
  return <Navigate to="/login" />;
};

const BrandAuthRoutes = ({ children }) => {
  const { role, currentUser, loading } = useContext(AuthContext);
  
  if (loading || (currentUser && !role)) {
    return <LoadingScreen />;
  }
  
  if (role === "brand") {
    return children;
  }
  
  return <Navigate to="/login" />;
};

const BankAuthRoutes = ({ children }) => {
  const { role, currentUser, loading } = useContext(AuthContext);
  
  if (loading || (currentUser && !role)) {
    return <LoadingScreen />;
  }
  
  if (role === "bank") {
    return children;
  }
  
  return <Navigate to="/login" />;
};

const InspectorAuthRoutes = ({ children }) => {
  const { role, currentUser, loading } = useContext(AuthContext);
  
  if (loading || (currentUser && !role)) {
    return <LoadingScreen />;
  }
  
  if (role === "inspector") {
    return children;
  }
  
  return <Navigate to="/login" />;
};

const CustodianAuthRoutes = ({ children }) => {
  const { role, currentUser, loading } = useContext(AuthContext);
  
  if (loading || (currentUser && !role)) {
    return <LoadingScreen />;
  }
  
  if (role === "custodian") {
    return children;
  }
  
  return <Navigate to="/login" />;
};

const AuditorAuthRoutes = ({ children }) => {
  const { role, currentUser, loading } = useContext(AuthContext);
  
  if (loading || (currentUser && !role)) {
    return <LoadingScreen />;
  }
  
  if (role === "auditor") {
    return children;
  }
  
  return <Navigate to="/login" />;
};

// Route wrapper components
const AdminDashboardRoute = () => (
  <AdminAuthRoutes><Dashboard /></AdminAuthRoutes>
);

const AdminAddEvidenceRoute = () => (
  <AdminAuthRoutes><AddEvidence /></AdminAuthRoutes>
);

const AdminTransferRoute = () => (
  <AdminAuthRoutes><TransferEvidence /></AdminAuthRoutes>
);

const AdminTimelineRoute = () => (
  <AdminAuthRoutes><EvidenceTimeline /></AdminAuthRoutes>
);

// Inspector route wrappers
const InspectorDashboardRoute = () => (
  <InspectorAuthRoutes><InspectorDashboard /></InspectorAuthRoutes>
);

const InspectorAddEvidenceRoute = () => (
  <InspectorAuthRoutes><AddEvidence /></InspectorAuthRoutes>
);

const InspectorTimelineRoute = () => (
  <InspectorAuthRoutes><EvidenceTimeline /></InspectorAuthRoutes>
);

// Custodian route wrappers
const CustodianDashboardRoute = () => (
  <CustodianAuthRoutes><CustodianDashboard /></CustodianAuthRoutes>
);

const CustodianTransferRoute = () => (
  <CustodianAuthRoutes><TransferEvidence /></CustodianAuthRoutes>
);

const CustodianTimelineRoute = () => (
  <CustodianAuthRoutes><EvidenceTimeline /></CustodianAuthRoutes>
);

// Auditor route wrappers
const AuditorDashboardRoute = () => (
  <AuditorAuthRoutes><AuditorDashboard /></AuditorAuthRoutes>
);

const AuditorTimelineRoute = () => (
  <AuditorAuthRoutes><EvidenceTimeline /></AuditorAuthRoutes>
);

// MAIN ROUTES
const routes = [
  // ------------------------------
  // ADMIN ROUTES (Chain of Custody Only)
  // ------------------------------
  {
    routeRole: "admin",
    type: "collapse",
    name: "Demo Dashboard",
    key: "admin/dashboard",
    icon: <DashboardIcon />,
    route: "/admin/dashboard",
    component: <AdminDashboardRoute />,
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Add Evidence",
    key: "admin/add-evidence",
    icon: <InventoryIcon />,
    route: "/admin/add-evidence",
    component: <AdminAddEvidenceRoute />,
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Transfer Evidence",
    key: "admin/transfer",
    icon: <CategoryIcon />,
    route: "/admin/transfer",
    component: <AdminTransferRoute />,
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Evidence Timeline",
    key: "admin/timeline",
    icon: <DashboardIcon />,
    route: "/admin/timeline",
    component: <AdminTimelineRoute />,
  },

  // ------------------------------
  // Inspector Dashboard
  // ------------------------------
  {
    routeRole: "inspector",
    type: "collapse",
    name: "Dashboard",
    key: "inspector/dashboard",
    icon: <DashboardIcon />,
    route: "/inspector/dashboard",
    component: <InspectorDashboardRoute />,
  },
  {
    routeRole: "inspector",
    type: "collapse",
    name: "Add Evidence",
    key: "inspector/add-evidence",
    icon: <InventoryIcon />,
    route: "/inspector/add-evidence",
    component: <InspectorAddEvidenceRoute />,
  },
  {
    routeRole: "inspector",
    type: "collapse",
    name: "Evidence Timeline",
    key: "inspector/timeline",
    icon: <DashboardIcon />,
    route: "/inspector/timeline",
    component: <InspectorTimelineRoute />,
  },

  // ------------------------------
  // Custodian Dashboard
  // ------------------------------
  {
    routeRole: "custodian",
    type: "collapse",
    name: "Dashboard",
    key: "custodian/dashboard",
    icon: <DashboardIcon />,
    route: "/custodian/dashboard",
    component: <CustodianDashboardRoute />,
  },
  {
    routeRole: "custodian",
    type: "collapse",
    name: "Transfer Evidence",
    key: "custodian/transfer",
    icon: <CategoryIcon />,
    route: "/custodian/transfer",
    component: <CustodianTransferRoute />,
  },
  {
    routeRole: "custodian",
    type: "collapse",
    name: "Evidence Timeline",
    key: "custodian/timeline",
    icon: <DashboardIcon />,
    route: "/custodian/timeline",
    component: <CustodianTimelineRoute />,
  },

  // ------------------------------
  // Auditor Dashboard
  // ------------------------------
  {
    routeRole: "auditor",
    type: "collapse",
    name: "Dashboard",
    key: "auditor/dashboard",
    icon: <DashboardIcon />,
    route: "/auditor/dashboard",
    component: <AuditorDashboardRoute />,
  },
  {
    routeRole: "auditor",
    type: "collapse",
    name: "Evidence Timeline",
    key: "auditor/timeline",
    icon: <DashboardIcon />,
    route: "/auditor/timeline",
    component: <AuditorTimelineRoute />,
  },
];

// AUTH DETAIL ROUTES
const authRoutes = [];

export default routes;
export { authRoutes };
