import { Button, Box, TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CredentialsLayout from "../../components/CredentialsLayout";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function Login(): JSX.Element {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Controle de acesso as rotas no App
  useEffect(() => {
    const dummyToken = localStorage.getItem("dummyToken");
    if (dummyToken && dummyToken !== "remove-access") {
      navigate("/dashboard");
    }
  }, []);

  // Função para lidar com o login do usuário
  async function handleLogin() {
    try {
      // Verificando se o email existe no DB
      const userGivenEmail = await db.user.where({ email }).toArray();
      if (userGivenEmail.length) {
        // Comparando a senha digitada com a senha salva no DB com os tratamentos referentes a hash
        const bytes = CryptoJS.AES.decrypt(
          userGivenEmail[0].password,
          "secret"
        );
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText === password) {
          // Atualizando o estado do usuário logado e tratamento do token de acesso
          setCurrentUser(userGivenEmail[0]);
          localStorage.setItem("currentUser", userGivenEmail[0].email);
          const dummyToken = localStorage.getItem("dummyToken");
          if (!dummyToken || dummyToken === "remove-access") {
            localStorage.setItem("dummyToken", "grant-access");
          }
          navigate("/dashboard");
          if (currentUser) {
            toast.success(`Bem-vindo, ${currentUser.name}!`);
          }
        } else {
          toast.warning("E-mail ou senha incorretos.");
        }
      } else {
        toast.warning("E-mail ou senha incorretos.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro ao fazer login.");
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
        <Button
          size="small"
          onClick={() => {
            navigate("/cadastro");
          }}
        >
          Não tem cadastro? Cadastre-se
        </Button>
      </Box>
    </CredentialsLayout>
  );
}
