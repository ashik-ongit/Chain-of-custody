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

// ROLE-BASED WRAPPERS
const AdminAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "admin" ? children : <Navigate to="/login" />;
};

const BrandAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "brand" ? children : <Navigate to="/login" />;
};

const BankAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "bank" ? children : <Navigate to="/login" />;
};

const InspectorAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "inspector" ? children : <Navigate to="/login" />;
};

const CustodianAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "custodian" ? children : <Navigate to="/login" />;
};

const AuditorAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "auditor" ? children : <Navigate to="/login" />;
};

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
    component: <AdminAuthRoutes><Dashboard /></AdminAuthRoutes>,
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Add Evidence",
    key: "admin/add-evidence",
    icon: <InventoryIcon />,
    route: "/admin/add-evidence",
    component: <AdminAuthRoutes><AddEvidence /></AdminAuthRoutes>,
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Transfer Evidence",
    key: "admin/transfer",
    icon: <CategoryIcon />,
    route: "/admin/transfer",
    component: <AdminAuthRoutes><TransferEvidence /></AdminAuthRoutes>,
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Evidence Timeline",
    key: "admin/timeline",
    icon: <DashboardIcon />,
    route: "/admin/timeline",
    component: <AdminAuthRoutes><EvidenceTimeline /></AdminAuthRoutes>,
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
    component: (
      <InspectorAuthRoutes>
        <InspectorDashboard />
      </InspectorAuthRoutes>
    ),
  },
  {
    routeRole: "inspector",
    type: "collapse",
    name: "Add Evidence",
    key: "inspector/add-evidence",
    icon: <InventoryIcon />,
    route: "/inspector/add-evidence",
    component: (
      <InspectorAuthRoutes>
        <AddEvidence />
      </InspectorAuthRoutes>
    ),
  },
  {
    routeRole: "inspector",
    type: "collapse",
    name: "Evidence Timeline",
    key: "inspector/timeline",
    icon: <DashboardIcon />,
    route: "/inspector/timeline",
    component: (
      <InspectorAuthRoutes>
        <EvidenceTimeline />
      </InspectorAuthRoutes>
    ),
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
    component: (
      <CustodianAuthRoutes>
        <CustodianDashboard />
      </CustodianAuthRoutes>
    ),
  },
  {
    routeRole: "custodian",
    type: "collapse",
    name: "Transfer Evidence",
    key: "custodian/transfer",
    icon: <CategoryIcon />,
    route: "/custodian/transfer",
    component: (
      <CustodianAuthRoutes>
        <TransferEvidence />
      </CustodianAuthRoutes>
    ),
  },
  {
    routeRole: "custodian",
    type: "collapse",
    name: "Evidence Timeline",
    key: "custodian/timeline",
    icon: <DashboardIcon />,
    route: "/custodian/timeline",
    component: (
      <CustodianAuthRoutes>
        <EvidenceTimeline />
      </CustodianAuthRoutes>
    ),
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
    component: (
      <AuditorAuthRoutes>
        <AuditorDashboard />
      </AuditorAuthRoutes>
    ),
  },
  {
    routeRole: "auditor",
    type: "collapse",
    name: "Evidence Timeline",
    key: "auditor/timeline",
    icon: <DashboardIcon />,
    route: "/auditor/timeline",
    component: (
      <AuditorAuthRoutes>
        <EvidenceTimeline />
      </AuditorAuthRoutes>
    ),
  },
];

// AUTH DETAIL ROUTES
const authRoutes = [];

export default routes;
export { authRoutes };
