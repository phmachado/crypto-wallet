import { AttachMoneyOutlined } from "@mui/icons-material";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

import AppLayout from "../../components/AppLayout";
import { CurrentCryptoContext } from "../../contexts/CurrentCryptoContext";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";
import { btcToReal, britaToReal } from "../../utils";

export default function Buy(): JSX.Element {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { currentBtc, currentBrita } = useContext(CurrentCryptoContext);

  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [value, setValue] = useState<number>();

  async function handleBuyBtc() {
    try {
      if (currentUser && currentUser.id) {
        const currentRealBalance = currentUser.real;
        const currentBtcBalance = currentUser.btc;
        const currentBritaBalance = currentUser.brita;

        if (crypto === "bitcoin" && currentBtc && value) {
          const purchaseAmount = btcToReal(value, currentBtc);

          if (value < 0) {
            toast.warning("O valor precisa ser maior do que 0.");
          } else if (purchaseAmount > currentRealBalance) {
            toast.warning("O valor precisa ser menor do que seu saldo atual.");
          } else {
            const newRealBalance = currentRealBalance - purchaseAmount;
            const updateRes = await db.user.update(currentUser.id, {
              real: newRealBalance,
              btc: currentBtcBalance + value,
              history: [
                ...currentUser.history,
                {
                  id: new Date(),
                  date: new Date(),
                  operation: `buy-${crypto}`,
                  value,
                },
              ],
            });
            if (updateRes) {
              toast.success("Compra realizada com sucesso.");
              const userExists = await db.user
                .where({ email: currentUser.email })
                .toArray();
              if (userExists.length) {
                setCurrentUser(userExists[0]);
              }
            } else {
              toast.error("Erro ao comprar crypto.");
            }
          }
        }

        if (crypto === "brita" && currentBrita && value) {
          const purchaseAmount = britaToReal(value, currentBrita);

          if (value < 0) {
            toast.warning("O valor precisa ser maior do que 0.");
          } else if (purchaseAmount > currentRealBalance) {
            toast.warning("O valor precisa ser menor do que seu saldo atual.");
          } else {
            const newRealBalance = currentRealBalance - purchaseAmount;
            const updateRes = await db.user.update(currentUser.id, {
              real: newRealBalance,
              brita: currentBritaBalance + value,
              history: [
                ...currentUser.history,
                {
                  id: new Date(),
                  date: new Date(),
                  operation: `buy-${crypto}`,
                  value,
                },
              ],
            });
            if (updateRes) {
              toast.success("Compra realizada com sucesso.");
              const userExists = await db.user
                .where({ email: currentUser.email })
                .toArray();
              if (userExists.length) {
                setCurrentUser(userExists[0]);
              }
            } else {
              toast.error("Erro ao comprar crypto.");
            }
          }
        }
      } else {
        toast.error("Erro ao comprar crypto.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro ao comprar crypto.");
    }
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <AttachMoneyOutlined /> Comprar
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
                Selecione a criptomoeda que deseja comprar:
              </Typography>
              <FormControl sx={{ marginBottom: 2 }}>
                <RadioGroup
                  value={crypto}
                  onChange={(e) => setCrypto(e.target.value)}
                >
                  <FormControlLabel
                    value="bitcoin"
                    label="Bitcoin"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="brita"
                    label="Brita"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
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
                onClick={() => handleBuyBtc()}
              >
                Comprar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
