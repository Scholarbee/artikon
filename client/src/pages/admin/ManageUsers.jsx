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

function ManageUsers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getAllUsers();
    //   getOrders();
  }, []);

  const getAllUsers = async () => {
    const data = await getUsers();
    // console.log(data);
    setUsers(data.users);
  };

  const blockUser = async (id) => {
    const data = await adminBlockUser(id);
    if (data.success) {
      toast.success("User has been blocked successfully");
    }
    // console.log(data);
    getAllUsers();
  };
  const unblockUser = async (id) => {
    const data = await adminUnblockUser(id);
    if (data.success) {
      toast.success("User has been unblocked successfully");
    }
    // console.log(data);
    getAllUsers();
  };
  const deleteUser = async (id) => {
    const data = await adminDeleteUser(id);
    if (data.success) {
      toast.success("User has been deleted successfully");
    }

    // console.log(data);
    getAllUsers();
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ height: "auto" }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "black" }}
              >
                Manage Users
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
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

export default ManageUsers;
