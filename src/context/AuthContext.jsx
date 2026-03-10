import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Restore user from localStorage on first load
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
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}