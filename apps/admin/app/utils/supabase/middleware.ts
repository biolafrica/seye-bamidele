import { cacheHeaders, getCacheHeaders } from '@seye-bamidele/config'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001',  
  ]

  const isPreflight = request.method === 'OPTIONS'
  const isApiRoute = request.nextUrl.pathname.startsWith("/api")
  const url = request.nextUrl.clone()
  const isPublic = request.method === "GET" && (url.pathname.startsWith("/api/articles") || url.pathname.startsWith("/api/events"));


  if (isPreflight) {
    const preflightHeaders: Record<string, string> = {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
      'Access-Control-Max-Age': '86400',
      ...getCacheHeaders("noStore")
    }

    if (origin && allowedOrigins.includes(origin)) {
      preflightHeaders['Access-Control-Allow-Origin'] = origin
    }

    return new NextResponse(null, { status: 200, headers: preflightHeaders })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value }) => supabaseResponse.cookies.set(name, value))
        },
      },
    }
  )


  if (isApiRoute && origin && allowedOrigins.includes(origin)) {
    supabaseResponse.headers.set('Access-Control-Allow-Origin', origin)
    supabaseResponse.headers.set('Access-Control-Allow-Credentials', 'true')
    supabaseResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    supabaseResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept')
    
    return supabaseResponse
  }

  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    !isApiRoute
  ) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (origin && allowedOrigins.includes(origin)) {
    supabaseResponse.headers.set('Access-Control-Allow-Origin', origin)
    supabaseResponse.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  if (isPublic) {
    Object.entries(cacheHeaders.apiMedium).forEach(([k, v]) =>
      supabaseResponse.headers.set(k, v)
    );
  } else {
    Object.entries(cacheHeaders.noStore).forEach(([k, v]) =>
      supabaseResponse.headers.set(k, v)
    );
  }

 
  return supabaseResponse
}