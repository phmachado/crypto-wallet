import { Box, Grid, Paper, Typography } from "@mui/material";

import loginBg from "../assets/login-bg.jpeg";

type Props = {
  children: JSX.Element;
};

export default function BeforeAppLayout({ children }: Props): JSX.Element {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${loginBg})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 25,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            CryptoWallet
          </Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
