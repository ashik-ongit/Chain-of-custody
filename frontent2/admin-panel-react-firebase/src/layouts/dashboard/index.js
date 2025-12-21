// @mui material components
import Grid from "@mui/material/Grid";
import axios from "axios";
import * as React from "react";
import API_BASE_URL from "config/api";

// Admin panel components
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Footer from "examples/Footer";

// Firestore (kept untouched)
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  // Firestore fetch (unchanged)
  React.useEffect(() => {
    async function fetchData() {
      await getDocs(collection(db, "deviceTokens"));
    }
    fetchData();
  }, []);

  // ===== STATS (SAFE DEFAULTS) =====
  const [stats, setStats] = React.useState({
    total_evidence: 0,
    in_custody: 0,
    transfers_today: 0,
    integrity_errors: 0,
  });

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/dashboard/stats`, {
        params: { role: "admin" },
      })
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  // ===== CHARTS (SAFE DEFAULTS) =====
  const [charts, setCharts] = React.useState({
    evidence_added: { labels: [], data: [] },
    transfers_over_time: { labels: [], data: [] },
    verification_results: { labels: [], data: [] },
  });

  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}/dashboard/charts`)
      .then((res) => setCharts(res.data))
      .catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* ===== KPI CARDS ===== */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="inventory"
              title="Total Evidence"
              count={stats.total_evidence}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              icon="local_shipping"
              title="Evidence in Custody"
              count={stats.in_custody}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="swap_horiz"
              title="Transfers Today"
              count={stats.transfers_today}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="error"
              icon="verified"
              title="Integrity Errors"
              count={stats.integrity_errors}
            />
          </Grid>
        </Grid>

        {/* ===== CHARTS (BACKEND ONLY) ===== */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* Evidence Added */}
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="info"
                title="Evidence Added"
                description="Live evidence count"
                date="live"
                chart={{
                  labels: charts.evidence_added.labels,
                  datasets: [
                    {
                      label: "Evidence",
                      data: charts.evidence_added.data,
                    },
                  ],
                }}
              />
            </Grid>

            {/* Transfers Over Time — FIXED */}
            <Grid item xs={12} md={6} lg={4}>
              <ReportsLineChart
                color="success"
                title="Transfers Over Time"
                description="Live custody transfers"
                date="live"
                chart={{
                  labels: charts.transfers_over_time.labels,
                  datasets: [
                    {
                      label: "Transfers",
                      data: charts.transfers_over_time.data,
                    },
                  ],
                }}
              />
            </Grid>

            {/* Verification Results — FIXED */}
            <Grid item xs={12} md={6} lg={4}>
              <ReportsLineChart
                color="dark"
                title="Verification Results"
                description="Live integrity checks"
                date="live"
                chart={{
                  labels: charts.verification_results.labels,
                  datasets: [
                    {
                      label: "Verifications",
                      data: charts.verification_results.data,
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
