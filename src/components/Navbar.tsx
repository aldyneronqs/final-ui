import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import { Home, Favorite, Person, AddBox } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleAddPostClick = () => {
    navigate('/create'); // Match the route defined in App.js
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient background
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow
        zIndex: 1300, // Ensure it's above other content
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          SocApp
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton component={Link} to="/" color="inherit">
            <Home fontSize="medium" />
          </IconButton>
          <IconButton 
            color="inherit" 
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover effect
              },
            }}
            onClick={handleAddPostClick} // Trigger the navigation to CreatePost
          >
            <AddBox fontSize="medium" />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Favorite fontSize="medium" />
            </Badge>
          </IconButton>
          <IconButton component={Link} to="/profile" color="inherit">
            <Person fontSize="medium" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
