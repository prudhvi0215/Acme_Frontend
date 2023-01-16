import React from "react";
import { Box, Typography } from "@mui/material";

const UnAuthorized = () => {
  return (
    <Box
      m="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "13vh",
          textAlign: "center",
          rotate: "-10deg",
          border: "1px solid white",
          width: "100%",
        }}
      >
        401 UNAUTHORIZED
      </Typography>
    </Box>
  );
};

export default UnAuthorized;
