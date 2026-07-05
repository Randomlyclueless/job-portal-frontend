import React from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, guest, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Job Portal
          </Typography>

          <Box>
            {user && (
              <Typography
                component="span"
                sx={{ marginRight: 2 }}
              >
                {user.username}
              </Typography>
            )}

            {guest && (
              <Typography
                component="span"
                sx={{ marginRight: 2 }}
              >
                Guest
              </Typography>
            )}

            {(user || guest) && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;