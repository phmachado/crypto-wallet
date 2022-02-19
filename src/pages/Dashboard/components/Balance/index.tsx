import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function Balance() {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">
        <AccountBalanceWalletOutlined /> Saldo
      </Typography>
      <Typography sx={{ px: 4 }} variant="caption">
        Em {new Date().toISOString()}
      </Typography>
      <Box sx={{ px: 4, paddingTop: 2 }}>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Real: R$ 100.000,00
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Bitcoin: 0.48 BTC
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Brita: B$ 19459,04
        </Typography>
      </Box>
    </Box>
  );
}
