'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from '@chakra-ui/react'
import { useUser } from '../lib/user-context'

const LoginBlock = () => {
  const { setUserInfo, userInfo, isLoggedIn, logout } = useUser()
  const [username, setUsername] = useState(userInfo?.username || '')
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || '')
  const [isEditing, setIsEditing] = useState(!isLoggedIn)
  const toast = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim() || !jobTitle.trim()) {
      toast({
        title: '请填写所有字段',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setUserInfo({ username, jobTitle })
    setIsEditing(false)
    
    toast({
      title: isLoggedIn ? '信息已更新' : '登录成功',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.md" py={10}>
      <Card>
        <CardHeader>
          <Heading size="lg" textAlign="center">
            {isLoggedIn && !isEditing ? '用户信息' : '请登录'}
          </Heading>
        </CardHeader>
        <CardBody>
          {isLoggedIn && !isEditing ? (
            <VStack spacing={4} align="stretch">
              <Box p={4} borderWidth="1px" borderRadius="md">
                <Text fontWeight="bold">用户名:</Text>
                <Text>{userInfo?.username}</Text>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="md">
                <Text fontWeight="bold">职位:</Text>
                <Text>{userInfo?.jobTitle}</Text>
              </Box>
            </VStack>
          ) : (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>用户名</FormLabel>
                  <Input 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="请输入用户名"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>职位</FormLabel>
                  <Input 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                    placeholder="请输入职位"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  {isLoggedIn ? '更新信息' : '登录'}
                </Button>
              </VStack>
            </form>
          )}
        </CardBody>
        <CardFooter justifyContent="center">
          {isLoggedIn && !isEditing && (
            <Button onClick={() => setIsEditing(true)} colorScheme="blue" variant="outline">
              编辑信息
            </Button>
          )}
        </CardFooter>
      </Card>
    </Container>
  )
}

export default LoginBlock