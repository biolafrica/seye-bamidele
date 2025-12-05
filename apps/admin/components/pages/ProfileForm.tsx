"use client";

import { useEffect, useState } from "react";
import { getUserWithRole } from "@/app/utils/supabase/auth-utils";

interface UserData {
  isAuthenticated: boolean;
  user: any;
  role: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  id: string | null;
}

export default function ProfileFormClient() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUserWithRole();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  const fields = [
    { label: "First Name:", value: user.firstName },
    { label: "Last Name:", value: user.lastName },
    { label: "Email:", value: user.email },
    { label: "Role:", value: user.role },
  ];

  return (
    <div>
      {fields.map((item, i) => (
        <div 
          key={i}
          className={`${i === 0 ? "border-y" :"border-b" } border-border py-5 w-full flex`}
        >
          <span className="font-semibold w-2/6">{item.label}</span>
          <span className="w-4/6">{item.value ?? "-"}</span>
        </div>
      ))}
    </div>
  );
}