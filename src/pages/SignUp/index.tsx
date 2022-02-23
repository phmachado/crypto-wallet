import { Button, TextField, Box } from "@mui/material";
import CryptoJS from "crypto-js";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CredentialsLayout from "../../components/CredentialsLayout";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function SignUp(): JSX.Element {
  const { setCurrentUser } = useContext(UserContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const dummyToken = localStorage.getItem("dummyToken");
    if (dummyToken && dummyToken !== "remove-access") {
      navigate("/dashboard");
    }
  }, []);

  async function handleSignUp() {
    try {
      if (password !== checkPassword) {
        console.log("PASSWORD_DONT_MATCH");
      } else {
        const hashedPassword = CryptoJS.AES.encrypt(
          password,
          "secret"
        ).toString();
        const newUser = await db.user.add({
          name,
          email,
          password: hashedPassword,
          real: 100000,
          btc: 0,
          brita: 0,
          history: [],
        });
        if (newUser) {
          const createdUser = await db.user
            .where({ email, password: hashedPassword })
            .toArray();
          if (createdUser.length) {
            setCurrentUser(createdUser[0]);
            localStorage.setItem("currentUser", createdUser[0].email);
            const dummyToken = localStorage.getItem("dummyToken");
            if (!dummyToken || dummyToken === "remove-access") {
              localStorage.setItem("dummyToken", "grant-access");
            }
            navigate("/dashboard");
          }
        }
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
        id="name"
        label="Nome"
        placeholder="Digite seu nome"
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        type="email"
        id="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        type="password"
        id="password"
        label="Senha"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        type="password"
        id="check-password"
        label="Confirmar Senha"
        placeholder="Digite sua senha novamente"
        onChange={(e) => setCheckPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => handleSignUp()}
        disabled={
          name === "" || email === "" || password === "" || checkPassword === ""
        }
      >
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
        <Button
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          Já tem cadastro? Faça login
        </Button>
      </Box>
    </CredentialsLayout>
  );
}
