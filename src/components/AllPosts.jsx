import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Fade,
  Tooltip,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../api/api";

const AllPosts = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/edit", { state: { id } });
  };

  const handleAddNew = () => {
    navigate("/create"); // Adjust route as per your app
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (query.trim().length > 0) {
          response = await api.get(
            `/jobPosts/keyword/${encodeURIComponent(query.trim())}`
          );
        } else {
          response = await api.get("/jobPosts");
        }

        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load job posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPosts, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job post?")) return;

    try {
      await api.delete(`/jobPost/${id}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.postId !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          px: 3,
          pt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <WorkIcon sx={{ fontSize: 40, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            All Job Posts
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add New Post
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search by keyword, title, or skill..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 3 },
          }}
          sx={{
            maxWidth: "600px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
            },
          }}
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mx: 3, mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Results Count */}
      {!loading && posts.length > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ px: 3, mb: 2 }}
        >
          Showing {posts.length} job post{posts.length > 1 ? "s" : ""}
        </Typography>
      )}

      {/* Posts Grid */}
      <Fade in={!loading}>
        <Grid container spacing={3} sx={{ px: 3, pb: 4 }}>
          {posts.length === 0 && !loading ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  color: "text.secondary",
                }}
              >
                <WorkIcon sx={{ fontSize: 80, opacity: 0.2, mb: 2 }} />
                <Typography variant="h6">No job posts found</Typography>
                <Typography variant="body2">
                  {query
                    ? "Try adjusting your search terms"
                    : "Create your first job post"}
                </Typography>
              </Box>
            </Grid>
          ) : (
            posts.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.postId}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                    },
                    backgroundColor: "#f8fbff",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        lineHeight: 1.3,
                        color: "#1a1a1a",
                      }}
                    >
                      {p.postProfile}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.postDesc}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#1976d2" }}
                      >
                        {p.reqExperience} years exp.
                      </Typography>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Skills
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                      {p.postTechStack?.map((skill, index) => (
                        <Chip
                          key={`${p.postId}-${index}`}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: "#e3f2fd",
                            color: "#1565c0",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      px: 2,
                      pb: 2,
                      pt: 1,
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <Tooltip title="Edit Post">
                      <IconButton
                        onClick={() => handleEdit(p.postId)}
                        color="primary"
                        sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Post">
                      <IconButton
                        onClick={() => handleDelete(p.postId)}
                        color="error"
                        sx={{ "&:hover": { backgroundColor: "#ffebee" } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Fade>
    </>
  );
};

export default AllPosts;