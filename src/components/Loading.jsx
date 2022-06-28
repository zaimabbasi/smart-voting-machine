import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Box
            mt={3}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loading;
