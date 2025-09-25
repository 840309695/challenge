'use client'

import { useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  Flex,
  Box,
  Text,
  Spinner,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  SimpleGrid,
  Link,
  IconButton
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_LAUNCHES, GET_LAUNCH } from '@/lib/graphql/queries'
import { Launch, LaunchesResponse, LaunchResponse } from '@/lib/graphql/types'
import { useRouter, useSearchParams } from 'next/navigation'
import NextLink from 'next/link'

const PAGE_SIZE = 10

const LaunchesTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1)
  const [selectedLaunch, setSelectedLaunch] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // 计算分页偏移量
  const offset = (currentPage - 1) * PAGE_SIZE

  // 获取发射数据列表
  const { loading, error, data } = useQuery<LaunchesResponse>(GET_LAUNCHES, {
    variables: { limit: PAGE_SIZE, offset },
  })

  // 获取选中的发射详情
  const { data: launchData, loading: launchLoading } = useQuery<LaunchResponse>(GET_LAUNCH, {
    variables: { id: selectedLaunch || '' },
    skip: !selectedLaunch,
  })

  // 处理页面变化
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    router.push(`/information?page=${newPage}`)
  }

  // 处理行点击
  const handleRowClick = (id: string) => {
    setSelectedLaunch(id)
    onOpen()
  }

  // 计算总页数
  const totalCount = data?.launchesPastResult?.result?.totalCount || 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  if (loading) return <Spinner size="xl" />
  if (error) return <Text color="red.500">错误: {error.message}</Text>

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>任务名称</Th>
              <Th>发射日期</Th>
              <Th>火箭</Th>
              <Th>状态</Th>
              <Th>图片</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.launches.map((launch) => (
              <Tr 
                key={launch.id} 
                onClick={() => handleRowClick(launch.id)}
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
              >
                <Td>{launch.mission_name}</Td>
                <Td>{new Date(launch.launch_date_utc).toLocaleDateString('zh-CN')}</Td>
                <Td>{launch.rocket.rocket_name}</Td>
                <Td>
                  <Badge colorScheme={launch.launch_success ? 'green' : 'red'}>
                    {launch.launch_success ? '成功' : '失败'}
                  </Badge>
                </Td>
                <Td>
                  {launch.links.flickr_images.length > 0 ? (
                    <Image 
                      src={launch.links.flickr_images[0]} 
                      alt={launch.mission_name}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  ) : launch.links.mission_patch ? (
                    <Image 
                      src={launch.links.mission_patch} 
                      alt={launch.mission_name}
                      boxSize="50px"
                      objectFit="contain"
                      borderRadius="md"
                    />
                  ) : (
                    <Text>无图片</Text>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* 分页控件 */}
      <Flex justifyContent="center" mt={6} mb={6}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          mr={2}
        >
          上一页
        </Button>
        <Text alignSelf="center" mx={4}>
          第 {currentPage} 页，共 {totalPages} 页
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          ml={2}
        >
          下一页
        </Button>
      </Flex>

      {/* 详情模态框 */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          {launchLoading ? (
            <Spinner size="xl" m="auto" my={10} />
          ) : (
            <>
              <ModalHeader>{launchData?.launch.mission_name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  {launchData?.launch.links.flickr_images.length ? (
                    <Box>
                      <Image
                        src={launchData?.launch.links.flickr_images[0]}
                        alt={launchData?.launch.mission_name}
                        borderRadius="md"
                        w="100%"
                        maxH="300px"
                        objectFit="cover"
                      />
                    </Box>
                  ) : launchData?.launch.links.mission_patch ? (
                    <Box>
                      <Image
                        src={launchData?.launch.links.mission_patch}
                        alt={launchData?.launch.mission_name}
                        borderRadius="md"
                        w="100%"
                        maxH="300px"
                        objectFit="contain"
                      />
                    </Box>
                  ) : null}
                  <Box>
                    <Text fontWeight="bold">发射日期:</Text>
                    <Text mb={2}>{new Date(launchData?.launch.launch_date_utc || '').toLocaleDateString('zh-CN')}</Text>
                    
                    <Text fontWeight="bold">状态:</Text>
                    <Badge colorScheme={launchData?.launch.launch_success ? 'green' : 'red'} mb={2}>
                      {launchData?.launch.launch_success ? '成功' : '失败'}
                    </Badge>
                    
                    <Text fontWeight="bold">火箭:</Text>
                    <Text mb={2}>{launchData?.launch.rocket.rocket_name} ({launchData?.launch.rocket.rocket_type})</Text>
                    
                    <Text fontWeight="bold">发射地点:</Text>
                    <Text mb={2}>{launchData?.launch.launch_site?.site_name_long}</Text>
                  </Box>
                </SimpleGrid>
                
                <Box mt={4}>
                  <Text fontWeight="bold">详情:</Text>
                  <Text>{launchData?.launch.details || '无详细信息'}</Text>
                </Box>
                
                <Box mt={4}>
                  <Text fontWeight="bold">相关链接:</Text>
                  <Flex mt={2} gap={2}>
                    {launchData?.launch.links.article_link && (
                      <Link href={launchData.launch.links.article_link} isExternal>
                        <Button size="sm" colorScheme="blue">文章</Button>
                      </Link>
                    )}
                    {launchData?.launch.links.video_link && (
                      <Link href={launchData.launch.links.video_link} isExternal>
                        <Button size="sm" colorScheme="red">视频</Button>
                      </Link>
                    )}
                  </Flex>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  关闭
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LaunchesTable