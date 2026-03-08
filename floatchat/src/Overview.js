import { Box, Typography, Grid, Stack, Paper } from '@mui/material';
import { FaMapMarkerAlt, FaChartLine, FaWater } from 'react-icons/fa';

export default function Overview() {
  // Static demo values; replace later with live data as needed
  const totalArgoFloats = 542;  // Total floats ever deployed by India
  const activeFloats = 75;     // Currently active
  const totalProfiles = 135500;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#eef6fd', py: 7, px: 5 }}>
      {/* Ocean wave SVG for background */}
      <Box
        sx={{
          position: "absolute", top: 0, left: 0, width: "100%", height: 180, zIndex: 0, opacity: 0.4,
        }}
      >
        <svg viewBox="0 0 1440 320" style={{ width: "100%", height: "100%" }}>
          <path fill="#b2dffb" fillOpacity="1" d="M0,96L80,101.3C160,107,320,117,480,133.3C640,149,800,171,960,154.7C1120,139,1280,85,1360,58.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </Box>

      {/* Heading and description */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h3" fontWeight="bold" color="#1c4673" gutterBottom>
          Explore Ocean Data with AI
        </Typography>
        <Typography variant="h6" color="#18517f" gutterBottom>
          Ask natural language questions about ARGO float data, visualize ocean patterns, and discover insights from Indian oceanographic measurements.
        </Typography>
      </Box>

      {/* Summary Cards (top row) */}
      <Grid container spacing={4} sx={{ mt: 5, mb: 5, position: 'relative', zIndex: 2 }} justifyContent="flex-start">
        <Grid item>
          <Paper sx={{
            minWidth: 150, px: 4, py: 3, bgcolor: "#f5fbff", boxShadow: 3, borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <Box color="#2196f3" sx={{ fontSize: 32, mb: 1 }}><FaMapMarkerAlt /></Box>
            <Typography variant="subtitle2" sx={{ color: "#2186ae" }}>Active Floats</Typography>
            <Typography variant="h4" fontWeight="bold" color="#1c4673">{activeFloats}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper sx={{
            minWidth: 150, px: 4, py: 3, bgcolor: "#f5fbff", boxShadow: 3, borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <Box color="#2196f3" sx={{ fontSize: 32, mb: 1 }}><FaChartLine /></Box>
            <Typography variant="subtitle2" sx={{ color: "#2186ae" }}>Total Profiles</Typography>
            <Typography variant="h4" fontWeight="bold" color="#1c4673">{totalProfiles.toLocaleString()}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Stats Cards (no AI Conversations card) */}
      <Stack direction="row" spacing={3} sx={{
        justifyContent: "flex-start",
        position: 'relative', zIndex: 2
      }}>
        <Paper sx={{
          minWidth: 175, px: 3, py: 2, display: "flex", flexDirection: "column", alignItems: "center",
          bgcolor: "#e3eefa", borderRadius: 3, boxShadow: 2
        }}>
          <Typography sx={{ color: "#369aac" }}>Total ARGO Floats</Typography>
          <Box color="#2292a6" sx={{ fontSize: 26, my: 0.5 }}><FaWater /></Box>
          <Typography variant="h5" fontWeight="bold" color="#1c4673">{totalArgoFloats}</Typography>
        </Paper>
        <Paper sx={{
          minWidth: 175, px: 3, py: 2, display: "flex", flexDirection: "column", alignItems: "center",
          bgcolor: "#f5fbff", borderRadius: 3, boxShadow: 2
        }}>
          <Typography sx={{ color: "#369aac" }}>Active Floats</Typography>
          <Box color="#2292a6" sx={{ fontSize: 26, my: 0.5 }}><FaMapMarkerAlt /></Box>
          <Typography variant="h5" fontWeight="bold" color="#1c4673">{activeFloats}</Typography>
        </Paper>
        <Paper sx={{
          minWidth: 175, px: 3, py: 2, display: "flex", flexDirection: "column", alignItems: "center",
          bgcolor: "#e3eefa", borderRadius: 3, boxShadow: 2
        }}>
          <Typography sx={{ color: "#369aac" }}>Ocean Profiles</Typography>
          <Box color="#2292a6" sx={{ fontSize: 26, my: 0.5 }}><FaChartLine /></Box>
          <Typography variant="h5" fontWeight="bold" color="#1c4673">{totalProfiles.toLocaleString()}</Typography>
        </Paper>
      </Stack>

      {/* Decorative ocean bubbles */}
      <Box sx={{
        position: 'absolute',
        bottom: 40, left: 80,
        zIndex: 1
      }}>
        <svg width="170" height="85">
          <circle cx="20" cy="20" r="10" fill="#b2dffb" opacity="0.6" />
          <circle cx="80" cy="50" r="6" fill="#d9f2fb" opacity="0.6" />
          <circle cx="140" cy="30" r="8" fill="#b2dffb" opacity="0.32" />
          <circle cx="70" cy="20" r="5" fill="#90cbe9" opacity="0.10" />
        </svg>
      </Box>
    </Box>
  );
}
