import { Button, Box, TextField, Link } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import CredentialsLayout from "../../components/CredentialsLayout";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function Login(): JSX.Element {
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    try {
      const userExists = await db.user.where({ email, password }).toArray();
      if (userExists.length) {
        setCurrentUser(userExists[0]);
        localStorage.setItem("currentUser", userExists[0].email);
        navigate("/dashboard");
      } else {
        console.log("INCORRECT_OR_DONT_EXIST");
      }
    } catch (err) {
      console.log(err);
    }
  }

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
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => handleLogin()}
        disabled={email === "" || password === ""}
      >
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
