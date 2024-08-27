import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.scss";
import { SET_LOGIN, SET_NAME } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../redux/auth/authActions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    // brand: "",
    password: "",
    confirmPassword: "",
    my_file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "my_file" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const register_form = new FormData();

  //     for (var key in formData) {
  //       register_form.append(key, formData[key]);
  //     }

  //     const response = await fetch("http://localhost:3001/auth/register", {
  //       method: "POST",
  //       body: register_form,
  //     });

  //     if (response.ok) {
  //       navigate("/login");
  //     }
  //   } catch (err) {
  //     console.log("Registration failed", err.message);
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();

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

    setIsLoading(true);
    const formData2 = new FormData();
    formData2.append("name", formData.name);
    formData2.append("phone", formData.phone);
    formData2.append("email", formData.email);
    formData2.append("password", formData.password);
    formData2.append("city", formData.city);
    formData2.append("my_file", formData.my_file);
    try {
      const data = await registerUser(formData2);
      console.log(data);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      // navigate("/dashboard");
      setIsLoading(false);
      toast.success("Success");

      navigate("/user/dashboard");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
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
          <form className="register_content_form" onSubmit={handleSignUp}>
            {/* <img style={{height:150, width:150}} src="/logo.png" alt="" /> */}
            <input
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {/* <input
              placeholder="Brand Name"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            /> */}
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

            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords are not matched!</p>
            )}

            <input
              id="image"
              type="file"
              name="my_file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image">
              <img src="/addImage.png" alt="" />
              <p>Upload Your Photo</p>
            </label>

            {formData.my_file && (
              <img
                src={URL.createObjectURL(formData.my_file)}
                alt="profile photo"
                style={{ maxWidth: "100px", borderRadius: "4px" }}
              />
            )}
            <button type="submit" disabled={!passwordMatch}>
              REGISTER
            </button>
          </form>
          <Link to={"/login"}>Already have an account? Log In Here</Link>
          {/* <a href="/login">Already have an account? Log In Here</a> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
