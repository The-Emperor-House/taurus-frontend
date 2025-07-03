"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext"; // Import useAuth

export default function UserProfileCard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth(); // ใช้ logout จาก context

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");

      if (!token) {
        console.warn("No token found, logging out");
        logout();
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log("Response status:", res.status); // ✅ Debug

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const responseData = await res.json();
        setUser(responseData.user);

      } catch (error) {
        console.error("Error fetching user data:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [logout]);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p>Loading Profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Could not load user profile.</p>
      </div>
    );
  }

  // --- JSX ที่คุณออกแบบไว้ ---
  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
      <div className="text-center">
        <p className="text-sm font-medium text-[#cc8f2a]">WELCOME BACK</p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
          User Dashboard
        </h1>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-gradient-to-br from-[#cc8f2a] to-[#e0a040] rounded-full flex items-center justify-center shadow-md">
          <span className="text-4xl font-bold text-white">
            {user.email ? user.email.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {user.username || "User"}
          </h2>
          <p className="text-md text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">User ID:</span>
          <span className="px-3 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-700 rounded-full">
            {user.userId}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Account Status:
          </span>
          <span className="px-3 py-1 text-xs font-bold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full uppercase">
            Active
          </span>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}