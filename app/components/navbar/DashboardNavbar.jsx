import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

/**
 * DashboardNavbar Component
 * @param {Object[]} menuItems - Array of menu items { segment, title, icon }
 * @param {string} title - Title of the dashboard (e.g., "MUI")
 * @param {string} logo - URL of the logo image
 */
const DashboardNavbar = ({ menuItems, title, logo }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`/${path}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        {logo && (
          <Box component="img" src={logo} alt={`${title} logo`} sx={{ height: 40, mr: 2 }} />
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <List sx={{ display: 'flex', flexDirection: 'row', p: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.segment}
              button
              onClick={() => handleNavigation(item.segment)}
              sx={{ width: 'auto', color: 'inherit' }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      segment: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string,
};

export default DashboardNavbar;
