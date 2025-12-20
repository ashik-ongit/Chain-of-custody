import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "config/api";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

export default function AddEvidence() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/evidence/add`, {
        name,
        description: desc,
      });

      alert("Saved: " + res.data.message);
      setName("");
      setDesc("");
    } catch (error) {
      console.error(error);
      alert("API Error");
    }
  };

  return (
    <Card style={{ padding: 20, maxWidth: 600 }}>
      <MDTypography variant="h4" mb={3}>
        Add Evidence
      </MDTypography>

      <MDBox mb={2}>
        <MDInput
          fullWidth
          label="Evidence Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </MDBox>

      <MDBox mb={2}>
        <MDInput
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </MDBox>

      <MDButton color="info" variant="gradient" onClick={handleSubmit}>
        Submit
      </MDButton>
    </Card>
  );
}
