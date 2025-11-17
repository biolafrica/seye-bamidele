import { NextResponse } from 'next/server'

export const handleError = (error: any) => {
  console.error('API Error:', error)
  
  if (error?.code === 'PGRST116') {
    return NextResponse.json(
      { error: 'Record not found' },
      { status: 404 }
    )
  }
  
  if (error?.code === '23505') {
    return NextResponse.json(
      { error: 'Duplicate entry. This record already exists.' },
      { status: 409 }
    )
  }
  
  if (error?.code === '23503') {
    return NextResponse.json(
      { error: 'Foreign key constraint violation' },
      { status: 400 }
    )
  }
  
  return NextResponse.json(
    { error: error?.message || 'Internal server error' },
    { status: 500 }
  )
}

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