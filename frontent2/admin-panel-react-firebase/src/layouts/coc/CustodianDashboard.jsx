import React from "react";
import axios from "axios";
import API_BASE_URL from "config/api";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// UI
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// DataGrid
import { DataGrid } from "@mui/x-data-grid";

export default function CustodianDashboard() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/evidence/list`)
      .then((res) => {
        const items = res.data.items || [];
        const filtered = items.filter(
          (e) => e.current_holder === "custodian"
        );
        setRows(filtered);
      })
      .catch(console.error);
  }, []);

  const columns = [
    { field: "id", headerName: "Evidence ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3} px={3}>
        <MDTypography variant="h5" mb={2}>
          Custodian Dashboard
        </MDTypography>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </MDBox>
    </DashboardLayout>
  );
}
