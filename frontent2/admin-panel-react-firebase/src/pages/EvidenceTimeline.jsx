import React, { useEffect, useState } from "react";
import axios from "axios";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// UI components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// MUI Timeline
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

const API_BASE = "https://chain-of-custody.onrender.com";

export default function EvidenceTimeline() {
  const [evidenceId, setEvidenceId] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTimeline = async () => {
    if (!evidenceId) return;

    setLoading(true);
    setError("");
    setTimeline([]);

    try {
      const res = await axios.get(
        `${API_BASE}/evidence/timeline/${evidenceId}`
      );
      setTimeline(res.data.timeline || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load timeline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3} px={3}>
        <MDTypography variant="h5" mb={2}>
          Evidence Timeline
        </MDTypography>

        {/* Evidence ID input */}
        <MDBox display="flex" gap={2} mb={3}>
          <MDInput
            label="Evidence ID (e.g. EV-0001)"
            value={evidenceId}
            onChange={(e) => setEvidenceId(e.target.value)}
          />
          <MDButton
            color="info"
            onClick={fetchTimeline}
            disabled={loading}
          >
            {loading ? "Loading..." : "View Timeline"}
          </MDButton>
        </MDBox>

        {/* Error */}
        {error && (
          <MDTypography color="error" mb={2}>
            {error}
          </MDTypography>
        )}

        {/* Timeline */}
        {timeline.length > 0 && (
          <Timeline>
            {timeline.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    color={event.action === "added" ? "success" : "info"}
                  />
                  {index < timeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <MDTypography fontWeight="bold">
                    {event.action.toUpperCase()}
                  </MDTypography>
                  <MDTypography variant="caption">
                    By: {event.by}
                  </MDTypography>
                  <MDTypography variant="caption" display="block">
                    Time: {new Date(event.timestamp * 1000).toLocaleString()}
                  </MDTypography>
                  <MDTypography variant="caption" display="block">
                    Hash: {event.event_hash}
                  </MDTypography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}

        {!loading && evidenceId && timeline.length === 0 && !error && (
          <MDTypography>
            No timeline events found.
          </MDTypography>
        )}
      </MDBox>
    </DashboardLayout>
  );
}
