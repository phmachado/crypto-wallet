import { Button, Box, TextField, Link } from "@mui/material";

import CredentialsLayout from "../../components/CredentialsLayout";

export default function Login(): JSX.Element {
  return (
    <CredentialsLayout>
      <TextField
        margin="dense"
        required
        fullWidth
        id="email"
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="dense"
        required
        fullWidth
        id="password"
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        autoComplete="current-password"
      />
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Entrar
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          width: "100%",
        }}
      >
        <Link href="/cadastro" variant="body2">
          Não tem cadastro? Cadastre-se
        </Link>
      </Box>
    </CredentialsLayout>
  );
}
