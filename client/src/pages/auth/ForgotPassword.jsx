// Importing necessary components and icons from Material-UI
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function ChangePassword() {
  // State to manage the visibility of the password
  const [showPassword, setShowPassword] = React.useState(false);

  // Function to toggle the visibility of the password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default behavior when the mouse is down on the password input field
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Card container to hold the change password form */}
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
          {/* Avatar with a lock icon, representing password change */}
          <Avatar sx={{ m: 1, bgcolor: "teal" }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* Title of the card */}
          <Typography
            gutterBottom
            marginBottom={2}
            alignContent={"center"}
            variant="h6"
            component="div"
          >
            Change Password
          </Typography>
          {/* Stack container for form fields */}
          <Stack spacing={3} width="100%">
            {/* Old password input field */}
            <TextField
              id="oldpassword"
              label="Old Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
            {/* New password input field */}
            <TextField
              id="newpassword"
              label="New Password"
              type="password"
              autoComplete="new-password"
              variant="standard"
            />
            {/* Confirm password input field */}
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="confirm-password"
              variant="standard"
            />
            {/* Button to submit the password change */}
            <Button
              variant="contained"
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

export default ChangePassword; // Exporting the component for use in other parts of the application
