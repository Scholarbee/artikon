// Importing necessary components from Material UI
import { Box, CircularProgress } from "@mui/material";

// Loader component to show a loading spinner centered in a container
const Loader = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%", 
          minHeight: "500px", // Minimum height of the container
          display: "flex", // Use flexbox for layout
          justifyContent: "center", // Center content horizontally
          alignItems: "center", // Center content vertically
        }}
      >
        <CircularProgress /> {/* Loading spinner */}
      </Box>
    </>
  );
};

export default Loader; // Exporting Loader component as default