import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import AppLayout from "../../components/AppLayout";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Data",
    width: 150,
  },
  {
    field: "operation",
    headerName: "Operação",
    width: 250,
  },
  {
    field: "value",
    headerName: "Valor",
    width: 150,
  },
  {
    field: "valueInReais",
    headerName: "Valor em Reais",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    date: "19/02/2022",
    operation: "Venda de Bitcoin",
    value: 0.85251,
    valueInReais: 50000,
  },
  {
    id: 2,
    date: "19/02/2022",
    operation: "Venda de Brita",
    value: 50000,
    valueInReais: 50000,
  },
  {
    id: 3,
    date: "19/02/2022",
    operation: "Troca de Brita por Bitcoin",
    value: 5000,
    valueInReais: 50000,
  },
  {
    id: 4,
    date: "19/02/2022",
    operation: "Troca de Bitcoin por Brita",
    value: 0.001,
    valueInReais: 50000,
  },
];

export default function History(): JSX.Element {
  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">Extrato</Typography>
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
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  disableColumnSelector
                  disableColumnMenu
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
