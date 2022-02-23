import { Toolbar, Box } from "@mui/material";
import { ReactNode } from "react";

import LayoutAppBar from "./LayoutAppBar";
import LayoutDrawer from "./LayoutDrawer";

type Props = {
  children: ReactNode;
};

// Layout utilizado para o App
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
