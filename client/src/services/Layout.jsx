/* eslint-disable react/display-name */
import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, bgcolor: "rgb(232, 232, 232)" }}>
          <Navbar />
          <Box
            sx={{
              p: 2,
              backgroundColor: "rgba(0,0,0,.7)",
              // flexGrow: 1,
              // backgroundImage: "url('/Picture3.jpg')",
              // backgroundSize: "cover",
              minHeight: "90vh",
              // backgroundAttachment: "fixed", // Ensures the background image stays fixed while scrolling
              // backgroundPosition: "center",
            }}
          >
            <Component {...props} />
          </Box>
        </Box>
      </div>
    );
  };

export default Layout;

