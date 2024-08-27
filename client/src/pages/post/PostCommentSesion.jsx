import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Button, Divider, Grid, Stack } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import CommentList from "../../components/post/CommentList";
import { getPost } from "../../redux/posts/postActions";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import { BACKEND_URL } from "../../redux/auth/authActions";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

const PostCommentSesion = () => {
  useRedirectLoggedOutUser("/login");
  const userInfo = useSelector(selectIsLoggedIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  const showPostDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getPost(id);
      console.log(data);
      setTitle(data.post.title);
      setContent(data.post.description);
      setImage(data.post.coverPhoto.url);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
      setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      showPostDetail();
    }
  }, []);

  // add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      return toast.info(
        "You can not add  empty comment. Please type your message"
      );
    }
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/posts/add-comment/${id}`,
        {
          comment,
        }
      );

      setComment("");
      toast.success("comment added");
      showPostDetail();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <CardHeader
              title={title}
              subheader={moment(createdAt).format("MMM DD, YYYY")}
            />

            {/* <Grid xs={12} md={ 6 }> */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="auto"
                image={image}
                alt={title}
              />
            </Grid>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  // dangerouslySetInnerHTML={{ __html: content }}
                >
                  {content}
                </Box>
              </Typography>
              <Divider variant="inset" />

              {comments.length === 0 ? (
                <h4>No comments yet</h4>
              ) : (
                <Typography variant="h5" sx={{ pt: 1, mb: 1 }}>
                  Comments:
                </Typography>
              )}

              <Box sx={{ overflow: "scroll", maxHeight: 440 }}>
                {comments.map((comment) => (
                  <CommentList
                    key={comment._id}
                    name={comment.postedBy.name}
                    profilePhoto={comment.postedBy.photo.url}
                    date={moment(comment.createdAt).format(
                      "MMM DD, YYYY (HH:mm)"
                    )}
                    text={comment.text}
                  />
                ))}
              </Box>

              {userInfo ? (
                <Stack>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box
                      sx={{ pt: 1, pl: 3, pb: 3, pr: 3, bgcolor: "#fafafa" }}
                    >
                      <h5>Add your comment here!</h5>
                      <form onSubmit={handleAddComment}>
                        <Stack>
                          <TextareaAutosize
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Add a comment..."
                            style={{ padding: "5px" }}
                          />
                        </Stack>
                        <Box sx={{ pt: 1 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: "rgb(85, 0, 70)" }}
                          >
                            Comment
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Grid>
                </Stack>
              ) : (
                <>
                  <Link to="/login"> Log In to add a comment</Link>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PostCommentSesion;
