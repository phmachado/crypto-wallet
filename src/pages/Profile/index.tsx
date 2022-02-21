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
import { useState, useContext, useEffect } from "react";

import AppLayout from "../../components/AppLayout";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function Profile(): JSX.Element {
  const { currentUser } = useContext(UserContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPassword(currentUser.password);
    }
  }, [currentUser]);

  async function handleUpdateUser() {
    try {
      if (currentUser) {
        await db.user.update(Number(currentUser.id), {
          name,
          email,
          password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

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
              {currentUser ? (
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
                    defaultValue={currentUser.name}
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
                    defaultValue={currentUser.email}
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
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleUpdateUser()}
                  >
                    Atualizar
                  </Button>
                </Box>
              ) : (
                "Carregando..."
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
