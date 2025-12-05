"use client"

import { useNewsletter } from "@/hooks/useApi"
import { useEffect } from "react";

export default function AuthPage() {
  const {data, getAll,} = useNewsletter();
  useEffect(() => {getAll()}, []);
  console.log(data)

  return(
    <>
      <h4>Hello</h4>

    </>
  )
}