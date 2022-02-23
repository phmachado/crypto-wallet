import {
  SwapHorizOutlined,
  CurrencyExchangeOutlined,
} from "@mui/icons-material";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

import AppLayout from "../../components/AppLayout";
import { CurrentCryptoContext } from "../../contexts/CurrentCryptoContext";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function Exchange(): JSX.Element {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { currentBtc, currentBrita } = useContext(CurrentCryptoContext);

  const [value, setValue] = useState<number>();
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<string[]>(["Bitcoin", "Brita"]);

  // isSwap === true -> brita-bitcoin
  // isSwap === false -> bitcoin-brita
  async function handleExchange() {
    try {
      let operation;
      if (isSwap) {
        operation = "brita-bitcoin";
        if (
          currentUser &&
          currentUser.id &&
          currentBtc &&
          currentBrita &&
          value
        ) {
          const britaInBtc = currentBrita / currentBtc; // 1 brita em btc
          const currentBtcBalance = currentUser.btc;
          const currentBritaBalance = currentUser.brita;

          if (value < 0) {
            toast.warning("O valor precisa ser maior do que 0.");
          } else if (value > currentBritaBalance) {
            toast.warning("O valor não pode ser maior do que seu saldo.");
          } else {
            const newBritaBalance = currentBritaBalance - value;
            const newBtcBalance = currentBtcBalance + value * britaInBtc;
            const updateRes = await db.user.update(currentUser.id, {
              btc: newBtcBalance,
              brita: newBritaBalance,
              history: [
                ...currentUser.history,
                {
                  id: new Date(),
                  date: new Date(),
                  operation: `exchange-${operation}`,
                  value,
                },
              ],
            });
            if (updateRes) {
              toast.success("Troca realizada com sucesso.");
              const userExists = await db.user
                .where({ email: currentUser.email })
                .toArray();
              if (userExists.length) {
                setCurrentUser(userExists[0]);
              }
            } else {
              toast.error("Erro ao trocar crypto.");
            }
            console.log("EXCHANGE_SUCESSFUL");
          }
        } else {
          toast.error("Erro ao trocar crypto.");
        }
      } else {
        operation = "bitcoin-brita";
        if (
          currentUser &&
          currentUser.id &&
          currentBtc &&
          currentBrita &&
          value
        ) {
          const btcInBrita = currentBtc / currentBrita; // 1 btc em brita
          const currentBtcBalance = currentUser.btc;
          const currentBritaBalance = currentUser.brita;

          if (value < 0) {
            toast.warning("O valor precisa ser maior do que 0.");
          } else if (value > currentBtcBalance) {
            toast.warning("O valor não pode ser maior do que seu saldo.");
          } else {
            const newBtcBalance = currentBtcBalance - value;
            const newBritaBalance = currentBritaBalance + value * btcInBrita;
            const updateRes = await db.user.update(currentUser.id, {
              btc: newBtcBalance,
              brita: newBritaBalance,
              history: [
                ...currentUser.history,
                {
                  id: new Date(),
                  date: new Date(),
                  operation: `exchange-${operation}`,
                  value,
                },
              ],
            });
            if (updateRes) {
              toast.success("Troca realizada com sucesso.");
              const userExists = await db.user
                .where({ email: currentUser.email })
                .toArray();
              if (userExists.length) {
                setCurrentUser(userExists[0]);
              }
            } else {
              toast.error("Erro ao trocar crypto.");
            }
            console.log("EXCHANGE_SUCESSFUL");
          }
        } else {
          toast.error("Erro ao trocar crypto.");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro ao trocar crypto.");
    }
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <CurrencyExchangeOutlined /> Trocar
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                px: 30,
                py: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ marginBottom: 1 }} variant="h6">
                Selecione o tipo de troca que deseja realizar:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "light" }} variant="h4">
                  {crypto[0]}
                </Typography>
                <IconButton
                  onClick={() => {
                    setIsSwap(!isSwap);
                    setCrypto(crypto.reverse());
                  }}
                  sx={{ mx: 1 }}
                  aria-label="delete"
                >
                  <SwapHorizOutlined />
                </IconButton>
                <Typography sx={{ fontWeight: "light" }} variant="h4">
                  {crypto[1]}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography sx={{ fontWeight: "light" }} variant="subtitle2">
                  Você está trocando{" "}
                  {isSwap ? "Brita por Bitcoin" : "Bitcoin por Brita"}
                </Typography>
              </Box>
              <TextField
                margin="dense"
                required
                fullWidth
                id="valor"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Valor"
                placeholder="Digite o valor"
                onChange={(e) => setValue(Number(e.target.value))}
              />
              <Button
                disabled={!value}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleExchange()}
              >
                Trocar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
