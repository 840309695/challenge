'use client'

import { Box, Container, Heading, Text } from '@chakra-ui/react'
import AuthGuard from '../../components/AuthGuard'
import AnimeTable from '../../components/AnimeTable'

export default function InformationPage() {
  return (
    <AuthGuard>
      <Container maxW="container.xl" py={10}>
        <Box mb={8}>
          <Heading as="h1" size="xl" mb={2}>
            动漫数据
          </Heading>
          <Text color="gray.600">
            查看动漫信息，包括封面、评分、角色和制作公司
          </Text>
        </Box>
        
        <AnimeTable />
      </Container>
    </AuthGuard>
  )
}