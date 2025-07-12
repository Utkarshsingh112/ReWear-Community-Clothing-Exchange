// Simple authentication utilities using localStorage
export const AUTH_KEY = "rewear_auth"
export const USERS_KEY = "rewear_users"

export function getCurrentUser() {
  if (typeof window === "undefined") return null

  const authData = localStorage.getItem(AUTH_KEY)
  if (!authData) return null

  try {
    return JSON.parse(authData)
  } catch {
    return null
  }
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_KEY)
}

export function getUsers() {
  if (typeof window === "undefined") return []

  const users = localStorage.getItem(USERS_KEY)
  if (!users) return []

  try {
    return JSON.parse(users)
  } catch {
    return []
  }
}

export function saveUser(user) {
  if (typeof window === "undefined") return

  const users = getUsers()
  const existingUserIndex = users.findIndex((u) => u.email === user.email)

  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user
  } else {
    users.push(user)
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function authenticateUser(email, password) {
  const users = getUsers()
  return users.find((user) => user.email === email && user.password === password)
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}
