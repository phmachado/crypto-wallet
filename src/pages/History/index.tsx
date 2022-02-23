import { HistoryOutlined } from "@mui/icons-material";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useContext } from "react";

import AppLayout from "../../components/AppLayout";
import Loading from "../../components/Loading";
import { UserContext } from "../../contexts/UserContext";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Data",
    width: 300,
    valueFormatter: ({ value }) => {
      return format(new Date(String(value)), "dd/MM/yyyy 'às' HH'h'mm");
    },
  },
  {
    field: "operation",
    headerName: "Operação",
    width: 350,
    valueFormatter: ({ value }) => {
      switch (value) {
        case "buy-bitcoin":
          return "Compra de Bitcoin";
        case "buy-brita":
          return "Compra de Brita";
        case "sell-bitcoin":
          return "Venda de Bitcoin";
        case "sell-brita":
          return "Venda de Brita";
        case "exchange-bitcoin-brita":
          return "Troca de Bitcoin por Brita";
        case "exchange-brita-bitcoin":
          return "Troca de Brita por Bitcoin";
        default:
          return value;
      }
    },
  },
  {
    field: "value",
    headerName: "Valor",
    width: 300,
  },
];

export default function History(): JSX.Element {
  const { currentUser } = useContext(UserContext);

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <HistoryOutlined /> Extrato
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {currentUser ? (
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={currentUser.history}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    disableColumnSelector
                    disableColumnMenu
                  />
                </Box>
              ) : (
                <Loading />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
