import { ShowChartOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type Props = {
  currency: string;
  value: number;
  lastUpdate: string;
};

export default function CurrencyToday({
  currency,
  value,
  lastUpdate,
}: Props): JSX.Element {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">
        <ShowChartOutlined /> {currency}
      </Typography>
      <Box sx={{ px: 4, py: 3 }}>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="caption">
          Última atualização em {lastUpdate}
        </Typography>
      </Box>
    </Box>
  );
}
