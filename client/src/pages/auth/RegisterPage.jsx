// Import necessary dependencies from React, Redux, React Router, and other utilities
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.scss"; // Importing custom styles for the register page
import { SET_LOGIN, SET_NAME } from "../../redux/auth/authSlice"; // Importing actions from Redux slice
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Importing toast notifications
import { registerUser, validateEmail } from "../../redux/auth/authActions"; // Importing authentication functions

const RegisterPage = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation

  // State variables to manage loading state and form data
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [my_file, setMy_file] = useState("");

  // Function to handle form submission for registration
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form inputs
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!my_file) {
      return toast.error("Image is required");
    }

    setIsLoading(true); // Set loading state to true

    // Create FormData object to send data including file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("city", city);
    formData.append("my_file", my_file);

    try {
      const data = await registerUser(formData); // Attempt to register user
      console.log(data); // Log response data for debugging
      dispatch(SET_LOGIN(true)); // Dispatch login action to Redux store
      dispatch(SET_NAME(data.name)); // Set user name in Redux store
      toast.success("Success"); // Show success message
      navigate("/user/dashboard"); // Navigate to user dashboard after successful registration
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setIsLoading(false); // Handle error and set loading state to false
    }
  };

  return (
    <div className="register">
      {" "}
      {/* Container for register page */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="register_content">
          {" "}
          {/* Container for register content */}
          <form className="register_content_form" onSubmit={handleSignUp}>
            {" "}
            {/* Registration form */}
            {/* <img style={{height:150, width:150}} src="/logo.png" alt="" /> */}{" "}
            {/* Optional logo image */}
            <input
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              placeholder="City"
              name="city"
              type="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              placeholder="Phone"
              name="phone"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
            />
            {/* Hidden file input for profile photo upload */}
            <input
              id="image"
              type="file"
              name="my_file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setMy_file(e.target.files[0])}
            />
            <label htmlFor="image">
              {" "}
              {/* Label to trigger file input */}
              <img src="/addImage.png" alt="" />
              <p>Upload Your Photo</p>
            </label>
            {/* Preview uploaded image */}
            {my_file && (
              <img
                src={URL.createObjectURL(my_file)}
                alt="profile photo"
                style={{ maxWidth: "100px", borderRadius: "4px" }}
              />
            )}
            <button type="submit" disabled={isLoading}>
              {" "}
              {/* Submit button */}
              REGISTER
            </button>
          </form>
          <Link to={"/login"}>Already have an account? Log In Here</Link>{" "}
          {/* Link to login page */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
