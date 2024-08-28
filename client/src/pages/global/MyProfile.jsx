import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectBrand, selectUser } from "../../redux/auth/authSlice";

function MyProfile() {
  // Retrieve user information from Redux store
  const userInfo = useSelector(selectUser);
  // Retrieve brand information from Redux store
  const brandInfo = useSelector(selectBrand);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              {/* User Avatar and Name Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "0 0 25px 0",
                }}
              >
                <Avatar
                  src={userInfo.photo}
                  sx={{
                    m: 1,
                    height: 100,
                    width: 100,
                    bgcolor: "rgb(85, 0, 70)",
                  }}
                ></Avatar>
                <Typography
                  sx={{ textAlign: "center", margin: "0 0 25px 0" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {userInfo.name}
                </Typography>
              </Box>

              {/* User Details Section */}
              <Box>
                <Typography gutterBottom variant="h7" component="div">
                  City: {userInfo.city}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Role: {userInfo.role}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Phone: {userInfo.phone}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Email: {userInfo.email}
                </Typography>

                {/* Conditional rendering for brand details if the user has a role other than "user" */}
                {userInfo.role !== "user" && (
                  <Box>
                    <Typography gutterBottom variant="h7" component="div">
                      Brand Name: {brandInfo.brandName}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Brand Location: {brandInfo.brandLocation}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Brand Contact: {brandInfo.brandContact}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Edit Profile Button */}
              <Stack sx={{ margin: "5px 0 0 0" }}>
                <Button
                  href=""
                  variant="contained"
                  sx={{ backgroundColor: "rgb(85, 0, 70)" }}
                >
                  Edit Profile
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default MyProfile;
