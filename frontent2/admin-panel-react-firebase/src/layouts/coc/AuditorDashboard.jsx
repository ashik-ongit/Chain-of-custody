import React from "react";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { DataGrid } from "@mui/x-data-grid";

export default function AuditorDashboard() {
  const [rows, setRows] = React.useState([]);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("${API_BASE_URL}/evidence/list")
      .then((res) => setRows(res.data.items || []))
      .catch(console.error);
  }, []);

  const verifyEvidence = (id) => {
    // clear previous result so UI updates clearly
    setResult(null);

    axios
      .get(`${API_BASE_URL}/evidence/verify/${id}`)
      .then((res) => setResult(res.data))
      .catch(() =>
        setResult({
          evidence_id: id,
          valid: false,
          checked_events: 0,
        })
      );
  };

  const columns = [
    { field: "id", headerName: "Evidence ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "verify",
      headerName: "Verify",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <MDButton
          size="small"
          color="info"
          onClick={() => verifyEvidence(params.row.id)}
        >
          VERIFY
        </MDButton>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3} px={3}>
        <MDTypography variant="h5" mb={2}>
          Auditor Dashboard
        </MDTypography>

        {/* ===== VERIFICATION RESULT (ALWAYS VISIBLE) ===== */}
        {result && (
          <MDBox
            mb={3}
            p={3}
            borderRadius="md"
            bgColor={result.valid ? "success" : "error"}
          >
            <MDTypography variant="h6" color="white">
              VERIFICATION RESULT
            </MDTypography>

            <MDTypography color="white">
              Evidence ID: {result.evidence_id}
            </MDTypography>

            <MDTypography color="white" fontWeight="bold">
              Status:{" "}
              {result.valid
                ? "✔ HASH CHAIN VALID (UNTAMPERED)"
                : "✖ TAMPERING DETECTED"}
            </MDTypography>

            <MDTypography color="white">
              Events Checked: {result.checked_events}
            </MDTypography>
          </MDBox>
        )}

        {/* ===== EVIDENCE TABLE ===== */}
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
          />
        </div>
      </MDBox>
    </DashboardLayout>
  );
}
