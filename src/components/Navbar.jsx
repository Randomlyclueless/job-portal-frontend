import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const NAVY = "#0F2540";
const ACCENT = "#3DDC97"; // signature accent: signal-green, evokes "open position / go"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guest, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? "#fff" : "rgba(255,255,255,0.72)",
    fontWeight: isActive(path) ? 700 : 500,
    textTransform: "none",
    fontSize: "0.95rem",
    borderRadius: "10px",
    px: 1.75,
    py: 0.75,
    position: "relative",
    "&:hover": {
      color: "#fff",
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 2,
      height: "2px",
      borderRadius: "2px",
      backgroundColor: ACCENT,
      transform: isActive(path) ? "scaleX(1)" : "scaleX(0)",
      transition: "transform 0.2s ease",
    },
  });

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(180deg, ${NAVY} 0%, #163257 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ display: "flex", gap: 1.5, minHeight: 68, px: { xs: 2, md: 4 } }}>
        {/* Brand */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              background: `linear-gradient(135deg, ${ACCENT} 0%, #2BB683 100%)`,
              boxShadow: `0 2px 10px ${ACCENT}55`,
            }}
          >
            <WorkRoundedIcon sx={{ color: NAVY, fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "white",
              lineHeight: 1,
            }}
          >
            Job Portal
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 1 }}>
            <Button component={Link} to="/" disableRipple sx={navLinkStyle("/")}>
              Home
            </Button>

            {user && (
              <Button
                component={Link}
                to="/create"
                disableRipple
                startIcon={<AddCircleRoundedIcon sx={{ fontSize: 18 }} />}
                sx={navLinkStyle("/create")}
              >
                Add Job
              </Button>
            )}

            <Button
              startIcon={<MailOutlineRoundedIcon sx={{ fontSize: 18 }} />}
              href="https://telusko.com/"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              sx={navLinkStyle("__contact")}
            >
              Contact Us
            </Button>
          </Box>
        )}

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "rgba(255,255,255,0.12)", my: 1.5, display: { xs: "none", md: "block" } }}
        />

        {/* User / guest identity */}
        {user && (
          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              borderRadius: "999px",
              pl: 0.5,
              pr: 1.5,
              py: 0.5,
              transition: "background-color 0.15s ease",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: "0.8rem",
                fontWeight: 700,
                bgcolor: ACCENT,
                color: NAVY,
              }}
            >
              {initials}
            </Avatar>
            {!isMobile && (
              <Typography sx={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>
                {user.username}
              </Typography>
            )}
          </Box>
        )}

        {guest && (
          <Chip
            label="Guest"
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "white",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          />
        )}

        {(user || guest) && !isMobile && (
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutRoundedIcon sx={{ fontSize: 17 }} />}
            sx={{
              ml: 1,
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              "&:hover": {
                borderColor: ACCENT,
                backgroundColor: "rgba(61,220,151,0.1)",
              },
            }}
          >
            Logout
          </Button>
        )}

        {isMobile && (
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ color: "white" }}
          >
            <MenuRoundedIcon />
          </IconButton>
        )}

        {/* Combined menu: user account actions + mobile nav */}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: "12px",
              backgroundColor: NAVY,
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        >
          {isMobile && [
            <MenuItem
              key="home"
              component={Link}
              to="/"
              onClick={() => setAnchorEl(null)}
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
            >
              Home
            </MenuItem>,
            user && (
              <MenuItem
                key="add"
                component={Link}
                to="/create"
                onClick={() => setAnchorEl(null)}
                sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
              >
                Add Job
              </MenuItem>
            ),
            <MenuItem
              key="contact"
              component="a"
              href="https://telusko.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setAnchorEl(null)}
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}
            >
              Contact Us
            </MenuItem>,
            (user || guest) && (
              <Divider key="div" sx={{ borderColor: "rgba(255,255,255,0.1)", my: 0.5 }} />
            ),
          ]}

          {(user || guest) && (
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "#ff8a80",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(255,138,128,0.1)" },
              }}
            >
              <LogoutRoundedIcon sx={{ fontSize: 18, mr: 1 }} />
              Logout
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;