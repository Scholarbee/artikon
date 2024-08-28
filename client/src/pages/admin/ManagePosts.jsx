// Import React and other necessary dependencies from Material UI, Moment.js, and React
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  adminBlockUser,
  adminDeleteUser,
  adminUnblockUser,
  getUsers,
} from "../../redux/auth/authActions";
import { toast } from "react-toastify";
import {
  adminBlockPost,
  adminGetPosts,
  adminUnblockPost,
} from "../../redux/posts/postActions";
import Loader from "../../components/global/Loader";

// Define the ManagePosts component
function ManagePosts() {
  // State variables to manage pagination, loading, and posts data
  const [page, setPage] = useState(0); // Current page in the table
  const [pageLoading, setPageLoading] = useState(false); // Loading state for the page
  const [buttonLoading, setButtonLoading] = useState(false); // Loading state for buttons
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page in the table
  const [posts, setPosts] = useState([]); // Posts data
  const [myOrders, setMyOrders] = useState([]); // Orders data (unused in this code)

  // Handle page change in the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch posts data on component mount
  useEffect(() => {
    getPosts();
    // Optionally, getOrders could be called here if needed
    // getOrders();
  }, []);

  // Function to fetch posts from the server
  const getPosts = async () => {
    setPageLoading(true);
    const { data } = await adminGetPosts(); // Fetch posts data
    console.log(data);
    setPosts(data.posts); // Set the posts state with fetched data
    setPageLoading(false); // Stop loading
  };

  // Function to refresh posts data
  const showPosts = async () => {
    const { data } = await adminGetPosts();
    console.log(data);
    setPosts(data.posts);
  };

  // Function to block a post
  const blockPost = async (id, postTitle, ownerName, ownerEmail) => {
    setButtonLoading(true); // Start button loading state
    const data = await adminBlockPost(id, { postTitle, ownerName, ownerEmail }); // Block the post
    if (data.success) {
      toast.success("Post has been blocked successfully"); // Show success toast
    }
    // Refresh posts data after blocking
    await showPosts();
    setButtonLoading(false); // Stop button loading state
  };

  // Function to unblock a post
  const unblockPost = async (id, postTitle, ownerName, ownerEmail) => {
    setButtonLoading(true);
    const data = await adminUnblockPost(id, { postTitle, ownerName, ownerEmail }); // Unblock the post
    if (data.success) {
      toast.success("Post has been unblocked successfully");
    }
    // Refresh posts data after unblocking
    await showPosts();
    setButtonLoading(false);
  };

  // Function to delete a post (not fully implemented here)
  const deletepost = async (id) => {
    const { data } = await adminDeleteUser(id);
    if (data.success) {
      toast.success("User has been deleted successfully");
    }
    // Refresh posts data after deletion
    await showPosts();
  };

  return (
    <>
      {pageLoading ? (
        <Loader /> // Show loader if page is loading
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card sx={{ height: "auto" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "black" }}
                >
                  Manage Posts
                </Typography>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Posted By</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Post Title</TableCell>
                          <TableCell>Post Ref</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {posts
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((post, i) => {
                            return (
                              <TableRow key={i}>
                                <TableCell>{post.postedBy.name}</TableCell>
                                <TableCell>{post.postedBy.email}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post._id}</TableCell>
                                <TableCell>
                                  {moment(post.createdAt).format(
                                    "MMMM DD, YYYY"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {post.isActive ? "Active" : "Blocked"}
                                </TableCell>
                                <TableCell>
                                  {post.isActive ? (
                                    <Button
                                      disabled={buttonLoading}
                                      onClick={() =>
                                        blockPost(
                                          post._id,
                                          post.title,
                                          post.postedBy.name,
                                          post.postedBy.email
                                        )
                                      }
                                    >
                                      Block
                                    </Button>
                                  ) : (
                                    <Button
                                      disabled={buttonLoading}
                                      onClick={() =>
                                        unblockPost(
                                          post._id,
                                          post.title,
                                          post.postedBy.name,
                                          post.postedBy.email
                                        )
                                      }
                                    >
                                      Unblock
                                    </Button>
                                  )}
                                  {/* Optionally, delete button can be added here */}
                                  {/* <Button onClick={() => deletepost(post._id)}>
                                    Delete
                                  </Button> */}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]} // Rows per page options
                    component="div"
                    count={posts.length} // Total number of posts
                    rowsPerPage={rowsPerPage} // Current rows per page
                    page={page} // Current page
                    onPageChange={handleChangePage} // Handle page change
                    onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                  />
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ManagePosts;
