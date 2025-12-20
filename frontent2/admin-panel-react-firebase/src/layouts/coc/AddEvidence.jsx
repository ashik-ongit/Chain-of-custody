import { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function AddEvidence() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/evidence/add", {
        name,
        description: desc,
      });

      alert("Saved: " + res.data.message);
    } catch (error) {
      alert("API Error");
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
                Add Evidence
              </MDTypography>

              <MDBox mb={3}>
                <MDInput
                  fullWidth
                  label="Evidence Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </MDBox>

              <MDBox mb={3}>
                <MDInput
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </MDBox>

              <MDButton
                color="info"
                variant="gradient"
                fullWidth
                onClick={handleSubmit}
              >
                SUBMIT
              </MDButton>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
