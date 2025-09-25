import { gql } from '@apollo/client'

// 获取动漫数据的查询
export const GET_ANIME = gql`
  query GetAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        bannerImage
        description
        episodes
        genres
        averageScore
        popularity
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`

// 获取单个动漫详情的查询
export const GET_ANIME_DETAIL = gql`
  query GetAnimeDetail($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
      }
      bannerImage
      description
      episodes
      genres
      averageScore
      popularity
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      characters {
        nodes {
          id
          name {
            full
          }
          image {
            large
            medium
          }
        }
      }
      staff {
        nodes {
          id
          name {
            full
          }
          image {
            large
            medium
          }
        }
      }
      studios {
        nodes {
          id
          name
        }
      }
    }
  }
`