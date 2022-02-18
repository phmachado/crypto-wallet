import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

import AppLayout from "../../components/AppLayout";

export default function Buy(): JSX.Element {
  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">Comprar</Typography>
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
              <TextField
                margin="dense"
                required
                fullWidth
                id="name"
                label="Valor"
                placeholder="Digite o valor"
              />
              <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                Comprar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
