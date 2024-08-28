// Importing necessary components and dependencies
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
import moment from "moment"; // Library for formatting dates
import React, { useEffect, useState } from "react";
import {
  adminBlockUser,
  adminDeleteUser,
  adminUnblockUser,
  getUsers,
} from "../../redux/auth/authActions"; // Actions for user management
import { toast } from "react-toastify"; // For displaying notifications

function ManageUsers() {
  // State variables for pagination and user data
  const [page, setPage] = useState(0); // Current page in pagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page
  const [users, setUsers] = useState([]); // List of users

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    getAllUsers();
  }, []);

  // Function to fetch all users
  const getAllUsers = async () => {
    const data = await getUsers();
    setUsers(data.users); // Update state with fetched users
  };

  // Function to block a user
  const blockUser = async (id) => {
    const data = await adminBlockUser(id);
    if (data.success) {
      toast.success("User has been blocked successfully");
    }
    getAllUsers(); // Refresh the user list after blocking
  };

  // Function to unblock a user
  const unblockUser = async (id) => {
    const data = await adminUnblockUser(id);
    if (data.success) {
      toast.success("User has been unblocked successfully");
    }
    getAllUsers(); // Refresh the user list after unblocking
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    const data = await adminDeleteUser(id);
    if (data.success) {
      toast.success("User has been deleted successfully");
    }
    getAllUsers(); // Refresh the user list after deletion
  };

  return (
    <>
      {/* Grid container for layout */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ height: "auto" }}>
            <CardContent>
              {/* Title of the Manage Users section */}
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "black" }}
              >
                Manage Users
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                {/* Table for displaying user data */}
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {/* Table headers */}
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Date Of Birth</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Map through the users and display them in rows */}
                      {users
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.gender}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.phone}</TableCell>
                              <TableCell>{user.city}</TableCell>
                              <TableCell>
                                {moment(user.dob).format("MMMM DD, YYYY")}
                              </TableCell>
                              <TableCell>
                                {user.isActive ? "Active" : "Blocked"}
                              </TableCell>
                              <TableCell>
                                {/* Display action buttons based on user status */}
                                {user.isActive ? (
                                  <Button onClick={() => blockUser(user._id)}>
                                    Block
                                  </Button>
                                ) : (
                                  <Button onClick={() => unblockUser(user._id)}>
                                    Unblock
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Pagination controls */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
                  component="div"
                  count={users.length}
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
    </>
  );
}

export default ManageUsers; // Exporting the component
