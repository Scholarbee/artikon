// Importing necessary dependencies from Material UI, React Router, Redux, and other libraries
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { teal } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addLke, removeLike } from "../../redux/posts/postActions";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSlice";
import { useState } from "react";

// PostCard component definition
const PostCard = ({
  id,
  title,
  subheader,
  image,
  profilePhoto,
  description,
  comments,
  likes,
  showPosts,
  likesId,
}) => {
  const userInfo = useSelector(selectUser); // Retrieve user information from Redux store
  const navigate = useNavigate(); // Navigation function for routing
  const [isLoading, setIsLoading] = useState(false); // Loading state for like actions

  // Function to handle adding a like
  const handleAddLike = async () => {
    try {
      const data = await addLke(id);
      if (data.success == true) {
        showPosts(); // Refresh posts after successful like
      }
    } catch (error) {
      toast.error(error.response.data.error); // Display error message on failure
    }
  };

  // Function to handle removing a like
  const handleRemoveLike = async () => {
    try {
      const data = await removeLike(id);
      if (data.success == true) {
        showPosts(); // Refresh posts after successful unlike
      }
    } catch (error) {
      toast.error(error.response.data.error); // Display error message on failure
    }
  };

  return (
    <Card sx={{ backgroundColor: "rgb(38, 38, 38)", color: "white" }}>
      {/* Card header with avatar, title, and subheader */}
      <CardHeader
        sx={{ color: "white" }}
        avatar={
          <Avatar sx={{ bgcolor: "#f57eb6" }} src={profilePhoto} aria-label="dp" />
        }
        title={
          <Typography variant="h6" sx={{ fontSize: "0.8rem" }}>
            {title}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            sx={{ fontSize: "0.5rem", color: "rgba(255, 255, 255, 0.5)" }}
          >
            {subheader}
          </Typography>
        }
      />
      
      {/* Card media displaying the image */}
      <CardMedia component="img" height="240" image={image} alt="Artikon" />
      
      {/* Card content displaying the description */}
      <CardContent>
        <Typography variant="body2" color="smokewhite">
          <Box
            component="span"
            dangerouslySetInnerHTML={{
              __html: description.split(" ").slice(0, 5).join(" ") + "...",
            }}
          ></Box>
        </Typography>
      </CardContent>
      
      {/* Card actions with like, info, and comment buttons */}
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {/* Display either filled or outlined favorite icon based on whether the user has liked the post */}
            {likesId.includes(userInfo && userInfo._id) ? (
              <IconButton
                disabled={isLoading}
                onClick={handleRemoveLike}
                aria-label="add to favorites"
              >
                <FavoriteIcon sx={{ color: "#f57eb6" }} />
              </IconButton>
            ) : (
              <IconButton
                disabled={isLoading}
                onClick={handleAddLike}
                aria-label="add to favorites"
              >
                <FavoriteBorderIcon sx={{ color: "#f57eb6" }} />
              </IconButton>
            )}
            {likes} Like(s)
          </Box>
          <Box>
            <IconButton
              aria-label="info"
              onClick={() => navigate("/post/info/" + id)}
            >
              <InfoIcon sx={{ color: "rgb(78, 140, 255)" }} />
            </IconButton>
          </Box>
          <Box>
            {comments}
            <IconButton
              aria-label="comment"
              onClick={() => navigate("/post/comments/session/" + id)}
            >
              <CommentIcon sx={{ color: "#00695c" }} />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
