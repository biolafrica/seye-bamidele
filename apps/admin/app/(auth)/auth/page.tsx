"use client"

import Alert from "@/components/common/alert";
import ConfirmBanner from "@/components/common/confirmBanner";
import { useEffect, useState } from "react";

export default function AuthPage() {    
  const [showDialog, setShowDialog] = useState(false);
  const handleDelete=()=>{
    console.log("taye")
  }

  useEffect(()=>{
    setShowDialog(true)
  }, [])

  return(
    <>
      <Alert 
        type="error"
        heading="User created successfully"
        subheading="An email has been sent with login credentials"
        duration={5000}
        onClose={() => console.log('Alert closed')}
      />

      <ConfirmBanner
        open={showDialog}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDialog(false)}
      />

    </>
  )
}