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

  async function handleSell() {
    if (currentUser && currentUser.id) {
      const currentRealBalance = currentUser.real;
      const currentBtcBalance = currentUser.btc;
      const currentBritaBalance = currentUser.brita;

      if (crypto === "bitcoin" && currentBtc && value) {
        const sellAmount = btcToReal(value, currentBtc);

        if (value > currentBtcBalance) {
          console.log("INVALID_OPERATION");
        } else {
          const newBtcBalance = currentBtcBalance - value;
          const newRealBalance = currentRealBalance + sellAmount;
          const updateRes = await db.user.update(currentUser.id, {
            real: newRealBalance,
            btc: newBtcBalance,
          });
          if (updateRes) {
            const userExists = await db.user
              .where({ email: currentUser.email })
              .toArray();
            if (userExists.length) {
              setCurrentUser(userExists[0]);
            }
          }
          console.log("SELL_SUCESSFUL");
        }
      }

      if (crypto === "brita" && currentBrita && value) {
        const sellAmount = britaToReal(value, currentBrita);

        if (value > currentBritaBalance) {
          console.log("INVALID_OPERATION");
        } else {
          const newBritaBalance = currentBritaBalance - value;
          const newRealBalance = currentRealBalance + sellAmount;
          const updateRes = await db.user.update(currentUser.id, {
            real: newRealBalance,
            brita: newBritaBalance,
          });
          if (updateRes) {
            const userExists = await db.user
              .where({ email: currentUser.email })
              .toArray();
            if (userExists.length) {
              setCurrentUser(userExists[0]);
            }
          }
          console.log("SELL_SUCESSFUL");
        }
      }
    }
  }

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
