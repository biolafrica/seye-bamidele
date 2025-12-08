"use client"

import { useNewsletter } from "@/hooks/useApi"
import { useEffect } from "react";

export default function AuthPage() {
   useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/track/open?nid=ed1efe13-05c2-4797-866a-2da38ade9e7c&sid=91d136b1-e200-4088-a5fd-38a576058ecc');
      const result = await res.json();
      console.log('Fetched analytics:', result);
      if (result.success) {
        console.log(result);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      console.log(false);
    }
  };
  return(
    <>
      <h4>Hello</h4>

    </>
  )
}