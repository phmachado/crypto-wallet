import { DashboardOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { useContext } from "react";

import AppLayout from "../../components/AppLayout";
import { CurrentCryptoContext } from "../../contexts/CurrentCryptoContext";
import Balance from "./components/Balance";
import CurrencyToday from "./components/CurrencyToday";

export default function Dashboard(): JSX.Element {
  const { currentBtc, btcLastUpdate, currentBrita, britaLastUpdate } =
    useContext(CurrentCryptoContext);

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
              <Balance value={balance} />
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
                value={currentBtc}
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
                value={currentBrita}
                lastUpdate={britaLastUpdate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
