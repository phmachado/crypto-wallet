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

export default function LayoutAppBar() {
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
          <ListItem button key="1">
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key="2">
            <ListItemIcon>
              <AttachMoneyOutlined />
            </ListItemIcon>
            <ListItemText primary="Comprar" />
          </ListItem>

          <ListItem button key="3">
            <ListItemIcon>
              <CurrencyExchangeOutlined />
            </ListItemIcon>
            <ListItemText primary="Trocar" />
          </ListItem>

          <ListItem button key="4">
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
