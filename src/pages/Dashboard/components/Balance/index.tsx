import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

import { formatReal, formatBtc, formatBrita } from "../../../../utils";

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
          Real: {formatReal(real)}
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Bitcoin: {formatBtc(btc)} BTC
        </Typography>
        <Typography sx={{ marginBottom: 1 }} variant="h6">
          Brita: B$ {formatBrita(brita)}
        </Typography>
      </Box>
    </Box>
  );
}
