import { DashboardOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";

import AppLayout from "../../components/AppLayout";
import Balance from "./components/Balance";
import CurrencyToday from "./components/CurrencyToday";

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
              }}
            >
              <CurrencyToday
                currency="Bitcoin"
                value={206167.94}
                lastUpdate={new Date().toISOString()}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CurrencyToday
                currency="Brita"
                value={5.67}
                lastUpdate={new Date().toISOString()}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
