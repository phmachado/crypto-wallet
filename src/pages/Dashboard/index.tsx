import { DashboardOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";
import { format, subDays, isSaturday, isSunday } from "date-fns";
import { useEffect, useState } from "react";

import AppLayout from "../../components/AppLayout";
import Balance from "./components/Balance";
import CurrencyToday from "./components/CurrencyToday";

export default function Dashboard(): JSX.Element {
  const [btc, setBtc] = useState<string>();
  const [btcLastUpdate, setBtcLastUpdate] = useState<number>();
  const [brita, setBrita] = useState<number>();
  const [britaLastUpdate, setBritaLastUpdate] = useState<string>();
  const queryDate =
    isSaturday(new Date()) || isSunday(new Date())
      ? format(subDays(new Date(), 1), "MM-dd-yyyy")
      : format(new Date(), "MM-dd-yyyy");

  useEffect(() => {
    async function getBtc() {
      await axios
        .get("https://www.mercadobitcoin.net/api/BTC/ticker/")
        .then((res) => {
          setBtc(res.data.ticker.last);
          setBtcLastUpdate(res.data.ticker.date);
        });
    }
    async function getBrita() {
      await axios
        .get(
          `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${queryDate}'&$top=100&$format=json`
        )
        .then((res) => {
          setBrita(res.data.value[0].cotacaoCompra);
          setBritaLastUpdate(res.data.value[0].dataHoraCotacao);
        });
    }
    getBtc();
    getBrita();
  }, []);

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
              <Balance balance={100000} />
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
