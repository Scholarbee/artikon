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
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { tk } = useParams();
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      toast.error("Please all fields are required.");
    }
    if (password !== password2) {
      toast.error("Password mismatch");
    }

    const data = { password, password2 };

    try {
      const result = await resetPassword(data, tk);
      navigate("/login");
      toast(result.message);
      toast("Password reset successfully");
    } catch (error) {
      toast.error(error.message);
    }

  };
  return (
    <>
      <div
        style={{
          // backgroundColor: "teal",
          height: "100vh",
          // marginTop:"5vh",
          // margin: "",
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          // margin:"auto"
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            // height: 350,
            margin: "auto",
            // backgroundColor: "GrayText",
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
            <Avatar sx={{ m: 1, bgcolor: "rgb(85, 0, 70)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              gutterBottom
              marginBottom={2}
              alignContent={"center"}
              variant="h6"
              component="div"
            >
              Reset Password
            </Typography>
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
