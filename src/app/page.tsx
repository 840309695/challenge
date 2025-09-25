'use client'

import { Box, Container, Heading, Text, Button, VStack, Flex } from '@chakra-ui/react'
import { useUser } from '../lib/user-context'
import AuthGuard from '../components/AuthGuard'
import LoginBlock from '../components/LoginBlock'
import Link from 'next/link'

export default function Home() {
  const { isLoggedIn, userInfo } = useUser()

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            欢迎来到 挑战项目
          </Heading>
       
        </Box>

        <AuthGuard>
          <Box textAlign="center" mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              欢迎回来，{userInfo?.username}
            </Heading>
            <Text fontSize="md" mb={6}>
              您现在可以访问所有功能和数据
            </Text>
            <Link href="/information" passHref>
              <Button colorScheme="blue" size="lg">
                查看
              </Button>
            </Link>
          </Box>
        </AuthGuard>
      </VStack>
    </Container>
  )
}
