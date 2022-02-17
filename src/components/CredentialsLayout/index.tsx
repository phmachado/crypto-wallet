import { Box, Grid, Paper, Typography } from "@mui/material";

import loginBg from "../../assets/login-bg.jpeg";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function CredentialsLayout({ children }: Props): JSX.Element {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${loginBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={12} square>
        <Box
          sx={{
            p: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography m={4} variant="h5">
            CryptoWallet
          </Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
