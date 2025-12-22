// @mui material components
import Grid from "@mui/material/Grid";
import * as React from "react";

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
  // Firestore fetch (unchanged, harmless)
  React.useEffect(() => {
    async function fetchData() {
      await getDocs(collection(db, "deviceTokens"));
    }
    fetchData();
  }, []);

  // ===== DEMO STATS (NO BACKEND CALLS) =====
  const [stats] = React.useState({
    total_evidence: 12,
    in_custody: 8,
    transfers_today: 3,
    integrity_errors: 0,
  });

  // ===== DEMO CHART DATA (NO BACKEND CALLS) =====
  const [charts] = React.useState({
    evidence_added: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      data: [2, 4, 6, 8, 10],
    },
    transfers_over_time: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      data: [1, 3, 2, 5, 4],
    },
    verification_results: {
      labels: ["Pass", "Fail"],
      data: [12, 1],
    },
  });

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

        {/* ===== CHARTS ===== */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="info"
                title="Evidence Added"
                description="Demo data"
                date="demo"
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

            <Grid item xs={12} md={6} lg={4}>
              <ReportsLineChart
                color="success"
                title="Transfers Over Time"
                description="Demo data"
                date="demo"
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

            <Grid item xs={12} md={6} lg={4}>
              <ReportsLineChart
                color="dark"
                title="Verification Results"
                description="Demo data"
                date="demo"
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
