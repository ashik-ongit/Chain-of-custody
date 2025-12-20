import React from "react";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import { DataGrid } from "@mui/x-data-grid";

export default function InspectorDashboard() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/evidence/list")
      .then((res) => {
        const items = res.data.items || res.data;
        setRows(
          items
            .filter((e) => e.current_holder === "inspector")
            .map((e, idx) => ({ id: idx, ...e }))
        );
      })
      .catch(console.error);
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 80 },
    { field: "evidence_id", headerName: "Evidence ID", width: 180 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} px={3}>
        <h2>Inspector Dashboard</h2>

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
