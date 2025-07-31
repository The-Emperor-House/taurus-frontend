// components/layout/UserDropdownMenu.jsx
'use client';

import Link from "next/link";
import { Menu, MenuItem, ListItemIcon, Divider, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserDropdownMenu = ({
  user,
  fullAvatarUrl,
  firstLetter,
  handleLogout,
  handleMenuClose,
  anchorEl,
  open
}) => {
  const menuItems = [
    { label: "Design", icon: <DashboardIcon fontSize="small" />, href: "/dashboard/design" },
    { label: "Contact", icon: <DashboardIcon fontSize="small" />, href: "/dashboard/contact" },
    { label: "Profile", icon: <AccountCircleIcon fontSize="small" />, href: "/profile" },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 4,
        sx: { mt: 1.5, minWidth: 200 },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Avatar src={fullAvatarUrl} alt={user?.name || "User"} sx={{ width: 32, height: 32, mr: 1 }}>
          {firstLetter}
        </Avatar>
        {user?.name || user?.email}
      </MenuItem>
      <Divider />
      {menuItems.map(item => (
        <MenuItem key={item.href} component={Link} href={item.href} onClick={handleMenuClose}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          {item.label}
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserDropdownMenu;