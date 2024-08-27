import {
  Box,
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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyAppointments, getMyBookedAppointments, getMyOrders, getMyPlacedOrders } from "../../redux/posts/postActions";
import moment from "moment";

function BooksAndOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myAppointments, setMyAppointments] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getAppointments();
    getOrders();
  }, []);

  const getAppointments = async () => {
    const { data } = await getMyBookedAppointments();
    console.log(data);
    setMyAppointments(data.appointments);
  };

  const getOrders = async () => {
    const { data } = await getMyPlacedOrders();
    console.log(data);
    setMyOrders(data.orders);
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
                My Appointments
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Post Ref</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Posted By</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Service Charge</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Appointment Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myAppointments
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((appointment, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{appointment.postId}</TableCell>
                              <TableCell>{appointment.postTitle}</TableCell>
                              <TableCell>{appointment.postedBy.name}</TableCell>
                              <TableCell>{appointment.postedBy.phone}</TableCell>
                              <TableCell>{12}</TableCell>
                              <TableCell>
                                {moment(appointment.appointmentDate).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell>
                              <TableCell>{appointment.status}</TableCell>
                              {/* <TableCell>
                                {moment(appointment.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell> */}
                              <TableCell>Buttons</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
                  component="div"
                  count={myAppointments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ height: "auto" }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "black" }}
              >
                My Orders
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Post Ref</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Posted By</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantities</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myOrders
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((order, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{order.postId}</TableCell>
                              <TableCell>{order.postTitle}</TableCell>
                              <TableCell>{order.postedBy.name}</TableCell>
                              <TableCell>{order.postedBy.phone}</TableCell>
                              <TableCell>{12}</TableCell>
                              <TableCell>{order.quantity}</TableCell>
                              <TableCell>
                                {moment(order.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell>
                              {/* <TableCell>{order.postTitle}</TableCell>
                              <TableCell>{order.quantity}</TableCell> */}
                              <TableCell>Buttons</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
                  component="div"
                  count={myOrders.length}
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

export default BooksAndOrders;
