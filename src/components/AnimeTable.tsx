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
  Avatar,
  AvatarGroup,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_ANIME, GET_ANIME_DETAIL } from '../lib/graphql/queries'
import { AnimeResponse, AnimeDetailResponse } from '../lib/graphql/types'
import { useRouter, useSearchParams } from 'next/navigation'

const PAGE_SIZE = 10

const AnimeTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1)
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // 获取动漫数据列表
  const { loading, error, data } = useQuery<AnimeResponse>(GET_ANIME, {
    variables: { page: currentPage, perPage: PAGE_SIZE },
  })

  // 获取选中的动漫详情
  const { data: animeData, loading: animeLoading } = useQuery<AnimeDetailResponse>(GET_ANIME_DETAIL, {
    variables: { id: selectedAnimeId || 0 },
    skip: !selectedAnimeId,
  })

  // 处理页面变化
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    router.push(`/information?page=${newPage}`)
  }

  // 处理行点击
  const handleRowClick = (id: number) => {
    setSelectedAnimeId(id)
    onOpen()
  }

  // 计算总页数
  const totalCount = data?.Page.pageInfo.total || 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  if (loading) return <Spinner size="xl" />
  if (error) return <Text color="red.500">错误: {error.message}</Text>

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>动漫名称</Th>
              <Th>发布日期</Th>
              <Th>类型</Th>
              <Th>评分</Th>
              <Th>封面</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.Page.media.map((anime) => (
              <Tr 
                key={anime.id} 
                onClick={() => handleRowClick(anime.id)}
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
              >
                <Td>{anime.title.romaji || anime.title.english || anime.title.native}</Td>
                <Td>
                  {anime.startDate ? 
                    `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : 
                    '未知'}
                </Td>
                <Td>{anime.genres.join(', ')}</Td>
                <Td>
                  <Badge colorScheme={anime.averageScore && anime.averageScore > 70 ? 'green' : 'orange'}>
                    {anime.averageScore || '无评分'}
                  </Badge>
                </Td>
                <Td>
                  {anime.coverImage ? (
                    <Image 
                      src={anime.coverImage.large} 
                      alt={anime.title.romaji || anime.title.english || anime.title.native}
                      boxSize="50px"
                      objectFit="cover"
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
          {animeLoading ? (
            <Spinner size="xl" m="auto" my={10} />
          ) : (
            <>
              <ModalHeader>
                {animeData?.Media.title.romaji || 
                 animeData?.Media.title.english || 
                 animeData?.Media.title.native}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  {animeData?.Media.bannerImage ? (
                    <Box>
                      <Image
                        src={animeData.Media.bannerImage}
                        alt={animeData.Media.title.romaji || animeData.Media.title.english || animeData.Media.title.native}
                        borderRadius="md"
                        w="100%"
                        maxH="300px"
                        objectFit="cover"
                      />
                    </Box>
                  ) : animeData?.Media.coverImage ? (
                    <Box>
                      <Image
                        src={animeData.Media.coverImage.large}
                        alt={animeData.Media.title.romaji || animeData.Media.title.english || animeData.Media.title.native}
                        borderRadius="md"
                        w="100%"
                        maxH="300px"
                        objectFit="contain"
                      />
                    </Box>
                  ) : null}
                  <Box>
                    <Text fontWeight="bold">发布日期:</Text>
                    <Text mb={2}>
                      {animeData?.Media.startDate ? 
                        `${animeData.Media.startDate.year}-${animeData.Media.startDate.month}-${animeData.Media.startDate.day}` : 
                        '未知'}
                      {animeData?.Media.endDate && 
                        ` 至 ${animeData.Media.endDate.year}-${animeData.Media.endDate.month}-${animeData.Media.endDate.day}`}
                    </Text>
                    
                    <Text fontWeight="bold">状态:</Text>
                    <Badge colorScheme={animeData?.Media.status === 'FINISHED' ? 'green' : 'blue'} mb={2}>
                      {animeData?.Media.status === 'FINISHED' ? '已完结' : 
                       animeData?.Media.status === 'RELEASING' ? '连载中' : 
                       animeData?.Media.status === 'NOT_YET_RELEASED' ? '未发布' : 
                       animeData?.Media.status || '未知'}
                    </Badge>
                    
                    <Text fontWeight="bold">集数:</Text>
                    <Text mb={2}>{animeData?.Media.episodes || '未知'}</Text>
                    
                    <Text fontWeight="bold">类型:</Text>
                    <Text mb={2}>{animeData?.Media.genres.join(', ')}</Text>
                    
                    <Text fontWeight="bold">评分:</Text>
                    <Text mb={2}>{animeData?.Media.averageScore || '无评分'}/100</Text>
                    
                    <Text fontWeight="bold">制作公司:</Text>
                    <Text mb={2}>
                      {animeData?.Media.studios?.nodes.map(studio => studio.name).join(', ') || '未知'}
                    </Text>
                  </Box>
                </SimpleGrid>
                
                <Box mt={4}>
                  <Text fontWeight="bold">简介:</Text>
                  <Text>{animeData?.Media.description || '无详细信息'}</Text>
                </Box>
                
                <Box mt={4}>
                  <Text fontWeight="bold">主要角色:</Text>
                  <Wrap mt={2} spacing={4}>
                    {animeData?.Media.characters?.nodes.slice(0, 5).map(character => (
                      <WrapItem key={character.id} textAlign="center">
                        <Box>
                          <Avatar 
                            src={character.image.large} 
                            name={character.name.full}
                            size="lg"
                            mb={1}
                          />
                          <Text fontSize="sm">{character.name.full}</Text>
                        </Box>
                      </WrapItem>
                    ))}
                  </Wrap>
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

export default AnimeTable