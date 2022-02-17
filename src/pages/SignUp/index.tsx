import { Button, TextField, Link, Box } from "@mui/material";

import CredentialsLayout from "../../components/CredentialsLayout";

export default function SignUp(): JSX.Element {
  return (
    <CredentialsLayout>
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
      <TextField
        margin="dense"
        required
        fullWidth
        type="password"
        id="check-password"
        label="Confirmar Senha"
        placeholder="Digite sua senha novamente"
      />
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Cadastrar
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          width: "100%",
        }}
      >
        <Link href="/" variant="body2">
          Já tem cadastro? Faça login
        </Link>
      </Box>
    </CredentialsLayout>
  );
}
