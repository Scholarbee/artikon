// Importing necessary dependencies from React, Material UI, React Router, and Redux
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_BRAND,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/auth/authSlice";
import { logoutUser, registerAgent } from "../../redux/auth/authActions";
import { Backdrop, Fade, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";

// Navbar component definition
function Navbar() {
  // Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors called to get the user login status and user information
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUser);
  
  // State hooks for managing various UI interactions instialized with default values
  const [anchorElNav, setAnchorElNav] = useState(null); // For navigation menu
  const [anchorElUser, setAnchorElUser] = useState(null); // For user menu
  const [open, setOpen] = useState(false); // For modal visibility
  const [isLoading, setIsLoading] = useState(false); // For loading state during async actions
  const [brandName, setBrandName] = useState(""); // For storing brand name input
  const [brandLocation, setBrandLocation] = useState(""); // For storing brand location input
  const [brandContact, setBrandContact] = useState(""); // For storing brand contact input

  // Handlers for opening and closing menus
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  
  // Function to log out the user
  const logOutUser = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false)); // Reset login state
    dispatch(
      SET_USER({ // Clear user information
        _id: "",
        name: "",
        email: "",
        phone: "",
        photo: "",
        city: "",
        role: "",
      })
    );
    dispatch(SET_BRAND({ brandName: "", brandLocation: "", brandContact: "" }));
    dispatch(SET_TOKEN("")); // Clear token
    navigate("/"); // Redirect to homepage
  };

  // Function to register the user as an agent
  const handleRegisterAgent = async () => {
    const brandInfo = {
      brandName,
      brandLocation,
      brandContact,
    };
    try {
      setIsLoading(true);
      const data = await registerAgent(brandInfo);// Register agent
      console.log(data);
      dispatch(SET_BRAND(data.user.brand)); // Update brand information
      dispatch(SET_USER(data.user)); // Update user information
      setOpen(false); // Close modal
      navigate("/user/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.log(error.response.message);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Navbar component JSX structure
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(38, 38, 38)" }}>
      <Container>
        <Toolbar disableGutters>
          {/* Logo Button - Redirects to home */}
          <Button onClick={() => navigate("/")}>
            <Avatar alt="logo" src="/logo.png" sx={{ width: 70, height: 70 }} />
          </Button>
          {/* Brand name - Visible on medium and larger screens */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".5rem",
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            ArtiKon
          </Typography>

          {/* Navigation menu - Visible on small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Navigation links */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to={`/`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {"Home"}
                  </Link>
                </Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/user/dashboard`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Dashboard"}
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/login`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Login"}
                    </Link>
                  </Typography>
                </MenuItem>
              )}
              {/* Option to become an agent if the user is logged in */}
              {userInfo.role === "user" && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    setOpen(true);
                  }}
                >
                  <Typography textAlign="center">
                    <Link
                      // to={`/user/dashboard`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Become Agent"}
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

           {/* Brand name - Visible on mobile screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            ArtiKon
          </Typography>
          {/* Desktop view navigation buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              Home
            </Button>
            {isLoggedIn ? (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/user/dashboard");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/login");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Login
              </Button>
            )}
            {/* Option to become an agent if the user is logged in */}
            {userInfo.role === "user" && (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  setOpen(true);
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Become An Agent
              </Button>
            )}
          </Box>

          {/* User settings menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={userInfo.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
            >

              {/* User account options */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    Profile
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    to="/change-password"
                    style={{ textDecoration: "none" }}
                  >
                    Change Password
                  </Link>
                </Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={logOutUser}>
                  <Typography textAlign="center" color="#8e67b2">
                    Log Out
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Box>
        {/* Modal for becoming an agent */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >

          {/* Modal content */}
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                sx={{
                  textAlign: "center",
                  borderBottom: "2px solid rgb(85, 0, 70)",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "rgb(85, 0, 70)",
                }}
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                Register As Agent
              </Typography>
              {/* <Typography
                variant="body2"
                color="red"
                // id="transition-modal-description"
                sx={{ mt: 3 }}
              >
                Please do not make advance payment until you get what you want.
              </Typography> */}

              <TextField
                margin="normal"
                required
                fullWidth
                id="brand"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                label={"Brand Name"}
                name="brand"
                autoComplete="brand"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={brandLocation}
                id="brandLocation"
                onChange={(e) => setBrandLocation(e.target.value)}
                label={"Business Location"}
                name="brandLocation"
                autoComplete="location"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={brandContact}
                id="phone"
                label={"Business Contact"}
                name="businessPhone"
                autoComplete="businessPhone"
                onChange={(e) => {
                  setBrandContact(e.target.value);
                }}
              />
              <Stack sx={{ margin: "20px 0 0 0" }}>
                <Button
                  href=""
                  disabled={isLoading}
                  variant="contained"
                  onClick={handleRegisterAgent}
                  sx={{ backgroundColor: "rgb(85, 0, 70)" }}
                >
                  {isLoading ? "Processing..." : "Register Now"}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </AppBar>
  );
}

export default Navbar; // Exporting Navbar component

// Modal style object
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
