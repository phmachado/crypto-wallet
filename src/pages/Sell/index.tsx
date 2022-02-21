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
import React, { useState, useContext } from "react";

import AppLayout from "../../components/AppLayout";
import { DashboardContext } from "../../contexts/DashboardContext";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../db";

export default function Sell(): JSX.Element {
  const { btc, brita, realToBtc, realToBrita, setBalance } =
    useContext(DashboardContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [value, setValue] = useState<number>();

  function btcToReal(value: number) {
    return value * Number(btc);
  }

  function britaToReal(value: number) {
    return value * Number(brita);
  }

  async function updateBalance(newBalance: number) {
    try {
      if (currentUser) {
        const updateRes = await db.user.update(Number(currentUser.id), {
          balance: newBalance,
          history: [
            ...currentUser.history,
            { date: new Date(), operation: `sell-${crypto}`, value },
          ],
        });
        if (updateRes) {
          const currentUserEmail = localStorage.getItem("currentUser");
          const user = await db.user
            .where({ email: currentUserEmail })
            .toArray();
          setCurrentUser(user[0]);
          setBalance(user[0].balance);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleSell(): void {
    if (currentUser && value) {
      const newBalance =
        currentUser.balance -
        (crypto === "bitcoin" ? btcToReal(value) : britaToReal(value));
      if (newBalance < 0) {
        console.log("PROVIDE_VALID_VALUE");
      } else {
        updateBalance(newBalance);
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrypto((event.target as HTMLInputElement).value);
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">
            <AttachMoneyOutlined /> Vender
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
                Selecione a criptomoeda que deseja vender:
              </Typography>
              <FormControl sx={{ marginBottom: 2 }}>
                <RadioGroup value={crypto} onChange={handleChange}>
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
              <Typography variant="caption" sx={{ p: 1 }}>
                {crypto === "bitcoin" ? (
                  <>
                    Seu saldo em Bitcoin é de{" "}
                    {currentUser
                      ? realToBtc(currentUser.balance).toFixed(8)
                      : "Carregando"}{" "}
                    BTC
                  </>
                ) : (
                  <>
                    Seu saldo em Brita é de B${" "}
                    {currentUser
                      ? realToBrita(currentUser.balance).toLocaleString(
                          "pt-BR",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : "Carregando"}{" "}
                  </>
                )}
              </Typography>
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
