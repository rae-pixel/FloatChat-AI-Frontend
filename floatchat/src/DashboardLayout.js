import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@mui/material';
import { FaChartBar, FaComments } from 'react-icons/fa';

const navItems = [
  { name: 'Overview', path: '/', icon: <FaChartBar /> },
  { name: 'AI Assistant', path: '/ai-assistant', icon: <FaComments /> },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 270, bgcolor: '#f1f7fc', p: 3, boxShadow: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="#155fa0">FLOATCHAT</Typography>
        <Typography variant="subtitle1" sx={{ color: '#155fa0', mt: 1 }}>
          AI-Powered ARGO Float Data Platform (India)
        </Typography>
        <List sx={{ mt: 4 }}>
          {navItems.map(item => (
            <ListItem
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                bgcolor: location.pathname === item.path ? '#e3eefa' : 'transparent',
                borderRadius: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                cursor: 'pointer',
              }}
            >
              <Box sx={{ pr: 2, fontSize: 20 }}>{item.icon}</Box>
              {item.name}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, bgcolor: '#eef6fd', p: 6 }}>
        {children}
      </Box>
    </Box>
  );
}
