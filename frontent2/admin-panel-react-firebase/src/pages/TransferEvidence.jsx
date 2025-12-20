import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// UI components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Auth
import { AuthContext } from "context/AuthContext";

const API_BASE = "https://chain-of-custody.onrender.com";

export default function TransferEvidence() {
  const { role } = useContext(AuthContext);

  const [evidenceList, setEvidenceList] = useState([]);
  const [evidenceId, setEvidenceId] = useState("");
  const [toRole, setToRole] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load evidence list
  useEffect(() => {
    axios
      .get(`${API_BASE}/evidence/list`)
      .then((res) => setEvidenceList(res.data.items || []))
      .catch(() => setError("Failed to load evidence list"));
  }, []);

  const handleTransfer = async () => {
    if (!evidenceId || !toRole) {
      setError("Select evidence and destination role");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_BASE}/evidence/transfer`, {
        evidence_id: evidenceId,
        from_role: role,
        to_role: toRole,
        notes,
      });

      setEvidenceId("");
      setToRole("");
      setNotes("");

      alert("Evidence transferred successfully");
    } catch (err) {
      console.error(err);
      setError("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card style={{ padding: 30 }}>
              <MDTypography variant="h5" mb={3}>
                Transfer Evidence
              </MDTypography>

              {/* Evidence select */}
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Select Evidence</InputLabel>
                  <Select
                    value={evidenceId}
                    label="Select Evidence"
                    onChange={(e) => setEvidenceId(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {evidenceList.map((ev) => (
                      <MenuItem key={ev.id} value={ev.id}>
                        {ev.id} — {ev.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>

              {/* From role */}
              <MDBox mb={2}>
                <MDInput
                  label="From (auto)"
                  fullWidth
                  disabled
                  value={role}
                />
              </MDBox>

              {/* To role */}
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Transfer To</InputLabel>
                  <Select
                    value={toRole}
                    label="Transfer To"
                    onChange={(e) => setToRole(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>Choose</em>
                    </MenuItem>
                    <MenuItem value="inspector">Inspector</MenuItem>
                    <MenuItem value="custodian">Custodian</MenuItem>
                    <MenuItem value="auditor">Auditor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>

              {/* Notes */}
              <MDBox mb={3}>
                <MDInput
                  label="Notes (optional)"
                  fullWidth
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </MDBox>

              {/* Error */}
              {error && (
                <MDTypography color="error" mb={2}>
                  {error}
                </MDTypography>
              )}

              {/* Submit */}
              <MDButton
                color="info"
                fullWidth
                onClick={handleTransfer}
                disabled={loading}
              >
                {loading ? "Transferring..." : "TRANSFER"}
              </MDButton>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
