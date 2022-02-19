import { Typography, Box } from "@mui/material";

export default function PageNotFound(): JSX.Element {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" sx={{ paddingBottom: 3 }}>
        Oops.
      </Typography>
      <Typography variant="button">Página não encontrada :/</Typography>
    </Box>
  );
}
