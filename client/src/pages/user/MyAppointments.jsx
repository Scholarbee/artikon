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
import { useEffect, useState } from "react";
import { getMyAppointments, getMyOrders } from "../../redux/posts/postActions";
import moment from "moment";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

function MyAppointments() {
  useRedirectLoggedOutUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myAppointments, setMyAppointments] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    const { data } = await getMyAppointments();
    console.log(data);
    setMyAppointments(data.appointments);
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
                        <TableCell>Booked By</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Date Booked</TableCell>
                        <TableCell>Service Title</TableCell>
                        <TableCell>Booked Date</TableCell>
                        <TableCell>Status</TableCell>
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
                              <TableCell>{appointment.bookedBy.name}</TableCell>
                              <TableCell>{appointment.phone}</TableCell>
                              <TableCell>{appointment.address}</TableCell>
                              <TableCell>
                                {moment(appointment.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell>
                              <TableCell>{appointment.postTitle}</TableCell>
                              <TableCell>
                                {moment(appointment.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell>
                              <TableCell>Pending</TableCell>
                              <TableCell>
                                <Button>Approve</Button>
                                <Button>Decline</Button>
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
      </Grid>
    </>
  );
}

export default MyAppointments;
