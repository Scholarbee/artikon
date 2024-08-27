// Import necessary dependencies from React and Material UI
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { teal } from "@mui/material/colors";

// Define the columns for the table
const columns = [
  { id: "name", label: "Brand Name", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "appointments", label: "Appointment(s)", minWidth: 100 },
  {
    id: "likes",
    label: "Like(s)",
    minWidth: 100,
    align: "right",
  },
  {
    id: "comments",
    label: "Comment(s)",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
  },
];

// Define the PostTable component
export default function PostTable({ myPosts }) {
  const [rows, setRows] = React.useState(myPosts); // Initialize rows state with the provided posts data
  const [page, setPage] = React.useState(0); // Initialize the current page state
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Initialize rows per page state

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* TableContainer wraps the Table and sets a maximum height */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* Render table headers based on the columns array */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: teal[300], // Set the background color to teal
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "large",
                  }}
                >
                  {column.label} {/* Display the label of the column */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over the rows and display each row's data */}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the rows array for pagination
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]; // Get the value for each cell in the row
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value) // Format the value if necessary
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination controls */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]} // Options for rows per page
        component="div"
        count={rows.length} // Total number of rows
        rowsPerPage={rowsPerPage} // Current rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Function to handle page change
        onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
      />
    </Paper>
  );
}
