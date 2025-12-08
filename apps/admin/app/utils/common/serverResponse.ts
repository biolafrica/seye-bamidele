import { NextResponse } from 'next/server'

export function normalizeError(err: any) {
  return {
    code: err.code || null,
    message: err.message || "Unknown error",
    details: err.details,
  };
}

export const handleError = (err: any) => {
  console.error('API Error:', err)

  const { code, message } = normalizeError(err);

  switch (code) {
    case "PGRST116":
      return NextResponse.json({ error: "Record not found" }, { status: 404 });

    case "23505":
      return NextResponse.json({ error: "Duplicate entry" }, { status: 409 });

    case "23503":
      return NextResponse.json({ error: "Foreign key constraint violation" }, { status: 400 });
  }

  return NextResponse.json({ error: message }, { status: 500 });
};


export const successResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status })
}


export const validateRequired = (data: any, requiredFields: string[]) => {
  const missing = requiredFields.filter(field => !data[field])
  
  if (missing.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missing.join(', ')}`
    }
  }
  
  return { isValid: true }
}