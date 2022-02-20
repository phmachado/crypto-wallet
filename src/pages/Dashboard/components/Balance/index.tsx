import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

type Props = {
  real: number;
  btc: number;
  brita: number;
};

export default function Balance({ real, btc, brita }: Props) {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">
        <AccountBalanceWalletOutlined /> Saldo
      </Typography>
      <Typography sx={{ px: 4 }} variant="caption">
        Em {format(new Date(), "dd/MM/yyyy 'às' HH'h'mm")}
      </Typography>
      <Box sx={{ px: 4, paddingTop: 2 }}>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          {real ? (
            <>
              Real:{" "}
              {real.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </>
          ) : (
            "Carregando..."
          )}
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Bitcoin: {btc ? <>{btc.toFixed(8)} BTC</> : "Carregando..."}
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Brita:{" "}
          {brita ? (
            <>
              B${" "}
              {brita.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </>
          ) : (
            "Carregando..."
          )}
        </Typography>
      </Box>
    </Box>
  );
}
