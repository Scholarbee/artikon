import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

function UserRoute({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <> {isLoggedIn === true ? children : <Navigate to={"/"} />}</>;
}

export default UserRoute;
