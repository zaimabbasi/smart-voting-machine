import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Error = ({ message }) => {
    return (
        <Box mt={3} textAlign="center">
            <Container>
                <Typography variant="h5">{message}</Typography>
            </Container>
        </Box>
    );
};

export default Error;
