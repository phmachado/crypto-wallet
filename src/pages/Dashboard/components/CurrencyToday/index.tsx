import { ShowChartOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";

type Props = {
  currency: string;
  value: number | string | undefined;
  lastUpdate: number | string | undefined;
};

export default function CurrencyToday({
  currency,
  value,
  lastUpdate,
}: Props): JSX.Element {
  const lasUpdateDate =
    currency === "Bitcoin"
      ? lastUpdate &&
        format(new Date(Number(lastUpdate) * 1000), "dd/MM/yyyy 'às' HH'h'mm")
      : lastUpdate && format(new Date(lastUpdate), "dd/MM/yyyy 'às' HH'h'mm");

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">
        <ShowChartOutlined /> {currency}
      </Typography>
      <Box sx={{ px: 4, py: 3 }}>
        <Typography variant="h4">
          {value ? (
            <>
              {Number(value).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </>
          ) : (
            "Carregando..."
          )}
        </Typography>
        <Typography variant="caption">
          {lasUpdateDate
            ? `Última atualização em ${lasUpdateDate}`
            : "Carregando..."}
        </Typography>
      </Box>
    </Box>
  );
}
