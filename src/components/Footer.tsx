'use client'

import { Box, Container, Text } from '@chakra-ui/react'

const Footer = () => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
  
  return (
    <Box as="footer" bg="gray.100" py={4} borderTop="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Text textAlign="center" fontSize="sm" color="gray.600">
        Challenge v{version}
        </Text>
      </Container>
    </Box>
  )
}

export default Footer