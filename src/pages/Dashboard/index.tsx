import { DashboardOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { useContext } from "react";

import AppLayout from "../../components/AppLayout";
import { DashboardContext } from "../../contexts/DashboardContext";
import Balance from "./components/Balance";
import CurrencyToday from "./components/CurrencyToday";

const balance = 100000;

export default function Dashboard(): JSX.Element {
  const { btc, btcLastUpdate, brita, britaLastUpdate, realToBrita, realToBtc } =
    useContext(DashboardContext);

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
              <Balance
                real={balance}
                btc={realToBtc(balance)}
                brita={realToBrita(balance)}
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
                currency="Bitcoin"
                value={btc}
                lastUpdate={btcLastUpdate}
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
                value={brita}
                lastUpdate={britaLastUpdate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
