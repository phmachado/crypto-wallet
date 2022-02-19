import { SwapHorizOutlined } from "@mui/icons-material";
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
import { useState } from "react";

import AppLayout from "../../components/AppLayout";

export default function Exchange(): JSX.Element {
  const [value, setValue] = useState<number>();
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<string[]>(["Bitcoin", "Brita"]);

  function handleExchange(): void {
    console.log(isSwap ? "brita-bitcoin" : "bitcoin-brita");
    console.log(value);
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">Trocar</Typography>
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
                  {isSwap ? "Brita por Bitcoin :)" : "Bitcoin por Brita :)"}
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
