import { PaidOutlined } from "@mui/icons-material";
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

export default function Sell(): JSX.Element {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { currentBtc, currentBrita } = useContext(CurrentCryptoContext);

  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [value, setValue] = useState<number>();

  // Função para lidar com a venda de crypto
  async function handleSell() {
    try {
      if (currentUser && currentUser.id) {
        const currentRealBalance = currentUser.real;
        const currentBtcBalance = currentUser.btc;
        const currentBritaBalance = currentUser.brita;

        if (crypto === "bitcoin" && currentBtc && value) {
          // Cálculo do valor de venda em R$
          const sellAmount = btcToReal(value, currentBtc);

          if (value < 0) {
            toast.warning("O valor precisa ser maior do que 0.");
          } else if (value > currentBtcBalance) {
            toast.warning("O valor não pode ser maior do que seu saldo.");
          } else {
            // Cálculo do novo valor de R$ e BTC
            const newBtcBalance = currentBtcBalance - value;
            const newRealBalance = currentRealBalance + sellAmount;
            // Atualização do usuário com os novos valores
            const updateRes = await db.user.update(currentUser.id, {
              real: newRealBalance,
              btc: newBtcBalance,
              history: [
                ...currentUser.history,
                {
                  id: new Date(),
                  date: new Date(),
                  operation: `sell-${crypto}`,
                  value,
                },
              ],
            });
            // Atualização do estado referente ao usuário logado
            if (updateRes) {
              toast.success("Venda realizada com sucesso.");
              const userExists = await db.user
                .where({ email: currentUser.email })
                .toArray();
              if (userExists.length) {
                setCurrentUser(userExists[0]);
              }
            } else {
              toast.error("Erro ao vender crypto.");
            }
          }
        }

        if (crypto === "brita" && currentBrita && value) {
          // Cálculo do valor de venda em R$
          const sellAmount = britaToReal(value, currentBrita);

          if (value < 0) {
            toast.warning("O valor precisa ser maior do que 0.");
          } else if (value > currentBritaBalance) {
            toast.warning("O valor não pode ser maior do que seu saldo.");
          } else {
            // Cálculo do novo valor de R$ e Brita
            const newBritaBalance = currentBritaBalance - value;
            const newRealBalance = currentRealBalance + sellAmount;
            // Atualização do usuário com os novos valores
            const updateRes = await db.user.update(currentUser.id, {
              real: newRealBalance,
              brita: newBritaBalance,
              history: [
                ...currentUser.history,
                {
                  id: new Date(),
                  date: new Date(),
                  operation: `sell-${crypto}`,
                  value,
                },
              ],
            });
            // Atualização do estado referente ao usuário logado
            if (updateRes) {
              toast.success("Venda realizada com sucesso.");
              const userExists = await db.user
                .where({ email: currentUser.email })
                .toArray();
              if (userExists.length) {
                setCurrentUser(userExists[0]);
              }
            } else {
              toast.error("Erro ao vender crypto.");
            }
          }
        }
      } else {
        toast.error("Erro ao vender crypto.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro ao vender crypto.");
    }
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <PaidOutlined /> Vender
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
                Qual crypto deseja vender?
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
                onClick={() => handleSell()}
              >
                Vender
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
