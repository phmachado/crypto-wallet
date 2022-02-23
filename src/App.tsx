import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";

import { CurrentCryptoContextProvider } from "./contexts/CurrentCryptoContext";
import { UserContextProvider } from "./contexts/UserContext";
import AppRoutes from "./routes";

const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserContextProvider>
          <CurrentCryptoContextProvider>
            <AppRoutes />
          </CurrentCryptoContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
