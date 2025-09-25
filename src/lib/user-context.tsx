'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 用户信息类型
export interface UserInfo {
  username: string
  jobTitle: string
}

// 用户上下文类型
interface UserContextType {
  userInfo: UserInfo | null
  isLoggedIn: boolean
  setUserInfo: (info: UserInfo) => void
  logout: () => void
}

// 创建用户上下文
const UserContext = createContext<UserContextType | undefined>(undefined)

// 用户上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // 在组件挂载时从 localStorage 加载用户信息
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo)
      setUserInfoState(parsedUserInfo)
      setIsLoggedIn(true)
    }
  }, [])

  // 设置用户信息并保存到 localStorage
  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info)
    localStorage.setItem('userInfo', JSON.stringify(info))
    setIsLoggedIn(true)
  }

  // 登出用户
  const logout = () => {
    setUserInfoState(null)
    localStorage.removeItem('userInfo')
    setIsLoggedIn(false)
  }

  return (
    <UserContext.Provider value={{ userInfo, isLoggedIn, setUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// 使用用户上下文的钩子
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}