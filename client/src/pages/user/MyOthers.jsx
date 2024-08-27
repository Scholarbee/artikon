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
import { getMyAppointments, getMyOrders } from "../../redux/posts/postActions";
import moment from "moment";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

function MyOrders() {
  useRedirectLoggedOutUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myOrders, setMyOrders] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const { data } = await getMyOrders();
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
                My Orders
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ordered By</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Date Ordered</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Quantities</TableCell>
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
                              <TableCell>{order.orderedBy.name}</TableCell>
                              <TableCell>{order.phone}</TableCell>
                              <TableCell>{order.address}</TableCell>
                              <TableCell>
                                {moment(order.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell>
                              <TableCell>{order.postTitle}</TableCell>
                              <TableCell>{order.quantity}</TableCell>
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

export default MyOrders;
