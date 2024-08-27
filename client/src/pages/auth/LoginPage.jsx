import { useState } from "react";
import "../../styles/Login.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  SET_BRAND,
  SET_LOGIN,
  SET_NAME,
  SET_TOKEN,
  SET_USER,
} from "../../redux/auth/authSlice";
import { loginUser, validateEmail } from "../../redux/auth/authActions";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_TOKEN(data.token));
      dispatch(SET_NAME(data.name));
      dispatch(SET_USER(data));
      dispatch(SET_BRAND(data.brand));
      console.log(data);
      navigate("/user/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login_content">
          <form className="login_content_form" onSubmit={handleLogin}>
            {/* <img style={{height:150, width:150}} src="/logo.png" alt="" /> */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">LOG IN</button>
          </form>
          <Link to={"/register"}>Don't have an account? Sign In Here</Link>
          {/* <a href="/register">Don't have an account? Sign In Here</a> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
