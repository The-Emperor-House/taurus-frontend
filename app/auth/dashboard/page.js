"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth from context
import { useRouter } from "next/navigation";
import UserProfileCard from "../../components/UserProfileCard"; // Import UserProfileCard component

export default function DashboardPage() {
  const { authStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "loading") return;
    if (authStatus !== "authenticated") {
      router.push("/auth/login");
    }
  }, [authStatus, router]);

  if (authStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <UserProfileCard />
    </div>
  );
}