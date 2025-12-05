"use client"

import { useArticles, useEvents } from "@/hooks/useApi"
import { useEffect } from "react";

export default function AuthPage() {
  const {data, getAll,} = useArticles();
  useEffect(() => {getAll()}, []);
  console.log(data)

  return(
    <>
      <h4>Hello</h4>

    </>
  )
}