'use client'

import { ReactNode } from 'react'
import { useUser } from '../lib/user-context'
import LoginBlock from './LoginBlock'

interface AuthGuardProps {
  children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn) {
    return <LoginBlock />
  }

  return <>{children}</>
}

export default AuthGuard