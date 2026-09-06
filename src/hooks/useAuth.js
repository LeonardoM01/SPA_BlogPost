import { useState, useEffect } from 'react'
import { http } from '../api'

const createUser = (name, email, password) => ({
  id: Date.now().toString(),
  name,
  email,
  password,
  createdAt: new Date().toISOString()
})

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error)
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const register = async(name, email, password) => {
    try {

      await http.post('auth/register', {
        name,
        email,
        password
      })

      return { success: true, message: 'Usuário registrado com sucesso' }
      
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await http.post('auth/login', {
        email,
        password
      })

      const userData = response.data
      setUser(userData.user)
      localStorage.setItem('auth_user', JSON.stringify(userData.user))
      localStorage.setItem('access_token', userData.access_token)


      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('access_token')
  }

  const isAuthenticated = !!user

  return {
    user,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout
  }
} 