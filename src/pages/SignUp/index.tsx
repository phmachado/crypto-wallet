import { Button, TextField, Box } from "@mui/material";
import CryptoJS from "crypto-js";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";

import CredentialsLayout from "../../components/CredentialsLayout";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function SignUp(): JSX.Element {
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  // Controle de acesso as rotas no App
  useEffect(() => {
    const dummyToken = localStorage.getItem("dummyToken");
    if (dummyToken && dummyToken !== "remove-access") {
      navigate("/dashboard");
    }
  }, []);

  // Função para lidar com a criação do usuário
  async function handleSignUp() {
    try {
      if (password !== checkPassword) {
        toast.warning("As senhas são diferentes.");
      } else if (password.length < 6) {
        toast.warning("A senha deve ter mais de 6 caracteres.");
      } else if (!validator.isEmail(email)) {
        toast.warning("O e-mail não é válido.");
      } else if (!validator.isAlpha(name, "pt-BR", { ignore: " " })) {
        toast.warning("O nome não é válido.");
      } else {
        // Verificando se o e-mail já é utilizado
        const emailRes = await db.user.where({ email }).toArray();
        if (emailRes.length) {
          toast.warning("E-mail já cadastrado.");
        } else {
          // Fazendo o hash da senha para não salvar em plain text
          const hashedPassword = CryptoJS.AES.encrypt(
            password,
            "secret"
          ).toString();
          // Salvando o usuário no DB
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
            // Atualizando o estado referente ao usuário logado e tratamento do token de acesso
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
              toast.success("Usuário cadastrado com sucesso.");
            } else {
              toast.error("Erro ao cadastrar usuário.");
            }
          } else {
            toast.error("Erro ao cadastrar usuário.");
          }
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar usuário.");
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
