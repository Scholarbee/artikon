// Import necessary dependencies from React, Redux, React Router, and other utilities
import { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
    my_file: null,
  });

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "my_file" ? files[0] : value, // Set file if input is file type
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true); // State to check if passwords match

  // Function to handle form submission for registration
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form inputs
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }
    if (formData.password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(formData.email)) {
      return toast.error("Please enter a valid email");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsLoading(true); // Set loading state to true

    // Create FormData object to send data including file upload
    const formData2 = new FormData();
    formData2.append("name", formData.name);
    formData2.append("phone", formData.phone);
    formData2.append("email", formData.email);
    formData2.append("password", formData.password);
    formData2.append("city", formData.city);
    formData2.append("my_file", formData.my_file);

    try {
      const data = await registerUser(formData2); // Attempt to register user
      console.log(data); // Log response data for debugging
      dispatch(SET_LOGIN(true)); // Dispatch login action to Redux store
      dispatch(SET_NAME(data.name)); // Set user name in Redux store
      toast.success("Success"); // Show success message
      navigate("/user/dashboard"); // Navigate to user dashboard after successful registration
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      setIsLoading(false); // Handle error and set loading state to false
    }
  };

  return (
    <div className="register"> {/* Container for register page */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="register_content"> {/* Container for register content */}
          <form className="register_content_form" onSubmit={handleSignUp}> {/* Registration form */}
            {/* <img style={{height:150, width:150}} src="/logo.png" alt="" /> */} {/* Optional logo image */}
            <input
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              placeholder="City"
              name="city"
              type="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Phone"
              name="phone"
              type="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              required
            />

            {/* Show warning if passwords do not match */}
            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords are not matched!</p>
            )}

            {/* Hidden file input for profile photo upload */}
            <input
              id="image"
              type="file"
              name="my_file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image"> {/* Label to trigger file input */}
              <img src="/addImage.png" alt="" />
              <p>Upload Your Photo</p>
            </label>

            {/* Preview uploaded image */}
            {formData.my_file && (
              <img
                src={URL.createObjectURL(formData.my_file)}
                alt="profile photo"
                style={{ maxWidth: "100px", borderRadius: "4px" }}
              />
            )}
            <button type="submit" disabled={!passwordMatch}> {/* Submit button */}
              REGISTER
            </button>
          </form>
          <Link to={"/login"}>Already have an account? Log In Here</Link> {/* Link to login page */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
