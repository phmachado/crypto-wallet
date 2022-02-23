import { Button, Box, TextField, Link } from "@mui/material";
import CryptoJS from "crypto-js";
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
      const userGivenEmail = await db.user.where({ email }).toArray();
      if (userGivenEmail.length) {
        const bytes = CryptoJS.AES.decrypt(
          userGivenEmail[0].password,
          "secret"
        );
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText === password) {
          setCurrentUser(userGivenEmail[0]);
          localStorage.setItem("currentUser", userGivenEmail[0].email);
          const dummyToken = localStorage.getItem("dummyToken");
          if (!dummyToken || dummyToken === "remove-access") {
            localStorage.setItem("dummyToken", "grant-access");
          }
          navigate("/dashboard");
        } else {
          console.log("INCORRECT_PASSWORD_OR_EMAIL");
        }
      } else {
        console.log("INCORRECT_PASSWORD_OR_EMAIL");
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
