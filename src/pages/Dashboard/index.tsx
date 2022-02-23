import { DashboardOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { useContext } from "react";

import AppLayout from "../../components/AppLayout";
import { CurrentCryptoContext } from "../../contexts/CurrentCryptoContext";
import { UserContext } from "../../contexts/UserContext";
import Balance from "./components/Balance";
import CurrencyToday from "./components/CurrencyToday";

export default function Dashboard(): JSX.Element {
  const { currentBtc, btcLastUpdate, currentBrita, britaLastUpdate } =
    useContext(CurrentCryptoContext);
  const { currentUser } = useContext(UserContext);

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
              {currentUser ? (
                <Balance
                  real={currentUser.real}
                  btc={currentUser.btc}
                  brita={currentUser.brita}
                />
              ) : (
                "Carregando..."
              )}
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
              {currentBtc && btcLastUpdate ? (
                <CurrencyToday
                  currency="Bitcoin"
                  value={currentBtc}
                  lastUpdate={btcLastUpdate}
                />
              ) : (
                "Carregando..."
              )}
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
              {currentBrita && britaLastUpdate ? (
                <CurrencyToday
                  currency="Brita"
                  value={currentBrita}
                  lastUpdate={britaLastUpdate}
                />
              ) : (
                "Carregando..."
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
