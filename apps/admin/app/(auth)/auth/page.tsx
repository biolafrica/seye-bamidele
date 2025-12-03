"use client"

import { createClient } from "@/app/utils/supabase/client"
import {useEffect } from "react"

export default function AuthPage() {
  const supabase = createClient();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (user) {
        console.log("user authenticated", user)
      }else{
        console.log("no user", error)
      }
    }
    checkAuth()
  } , [])

  return(
    <>
      <h4>Hello</h4>

    </>
  )
}