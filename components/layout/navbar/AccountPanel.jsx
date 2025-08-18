"use client";

import Link from "next/link";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import DesignServicesIcon from "@mui/icons-material/DesignServices";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ChairIcon from "@mui/icons-material/Chair";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AccountPanel({ onClose, onLogout }) {
  return (
    <Box sx={{ pt: 0 }}>
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: ".06em",
            }}
          >
            Dashboard
          </ListSubheader>
        }
      >
        {[
          { href: "/dashboard/design", label: "Design", icon: <DesignServicesIcon /> },
          { href: "/dashboard/project", label: "Project", icon: <WorkspacesIcon /> },
          { href: "/dashboard/furniture", label: "Showroom", icon: <ChairIcon /> },
          { href: "/dashboard/news", label: "News", icon: <NewspaperIcon /> },
          { href: "/dashboard/contact", label: "Contact", icon: <ContactMailIcon /> },
        ].map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} href={item.href} onClick={onClose}>
              <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={(t) => ({ my: 1, borderColor: alpha(t.palette.divider, 0.6) })} />

        <ListItem disablePadding>
          <ListItemButton component={Link} href="/profile" onClick={onClose}>
            <ListItemIcon sx={{ color: "primary.main" }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => { onClose?.(); onLogout?.(); }}>
            <ListItemIcon sx={{ color: "primary.main" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
