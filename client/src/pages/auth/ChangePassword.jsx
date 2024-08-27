import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function ChangePassword() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Card sx={{ maxWidth: 500, height: 420 }}>
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
              id="oldpassword"
              label=" Old Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="newpassword"
              label="New Password"
              type="password"
              autoComplete="new-password"
              variant="standard"
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="confirm-password"
              variant="standard"
            />

            <Button
              variant="contained"
              // color="success"
              sx={{ backgroundColor: "rgb(85, 0, 70)" }}
            >
              Change Password
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default ChangePassword;
