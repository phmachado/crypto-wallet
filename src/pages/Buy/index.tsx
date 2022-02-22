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
import { UserContext } from "../../contexts/UserContext";

export default function Buy(): JSX.Element {
  const { currentUser, setCurrentUser, updateCurrentUser } =
    useContext(UserContext);

  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [value, setValue] = useState<number>();

  async function handleBuyBtc() {
    if (currentUser && currentUser.id) {
      const { id, btc, real } = currentUser;
      const newReal = real;
      updateCurrentUser(id, { btc: value });
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
