import { ShowChartOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

import { formatReal } from "../../../../utils";

type Props = {
  currency: string;
  value: number;
  lastUpdate: number | string;
};

export default function CurrencyToday({
  currency,
  value,
  lastUpdate,
}: Props): JSX.Element {
  const lasUpdateDate =
    currency === "Bitcoin"
      ? format(new Date(Number(lastUpdate) * 1000), "dd/MM/yyyy 'às' HH'h'mm")
      : format(new Date(lastUpdate), "dd/MM/yyyy 'às' HH'h'mm");

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">
        <ShowChartOutlined /> {currency}
      </Typography>
      <Box sx={{ px: 4, py: 3 }}>
        <Typography variant="h4">{formatReal(value)}</Typography>
        <Typography variant="caption">
          Última atualização em {lasUpdateDate}
        </Typography>
      </Box>
    </Box>
  );
}
