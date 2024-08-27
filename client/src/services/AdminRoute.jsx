import React from "react";
import { selectIsLoggedIn } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <> {children}</>;
  }
  return null;
}

export default AdminRoute;
