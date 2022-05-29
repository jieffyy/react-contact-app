import { createContext, ReactNode, useContext, useState } from 'react'

interface IAuthContext {
  username: string | null
  token: string | null
  setUsername: any
  setToken: any
}
const AuthContext = createContext<IAuthContext | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = (
  props: AuthProviderProps
) => {
  const [username, setUsername] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  return (
    <AuthContext.Provider value={{ username, setUsername, token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Improper configuration for AuthContext')
  }
  return context
}

export { AuthProvider, useAuth }
