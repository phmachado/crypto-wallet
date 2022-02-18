import { Typography, Toolbar, AppBar } from "@mui/material";

export default function LayoutAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CryptoWallet
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
