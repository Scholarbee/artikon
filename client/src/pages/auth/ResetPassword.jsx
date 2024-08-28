import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/auth/authActions";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  // Initialize state for password and confirm password fields
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Extract token parameter from URL
  const { tk } = useParams();
  // Initialize navigation hook
  const navigate = useNavigate();

  // Handle password reset form submission
  const changePassword = async (e) => {
    e.preventDefault();

    // Validate if password fields are filled
    if (!password || !password2) {
      toast.error("Please all fields are required.");
    }
    // Check if passwords match
    if (password !== password2) {
      toast.error("Password mismatch");
    }

    // Prepare data for password reset request
    const data = { password, password2 };

    try {
      // Call the resetPassword action and handle success
      const result = await resetPassword(data, tk);
      navigate("/login");
      toast(result.message);
      toast("Password reset successfully");
    } catch (error) {
      // Handle errors during password reset
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        style={{
          // Background styling for the reset password page
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            margin: "auto",
            marginTop: "15vh",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            {/* Lock icon avatar for visual representation */}
            <Avatar sx={{ m: 1, bgcolor: "rgb(85, 0, 70)" }}>
              <LockOutlinedIcon />
            </Avatar>
            {/* Page title */}
            <Typography
              gutterBottom
              marginBottom={2}
              alignContent={"center"}
              variant="h6"
              component="div"
            >
              Reset Password
            </Typography>
            {/* Input fields and submit button */}
            <Stack spacing={3} width={100 + "%"}>
              <TextField
                id="newpassword"
                label="New Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
                variant="standard"
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                autoComplete="confirm-password"
                variant="standard"
              />
              <Button
                href="/login"
                variant="contained"
                onClick={changePassword}
                sx={{ backgroundColor: "rgb(85, 0, 70)" }}
              >
                Submit
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ResetPassword;
