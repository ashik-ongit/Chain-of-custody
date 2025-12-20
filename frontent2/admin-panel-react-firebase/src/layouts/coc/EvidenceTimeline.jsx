import { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function EvidenceTimeline() {
  const [evidenceList, setEvidenceList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [events, setEvents] = useState([]);

  // Load evidence list
  useEffect(() => {
    axios
      .get("${API_BASE_URL}/evidence/list")
      .then((res) => setEvidenceList(res.data.items || []))
      .catch(console.error);
  }, []);

  // Load timeline
  const loadTimeline = async () => {
    if (!selectedId) return;

    const res = await axios.get(
      `${API_BASE_URL}/evidence/timeline/${selectedId}`
    );

    setEvents(res.data.timeline || []);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3} display="flex" justifyContent="center">
        <Grid item xs={12} md={10} lg={7}>
          <Card sx={{ p: 3 }}>
            <MDTypography variant="h4" mb={3}>
              Evidence Timeline
            </MDTypography>

            <FormControl fullWidth>
              <InputLabel>Select Evidence</InputLabel>
              <Select
                value={selectedId}
                label="Select Evidence"
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {evidenceList.map((ev) => (
                  <MenuItem key={ev.id} value={ev.id}>
                    {ev.id} — {ev.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <MDButton
              sx={{ mt: 2 }}
              color="info"
              variant="gradient"
              fullWidth
              onClick={loadTimeline}
            >
              View Timeline
            </MDButton>

            {events.length > 0 && (
              <MDBox mt={4}>
                <Timeline>
                  {events.map((ev, i) => (
                    <TimelineItem key={i}>
                      <TimelineSeparator>
                        <TimelineDot color="info" />
                        {i < events.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <MDTypography fontWeight="medium">
                          {ev.action}
                        </MDTypography>
                        <MDTypography variant="caption">
                          {ev.by} — {ev.timestamp}
                        </MDTypography>
                        <MDTypography variant="caption" display="block">
                          prev_hash: {ev.prev_hash.slice(0, 12)}…
                        </MDTypography>
                        <MDTypography variant="caption" display="block">
                          event_hash: {ev.event_hash.slice(0, 12)}…
                        </MDTypography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </MDBox>
            )}
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
