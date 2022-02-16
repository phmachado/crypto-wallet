import { Box, Button, Grid, TextField, Link } from "@mui/material";

import BeforeAppLayout from "../../components/BeforeAppLayout";

export default function Login() {
  return (
    <BeforeAppLayout>
      <Box component="form" noValidate sx={{ mt: 2 }}>
        <TextField
          margin="dense"
          required
          fullWidth
          id="email"
          label="E-mail"
          placeholder="Digite seu e-mail"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="dense"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          id="password"
          autoComplete="current-password"
        />
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Entrar
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/cadastro" variant="body2">
              Não tem cadastro? Cadastre-se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </BeforeAppLayout>
  );
}
