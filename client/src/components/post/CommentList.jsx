// Importing necessary dependencies from React and Material UI
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { teal, grey } from "@mui/material/colors";
import { ListItemText } from "@mui/material";

// CommentList component definition
const CommentList = ({ name, text, date, profilePhoto }) => {
  return (
    // List component to hold the comment items
    <List
      sx={{
        maxWidth: 360, // Maximum width for the comment box
        bgcolor: grey[900], // Dark gray background color
        borderRadius: "12px", // Rounded corners
        marginBottom: "6px", // Spacing below each comment
        padding: "8px", // Padding inside the comment box
        color: grey[50], // Light text color for better contrast
      }}
    >
      {/* ListItem to display individual comment with avatar and text */}
      <ListItem alignItems="flex-start">
        {/* Avatar component to display user's profile picture */}
        <ListItemAvatar>
          <Avatar alt={name || "User"} src={profilePhoto} />
        </ListItemAvatar>
        
        {/* ListItemText to display the name, date, and comment text */}
        <ListItemText
          primary={
            <Typography
              variant="subtitle1" // Subtitle1 variant for the name
              sx={{
                fontWeight: "bold", // Bold font for the name
                color: "#f57eb6", // Pinkish color for the name
              }}
            >
              {name}
            </Typography>
          }
          secondary={
            <>
              {/* Typography for the date with a muted gray color */}
              <Typography
                variant="caption"
                sx={{ display: "block", marginBottom: "4px", color: grey[400] }}
              >
                {date}
              </Typography>
              {/* Typography for the comment text with a slightly larger font size and light gray color */}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontSize: "0.9rem", color: grey[100] }}
              >
                {text}
              </Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default CommentList;
