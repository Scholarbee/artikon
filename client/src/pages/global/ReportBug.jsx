import React, { useState } from "react";
import "./Contact.scss";

// Importing Material-UI icons for various contact methods
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Mail from "@mui/icons-material/Mail";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Twitter from "@mui/icons-material/Twitter";
import Phone from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";

// Importing toast for notifications and axios for making API requests
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../redux/auth/authActions";

// Importing Material-UI components
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ReportBug = () => {
  // State variables for handling form inputs
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Data object to be sent to the backend
  const data = {
    subject,
    message,
  };

  // Function to handle sending email reports
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact/report`, data);
      // Resetting form fields after successful submission
      setSubject("");
      setMessage("");
      // Display success message using toast
      toast.success(response.data.message);
    } catch (error) {
      // Display error message using toast
      toast.error(error.message);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "auto" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
              }}
            >
              {/* Icon and Title for the contact form */}
              <Avatar sx={{ m: 1, bgcolor: "rgb(85, 0, 70)" }}>
                <Mail />
              </Avatar>
              <Typography
                gutterBottom
                marginBottom={2}
                alignContent={"center"}
                variant="h6"
                component="div"
              >
                Contact Us
              </Typography>

              {/* Form fields for subject and message */}
              <Stack spacing={3} width={100 + "%"}>
                <TextField
                  id="subject"
                  label="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  autoComplete="mail-subject"
                  value={subject}
                  variant="standard"
                />
                <label>Message</label>
                <textarea
                  cols="30"
                  rows="10"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                {/* Button to send the report */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={sendEmail}
                  endIcon={<SendIcon />}
                  sx={{ backgroundColor: "rgb(85, 0, 70)" }}
                >
                  Send Report
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "auto" }}>
            <CardContent>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>

              {/* List of contact methods with icons */}
              <div className="icons">
                <span>
                  <Phone />
                  <p>+233(0)542852186</p>
                </span>
                <span>
                  <Mail />
                  <p>artikon.alx@outlook.com</p>
                </span>
                <span>
                  <LocationOnIcon />
                  <p>Twifo Praso, Ghana</p>
                </span>
                <span>
                  <Twitter />
                  <p>@ArtiKon</p>
                </span>
                <span>
                  <WhatsApp />
                  <p>+233(0)542852186</p>
                </span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportBug;
