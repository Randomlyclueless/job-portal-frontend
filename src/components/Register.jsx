import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await api.post("/register", {
        username,
        password,
      });

      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight={600}
          gutterBottom
        >
          Register
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ marginBottom: 2 }}
          >
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            sx={{ marginBottom: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
          >
            Register
          </Button>
        </form>

        <Button
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() =>
            navigate("/login")
          }
        >
          Already have an account? Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;