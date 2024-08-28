// Import necessary dependencies and components from Material-UI, React, and Redux
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../redux/auth/authActions";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME, SET_TOKEN, SET_USER } from "../../redux/auth/authSlice";
import Loader from "../../components/global/Loader";

// Initial state for the form data
const initialState = {
  email: "",
  password: "",
};

// Create a default Material-UI theme
const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch(); // Initialize the Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading state
  const [formData, setformData] = useState(initialState); // State to manage form data
  const { email, password } = formData; // Destructure email and password from formData

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // Function to handle login
  const login = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate form fields
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    // Validate email format
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true); // Set loading state to true
    try {
      const data = await loginUser(userData); // Call the loginUser function to authenticate
      dispatch(SET_LOGIN(true)); // Dispatch action to set login state in Redux
      dispatch(SET_TOKEN(data.token)); // Store token in Redux state
      dispatch(SET_NAME(data.firstName + " " + data.surname)); // Set user name in Redux state
      dispatch(SET_USER(data)); // Set user data in Redux state
      navigate("/user/dashboard"); // Navigate to the user dashboard
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      setIsLoading(false); // Handle error and set loading state to false
    }
  };

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <ThemeProvider theme={defaultTheme}> {/* Apply the theme using ThemeProvider */}
        {isLoading && <Loader />} {/* Conditionally render the Loader component */}
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline /> {/* CssBaseline to normalize styles across browsers */}
          <Grid
            item
            xs={false}
            sm={6}
            md={6}
            sx={{
              backgroundImage: "/p4.jpg", // Background image for the left side
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleInputChange} // Handle input changes
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange} // Handle input changes
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, backgroundColor: "teal" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="/forgot-password"
                      onClick={() => navigate("/forgot-password")}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  {/* <Grid item xs>
                      <Link href="/" variant="body2">
                        Return to Home page
                      </Link>
                    </Grid> */}
                  <Grid item>
                    <Link onClick={() => navigate("/register")} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Footer /> {/* Render the Footer component */}
    </>
  );
}
