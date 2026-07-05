import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Fade,
} from "@mui/material";

import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const PRIMARY = "#1976d2";     // Professional Blue
const DARK = "#0f172a";        // Deep Slate
const GRAY = "#64748b";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const currId = location.state?.id;

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

  useEffect(() => {
    const fetchInitialPost = async () => {
      if (!currId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/jobPost/${currId}`,
          authConfig
        );
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPost();
  }, [currId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put("http://localhost:8080/jobPost", form, authConfig);
      navigate("/");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (name) => {
    setForm((prev) => {
      const hasSkill = prev.postTechStack?.includes(name);
      return {
        ...prev,
        postTechStack: hasSkill
          ? prev.postTechStack.filter((s) => s !== name)
          : [...(prev.postTechStack || []), name],
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: PRIMARY }} size={60} />
        <Typography color="text.secondary">Loading job post...</Typography>
      </Box>
    );
  }

  return (
    <Fade in timeout={400}>
      <Box sx={{ maxWidth: 700, mx: "auto", my: { xs: 3, md: 6 }, px: 2 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
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
              JOB POST #{form.postId || "NEW"}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 700,
                mt: 0.5,
              }}
            >
              Edit Job Posting
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
                placeholder="Describe the role, responsibilities, and requirements..."
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

              {/* Skills */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: DARK, mb: 1 }}
                >
                  Required Skills
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Click on skills to select or deselect
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1.2}>
                  {skillSet.map((name) => {
                    const selected = form.postTechStack?.includes(name);
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
                          backgroundColor: selected
                            ? "#eff6ff"
                            : "transparent",
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

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveRoundedIcon />
                  )
                }
                sx={{
                  mt: 2,
                  py: 1.7,
                  borderRadius: "12px",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: PRIMARY,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                    boxShadow: "none",
                  },
                }}
              >
                {saving ? "Updating..." : "Update Job Post"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Edit;