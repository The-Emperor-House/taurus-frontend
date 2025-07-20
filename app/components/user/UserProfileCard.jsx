"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import {
  Box,
  Typography,
  Card,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import EditProfileDialog from "./EditProfileDialog";

export default function UserProfileCard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const isLoading =
    status === "loading" || (status === "authenticated" && !user);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${session.backendToken}`,
          },
        });

        if (res.status === 401) {
          console.warn("⚠️ Token expired or unauthorized, signing out...");
          signOut(); // force logout
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ User data fetched:", data);

        if (!data?.data?.user) {
          throw new Error("No user data received");
        }

        setUser(data.data.user);
      } catch (err) {
        console.error("🔥 Fetch user error:", err);
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      }
    };

    fetchUserData();
  }, [session, status]);

  if (isLoading) {
    return (
      <StyledCard>
        <CircularProgress sx={{ color: "#cc8f2a" }} size={48} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Loading Profile...
        </Typography>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <Avatar
        sx={{
          width: 72,
          height: 72,
          bgcolor: "primary.main",
          fontSize: "2rem",
        }}
      >
        <PersonIcon fontSize="inherit" />
      </Avatar>

      <Typography
        variant="h5"
        sx={{ mt: 2, fontWeight: 700, color: "text.primary" }}
      >
        {user.name || "ผู้ใช้ไม่ระบุ"}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        {user.email || "อีเมลไม่ระบุ"}
      </Typography>

      <Divider sx={{ my: 3, width: "100%" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          width: "100%",
        }}
      >
        <InfoItem
          label="📅 วันที่สมัครสมาชิก"
          value={formatDate(user.createdAt)}
        />
        <InfoItem
          label="🛠️ วันที่แก้ไขล่าสุด"
          value={formatDateTime(user.updatedAt)}
        />
      </Box>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#cc8f2a",
            "&:hover": { backgroundColor: "#e0a040" },
            fontWeight: 600,
          }}
          onClick={() => setIsEditDialogOpen(true)}
        >
          แก้ไขโปรไฟล์
        </Button>
      </Box>

      <EditProfileDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        user={user}
        token={session.backendToken}
        onUpdated={(updatedUser) => setUser(updatedUser)}
      />
    </StyledCard>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {label}:
      </Typography>
      <Box
        sx={{
          px: 2,
          py: 0.5,
          fontSize: "0.85rem",
          fontFamily: "monospace",
          bgcolor: "grey.100",
          borderRadius: "9999px",
          minWidth: 100,
          textAlign: "center",
        }}
      >
        {value}
      </Box>
    </Box>
  );
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatDateTime(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 512,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
