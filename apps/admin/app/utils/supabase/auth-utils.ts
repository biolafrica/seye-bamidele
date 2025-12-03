import { createClient } from "./client"

let userCache: {
  user: any
  role: string | null
  timestamp: number
} | null = null
 
const CACHE_DURATION = 5 * 60 * 1000

export async function getAuthUser() {
  const supabase = createClient()

  if (userCache && Date.now() - userCache.timestamp < CACHE_DURATION) {
    return userCache
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      userCache = null
      return null
    }

    const role = user.user_metadata?.role || user.app_metadata?.role || 'subscriber'
    
    userCache = {
      user,
      role,
      timestamp: Date.now()
    }

    return userCache
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function canUserPerform(action: string): Promise<boolean> {
  const authData = await getAuthUser()
  
  if (!authData) return false

  const permissions: Record<string, string[]> = {
    'delete_user': ['admin'],
    'edit_user': ['admin'],
    'create_user': ['admin'],
  }

  const allowedRoles = permissions[action] || []
  return allowedRoles.includes(authData.role || '')
}

export function clearAuthCache() {
  userCache = null
}

export async function getUserWithRole() {
  const authData = await getAuthUser()
  
  if (!authData) {
    return {
      isAuthenticated: false,
      user: null,
      role: null,
      email: null,
      firstName: null,
      lastName: null,
      id: null
    }
  }

  return {
    isAuthenticated: true,
    user: authData.user,
    firstName: authData.user.user_metadata?.first_name || null,
    lastName: authData.user.user_metadata?.last_name || null,
    role: authData.role,
    email: authData.user.email,
    id: authData.user.id
  }
}