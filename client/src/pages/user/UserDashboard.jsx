import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../../components/global/Navbar";
import PostCard from "../../components/post/PostCard";
import Footer from "../../components/global/Footer";
import { getPosts } from "../../redux/posts/postActions";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../components/global/Loader";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

function UserDashboard() {
  useRedirectLoggedOutUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data.data.posts);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.data.posts);
      false;
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {posts.length !== 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {loading ? (
              <Loader />
            ) : (
              posts.map((post, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <PostCard
                    id={post._id}
                    title={post.title}
                    description={post.description ? post.description : ""}
                    image={post.coverPhoto ? post.coverPhoto.url : ""}
                    profilePhoto={
                      post.postedBy.photo ? post.postedBy.photo.url : ""
                    }
                    subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
                    comments={post.comments.length}
                    likes={post.likes.length}
                    likesId={post.likes}
                    showPosts={showPosts}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#f57eb6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            borderRadius: "10px 10px",
          }}
        >
          <h2>No Post Is Available Now...</h2>
          <h4>Make A Post</h4>
        </Box>
      )}
    </>
  );
}

export default UserDashboard;
