import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import InboxIcon from "@mui/icons-material/PostAddRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import IsoIcon from "@mui/icons-material/Iso";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartCheckout";
import AppointmentIcon from "@mui/icons-material/ApprovalOutlined";
import ReportIcon from "@mui/icons-material/Report";
import {
  selectSidebarIsOpen,
  selectUser,
  SET_SIDEBAR_OPEN,
} from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);
  const sidebarOpen = useSelector(selectSidebarIsOpen);

  const itemTextStyle = {
    opacity: sidebarOpen ? 1 : 0,
    color: sidebarOpen ? "#e0e0e0" : "#b0b0b0", // Slightly lighter gray for closed state
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={sidebarOpen}>
        <DrawerHeader sx={{ backgroundColor: "rgb(85, 0, 70)" }}>
          {" "}
          {/* Darker purple background */}
          <IconButton onClick={() => dispatch(SET_SIDEBAR_OPEN(!sidebarOpen))}>
            {!sidebarOpen ? (
              <ChevronRightIcon sx={{ color: "#e0e0e0" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#e0e0e0" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#e0e0e0" }} />{" "}
        {/* Light gray divider */}
        <List sx={{ backgroundColor: "rgb(85, 0, 70)", flexGrow: 1 }}>
          {" "}
          {/* {userInfo.role === "admin" &&
          } */}
          {userInfo.role === "admin" &&
            adminMenuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(item.path)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: sidebarOpen ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter hover effect
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: "#e0e0e0", // Light icon color
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={itemTextStyle} />
                </ListItemButton>
              </ListItem>
            ))}
          {(userInfo.role === "agent" || userInfo.role === "admin") &&
            agentMenuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(item.path)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: sidebarOpen ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter hover effect
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: "#e0e0e0", // Light icon color
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={itemTextStyle} />
                </ListItemButton>
              </ListItem>
            ))}
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(item.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter hover effect
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : "auto",
                    justifyContent: "center",
                    color: "#e0e0e0", // Light icon color
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={itemTextStyle} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "rgb(85, 0, 70)", // Darker purple
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "rgb(85, 0, 70)", // Darker purple
    },
  }),
}));

const menuItems = [
  {
    text: "My Cart",
    icon: <ShoppingCartIcon />,
    path: "/post/orders-and-books",
  },

  { text: "Report Bug", icon: <ReportIcon />, path: "/report-bug" },
];

const adminMenuItems = [
  {
    text: "Manage Users",
    icon: <PeopleOutlineIcon />,
    path: "/admin/manage-users",
  },
  { text: "Manage Posts", icon: <IsoIcon />, path: "/admin/manage-posts" },
];

const agentMenuItems = [
  { text: "My Post", icon: <InboxIcon />, path: "/user/posts" },
  {
    text: "My Appointments",
    icon: <AppointmentIcon />,
    path: "/user/appointments",
  },
  {
    text: "My Orders",
    icon: <AppointmentIcon />,
    path: "/user/orders",
  },
  { text: "Archives", icon: <ArchiveIcon />, path: "/archives" },
];
