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

function ManagePosts() {
  const [page, setPage] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getPosts();
    //   getOrders();
  }, []);

  const getPosts = async () => {
    setPageLoading(true);
    const { data } = await adminGetPosts();
    console.log(data);
    setPosts(data.posts);
    setPageLoading(false);
  };

  const showPosts = async () => {
    const { data } = await adminGetPosts();
    console.log(data);
    setPosts(data.posts);
  };

  const blockPost = async (id, postTitle, ownerName, ownerEmail) => {
    setButtonLoading(true);
    const data = await adminBlockPost(id, { postTitle, ownerName, ownerEmail });
    if (data.success) {
      toast.success("Post has been blocked successfully");
    }
    // console.log(data);
    await showPosts();
    setButtonLoading(false);
  };
  const unblockPost = async (id, postTitle, ownerName, ownerEmail) => {
    setButtonLoading(true);
    const data = await adminUnblockPost(id, {
      postTitle,
      ownerName,
      ownerEmail,
    });
    if (data.success) {
      toast.success("Post has been unblocked successfully");
    }
    // console.log(data);
    await showPosts();
    setButtonLoading(false);
  };
  const deletepost = async (id) => {
    const { data } = await adminDeleteUser(id);
    if (data.success) {
      toast.success("User has been deleted successfully");
    }

    // console.log(data);
    await showPosts();
  };
  return (
    <>
      {pageLoading ? (
        <Loader />
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
                                  {/* <Button onClick={() => deletepost(post._id)}>
                                    Unblock
                                  </Button> */}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
                    component="div"
                    count={posts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
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
