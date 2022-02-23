import { Box, CircularProgress } from "@mui/material";

export default function AppLayout(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 5,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
