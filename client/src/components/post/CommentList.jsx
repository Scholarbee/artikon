import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { teal, grey } from "@mui/material/colors";
import { ListItemText } from "@mui/material";

const CommentList = ({ name, text, date, profilePhoto }) => {
  return (
    <List
      sx={{
        maxWidth: 360,
        bgcolor: grey[900],
        borderRadius: "12px",
        marginBottom: "6px",
        padding: "8px",
        color: grey[50],
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name || "User"} src={profilePhoto} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#f57eb6",
              }}
            >
              {name}
            </Typography>
          }
          secondary={
            <>
              <Typography
                variant="caption"
                sx={{ display: "block", marginBottom: "4px", color: grey[400] }} // Muted gray for the date
              >
                {date}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ fontSize: "0.9rem", color: grey[100] }} // Slightly larger font size and light gray for the comment text
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
