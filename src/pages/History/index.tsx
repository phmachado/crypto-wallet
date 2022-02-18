import { Container, Grid, Paper, Typography, Box } from "@mui/material";

import AppLayout from "../../components/AppLayout";

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
            />
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
