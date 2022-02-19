import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState } from "react";

import AppLayout from "../../components/AppLayout";

export default function Buy(): JSX.Element {
  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [value, setValue] = useState<number>();

  function handleBuy(): void {
    console.log(crypto);
    console.log(value);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrypto((event.target as HTMLInputElement).value);
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box my={4}>
          <Typography variant="h4">Comprar</Typography>
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
              <FormControl sx={{ marginBottom: 1 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Criptomoeda
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={crypto}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="bitcoin"
                    control={<Radio />}
                    label="Bitcoin"
                  />
                  <FormControlLabel
                    value="brita"
                    control={<Radio />}
                    label="Brita"
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
                disabled={crypto === "" || !value}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleBuy()}
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
