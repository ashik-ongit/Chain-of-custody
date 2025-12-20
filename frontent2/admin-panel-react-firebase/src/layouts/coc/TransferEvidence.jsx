import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { AuthContext } from "context/AuthContext";

export default function TransferEvidence() {
  const { role } = useContext(AuthContext); // will be used as from_role default
  const [evidenceList, setEvidenceList] = useState([]);
  const [evidenceId, setEvidenceId] = useState("");
  const [toRole, setToRole] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load list of evidence from backend
    async function loadList() {
      try {
        const res = await axios.get("${API_BASE_URL}/evidence/list");
        // Expecting array of { id, name, summary }
        setEvidenceList(res.data.items || []);
      } catch (err) {
        console.error("Failed to fetch evidence list", err);
        setEvidenceList([]);
      }
    }
    loadList();
  }, []);

  const handleTransfer = async () => {
    if (!evidenceId || !toRole) {
      alert("Select evidence and destination role first");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        evidence_id: evidenceId,
        from_role: role || "unknown",
        to_role: toRole,
        notes,
      };
      const res = await axios.post("${API_BASE_URL}/evidence/transfer", payload);
      alert("Transfer: " + (res.data.message || "OK"));
      // optionally refresh list/timeline
    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={10} lg={6}>
            <Card style={{ padding: 35 }}>
              <MDTypography variant="h4" fontWeight="medium" mb={3}>
                Transfer Evidence
              </MDTypography>

              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="evidence-select-label">Select Evidence</InputLabel>
                  <Select
                    labelId="evidence-select-label"
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

              <MDBox mb={2}>
                <MDInput
                  fullWidth
                  disabled
                  label="From (auto)"
                  value={role || "unknown"}
                />
              </MDBox>

              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="to-role-label">Transfer To</InputLabel>
                  <Select
                    labelId="to-role-label"
                    value={toRole}
                    label="Transfer To"
                    onChange={(e) => setToRole(e.target.value)}
                  >
                    <MenuItem value=""><em>Choose</em></MenuItem>
                    <MenuItem value="inspector">Inspector</MenuItem>
                    <MenuItem value="custodian">Custodian</MenuItem>
                    <MenuItem value="auditor">Auditor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>

              <MDBox mb={3}>
                <MDInput
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </MDBox>

              <MDButton
                color="info"
                variant="gradient"
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
