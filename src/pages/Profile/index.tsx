import { AccountBoxOutlined, AccountCircle } from "@mui/icons-material";
import {
  Button,
  TextField,
  Paper,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";

import AppLayout from "../../components/AppLayout";

export default function Profile(): JSX.Element {
  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <AccountBoxOutlined /> Perfil
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Box sx={{ p: 5 }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 2,
                  }}
                >
                  <AccountCircle color="primary" sx={{ fontSize: 100 }} />
                </Box>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                  autoFocus
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                />
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Atualizar
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
