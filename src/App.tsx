import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CurrentCryptoContextProvider } from "./contexts/CurrentCryptoContext";
import { UserContextProvider } from "./contexts/UserContext";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer theme="colored" />
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
