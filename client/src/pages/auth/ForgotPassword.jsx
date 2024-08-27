import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword, validateEmail } from "../../redux/auth/authActions";
import { toast } from "react-toastify";
import Loader from "../../components/global/Loader";

function ForgotPassword() {
  const navigate = useNavigate();
  // const despatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email");
    } else {
      setIsLoading(true);
      console.log(email);
      const userData = {
        email,
      };
      const mailSent = await forgotPassword(userData);
      if (mailSent) {
        toast.success("Mail sent succesfully");
        navigate("/login");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
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
          {isLoading && <Loader />}
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
              Change Password
            </Typography>
            <Stack spacing={3} width={100 + "%"}>
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                variant="standard"
              />
              <Button
                onClick={sendMail}
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ backgroundColor: "rgb(85, 0, 70)" }}
              >
                Send reset link
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
      {/* <Box
        sx={{
          // margin:"auto",
          // marginTop: "auto",
          // marginBottom: "auto",
          // marginRight: "auto",
          // marginLeft: "auto",
          // backgroundColor: "teal",
          textAlign:"center",
          height:"100vh",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 500, height: 420, display: "block" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "teal" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              gutterBottom
              marginBottom={2}
              alignContent={"center"}
              variant="h6"
              component="div"
            >
              Change Password
            </Typography>
            <Stack spacing={3} width={100 + "%"}>
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                variant="standard"
              />
              <Button variant="contained" endIcon={<SendIcon />}>
                Send reset link
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box> */}
    </>
  );
}

export default ForgotPassword;
