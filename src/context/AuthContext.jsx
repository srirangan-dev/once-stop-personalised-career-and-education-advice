import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    
    try {
      const saved = localStorage.getItem('pf_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('pf_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('pf_user')
    localStorage.removeItem('pf_token')
    localStorage.removeItem('token')
  }

  // ✅ NEW: update user fields (e.g. stream) without re-login
  const updateUser = (fields) => {
    const updated = { ...user, ...fields }
    setUser(updated)
    localStorage.setItem('pf_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
