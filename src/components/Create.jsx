import React, { useState } from "react";
import axios from "axios";

import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Chip,
  Stack,
  Divider,
  InputAdornment,
  Fade,
} from "@mui/material";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { useNavigate } from "react-router-dom";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const PRIMARY = "#1976d2";
const DARK = "#0f172a";
const GRAY = "#64748b";

const Create = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const authConfig = {
    auth: {
      username: "kimaya",
      password: "1234",
    },
  };

  const skillSet = [
    "Javascript", "Java", "Python", "Django", "Rust",
    "React", "Node.js", "Spring Boot", "AWS", "Docker",
    "SQL", "MongoDB", "Kubernetes"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.post("http://localhost:8080/jobPost", form, authConfig);
      navigate("/");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (name) => {
    setForm((prev) => {
      const hasSkill = prev.postTechStack.includes(name);
      return {
        ...prev,
        postTechStack: hasSkill
          ? prev.postTechStack.filter((s) => s !== name)
          : [...prev.postTechStack, name],
      };
    });
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
      "&.Mui-focused fieldset": {
        borderColor: PRIMARY,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: PRIMARY,
    },
  };

  return (
    <Fade in timeout={400}>
      <Box sx={{ maxWidth: 700, mx: "auto", my: { xs: 3, md: 6 }, px: 2 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(194, 76, 76, 0.06)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${DARK} 0%, #1e2937 100%)`,
              px: { xs: 4, md: 6 },
              py: 4,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#94a3b8", fontWeight: 600, letterSpacing: "1px" }}
            >
              NEW JOB POST
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 700,
                mt: 0.5,
              }}
            >
              Create New Posting
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ px: { xs: 4, md: 6 }, py: 5 }}
          >
            <Stack spacing={4}>
              <TextField
                type="number"
                label="Post ID"
                placeholder="Enter unique Post ID"
                required
                fullWidth
                value={form.postId}
                onChange={(e) =>
                  setForm({ ...form, postId: Number(e.target.value) || "" })
                }
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddCircleRoundedIcon sx={{ color: GRAY }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Job Title / Profile"
                placeholder="e.g. Senior Full Stack Developer"
                required
                fullWidth
                value={form.postProfile}
                onChange={(e) =>
                  setForm({ ...form, postProfile: e.target.value })
                }
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkOutlineRoundedIcon sx={{ color: GRAY }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                type="number"
                label="Required Experience (Years)"
                required
                fullWidth
                value={form.reqExperience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reqExperience: Number(e.target.value) || 0,
                  })
                }
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimelineRoundedIcon sx={{ color: GRAY }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Job Description"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                required
                multiline
                rows={5}
                fullWidth
                value={form.postDesc}
                onChange={(e) =>
                  setForm({ ...form, postDesc: e.target.value })
                }
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <DescriptionRoundedIcon sx={{ color: GRAY }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Divider sx={{ borderColor: "#e2e8f0" }} />

              {/* Skills Selection */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: DARK, mb: 1 }}
                >
                  Required Skills
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Click to select the skills required for this role
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1.2}>
                  {skillSet.map((name) => {
                    const selected = form.postTechStack.includes(name);
                    return (
                      <Chip
                        key={name}
                        label={name}
                        clickable
                        onClick={() => toggleSkill(name)}
                        icon={selected ? <CheckRoundedIcon /> : null}
                        sx={{
                          fontWeight: 500,
                          borderRadius: "10px",
                          px: 1.5,
                          py: 2.2,
                          border: selected
                            ? `2px solid ${PRIMARY}`
                            : "1px solid #cbd5e1",
                          backgroundColor: selected ? "#eff6ff" : "transparent",
                          color: selected ? PRIMARY : "inherit",
                          "&:hover": {
                            backgroundColor: selected ? "#dbeafe" : "#f8fafc",
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={saving}
                startIcon={
                  saving ? null : <AddCircleRoundedIcon />
                }
                sx={{
                  mt: 2,
                  py: 1.7,
                  borderRadius: "12px",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: PRIMARY,
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {saving ? "Creating Post..." : "Create Job Post"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Create;