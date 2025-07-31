// components/layout/MobileUserSubMenu.jsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const MobileUserSubMenu = ({ handleLogout, setIsMobileMenuOpen }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const menuItems = [
    { label: "Design", href: "/dashboard/design" },
    { label: "Contact", href: "/dashboard/contact" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        onClick={() => setShowSubMenu(!showSubMenu)}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          textTransform: 'none',
          color: 'inherit',
          py: 1,
          '&:hover': { bgcolor: 'action.hover' },
        }}
        endIcon={showSubMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        Account
      </Button>

      <AnimatePresence>
        {showSubMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{ pl: 2, display: 'flex', flexDirection: 'column', py: 1, gap: 0.5 }}>
              {menuItems.map(item => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: 'inherit',
                    py: 0.5,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  color: 'inherit',
                  py: 0.5,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                Logout
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default MobileUserSubMenu;