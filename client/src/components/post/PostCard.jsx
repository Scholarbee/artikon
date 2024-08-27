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
//import image from '../images/blog.jpg'

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
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //add like
  const handleAddLike = async () => {
    try {
      // setIsLoading(true);
      const data = await addLke(id);
      if (data.success == true) {
        showPosts();
        // setIsLoading(false);
      }
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      // setIsLoading(false);
    }
  };

  //remove like
  const handleRemoveLike = async () => {
    try {
      // setIsLoading(true);
      const data = await removeLike(id);
      if (data.success == true) {
        showPosts();
        // setIsLoading(false);
      }
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      // setIsLoading(false);
    }
  };

  return (
    <Card sx={{ backgroundColor: "rgb(38, 38, 38)", color: "white" }}>
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
      {/* <Link to={`/post/${id}`}> */}
      <CardMedia component="img" height="240" image={image} alt="Artikon" />
      {/* </Link> */}
      <CardContent>
        <Typography variant="body2" color="smokewhite">
          {/* {content} */}

          <Box
            component="span"
            dangerouslySetInnerHTML={{
              __html: description.split(" ").slice(0, 5).join(" ") + "...",
            }}
          ></Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
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
            {/* {comments} */}
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
              // color={teal}
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
