import { DashboardOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";

import AppLayout from "../../components/AppLayout";
import Balance from "./components/Balance";
import BritaToday from "./components/BritaToday";
import BtcToday from "./components/BtcToday";

export default function Dashboard(): JSX.Element {
  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <DashboardOutlined /> Dashboard
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
              }}
            >
              <Balance />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 250,
              }}
            >
              <BtcToday />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 250,
              }}
            >
              <BritaToday />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
