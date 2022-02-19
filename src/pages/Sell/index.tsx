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
import React, { useState } from "react";

import AppLayout from "../../components/AppLayout";

export default function Sell(): JSX.Element {
  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [value, setValue] = useState<number>();

  function handleSell(): void {
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
