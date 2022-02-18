import { Toolbar, Box } from "@mui/material";

import LayoutAppBar from "./LayoutAppBar";
import LayoutDrawer from "./LayoutDrawer";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function AppLayout({ children }: Props): JSX.Element {
  return (
    <Box sx={{ display: "flex" }}>
      <LayoutAppBar />
      <LayoutDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
