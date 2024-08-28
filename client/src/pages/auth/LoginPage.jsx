// Import necessary dependencies from React, Redux, React Router, and other utilities
import { useState } from "react";
import "../../styles/Login.scss"; // Importing custom styles for the login page
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  SET_BRAND,
  SET_LOGIN,
  SET_NAME,
  SET_TOKEN,
  SET_USER,
} from "../../redux/auth/authSlice"; // Importing actions from Redux slice
import { loginUser, validateEmail } from "../../redux/auth/authActions"; // Importing authentication functions
import { toast } from "react-toastify"; // Importing toast notifications

const LoginPage = () => {
  // State variables to manage email, password, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form inputs
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
      const data = await loginUser(userData); // Attempt to login with user data
      // Dispatch various actions to set user data in Redux state
      dispatch(SET_LOGIN(true));
      dispatch(SET_TOKEN(data.token));
      dispatch(SET_NAME(data.name));
      dispatch(SET_USER(data));
      dispatch(SET_BRAND(data.brand));
      console.log(data); // Log user data for debugging
      navigate("/user/dashboard"); // Navigate to user dashboard after successful login
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      setIsLoading(false); // Handle error and set loading state to false
    }
  };

  return (
    <div className="login"> {/* Container for login page */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login_content"> {/* Container for login content */}
          <form className="login_content_form" onSubmit={handleLogin}> {/* Login form */}
            {/* <img style={{height:150, width:150}} src="/logo.png" alt="" /> */} {/* Optional logo image */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              required
            />
            <button type="submit">LOG IN</button> {/* Submit button */}
          </form>
          <Link to={"/register"}>Don't have an account? Sign In Here</Link> {/* Link to registration page */}
          {/* <a href="/register">Don't have an account? Sign In Here</a> */} {/* Optional anchor tag */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
