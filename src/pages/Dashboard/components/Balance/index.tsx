import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type Props = {
  balance: number;
};

export default function Balance({ balance }: Props) {
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
          Real: R$ {balance.toFixed(2)}
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Bitcoin: {balance} BTC
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Brita: B$ {balance.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}
