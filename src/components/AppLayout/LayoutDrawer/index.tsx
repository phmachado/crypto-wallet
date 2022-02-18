import {
  DashboardOutlined,
  CurrencyExchangeOutlined,
  AttachMoneyOutlined,
  HistoryOutlined,
} from "@mui/icons-material";
import {
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Drawer,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LayoutAppBar() {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 225,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 225,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", marginTop: 1 }}>
        <List>
          <ListItem button key="1" onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key="2" onClick={() => navigate("/comprar")}>
            <ListItemIcon>
              <AttachMoneyOutlined />
            </ListItemIcon>
            <ListItemText primary="Comprar" />
          </ListItem>

          <ListItem button key="3" onClick={() => navigate("/trocar")}>
            <ListItemIcon>
              <CurrencyExchangeOutlined />
            </ListItemIcon>
            <ListItemText primary="Trocar" />
          </ListItem>

          <ListItem button key="4" onClick={() => navigate("/extrato")}>
            <ListItemIcon>
              <HistoryOutlined />
            </ListItemIcon>
            <ListItemText primary="Extrato" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
