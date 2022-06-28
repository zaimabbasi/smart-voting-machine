import React from "react";
import { AppBar, Button, Box, Toolbar, Typography } from "@mui/material";

const Navbar = ({ account, handleConnectWallet }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Smart Voting
                    </Typography>
                    {account ? (
                        <Typography variant="body1">{account}</Typography>
                    ) : (
                        <Button onClick={handleConnectWallet} color="inherit">
                            Connect Wallet
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
