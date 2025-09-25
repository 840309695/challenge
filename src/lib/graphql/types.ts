// AniList API 数据类型定义

// SpaceX API 数据类型定义
export interface Rocket {
  rocket_name: string
  rocket_type?: string
}

export interface LaunchSite {
  site_name_long: string
}

export interface LaunchLinks {
  article_link?: string
  video_link?: string
  mission_patch?: string
  flickr_images: string[]
}

export interface Launch {
  id: string
  mission_name: string
  launch_date_utc: string
  launch_success?: boolean
  rocket: Rocket
  launch_site: LaunchSite
  details?: string
  links: LaunchLinks
}

export interface LaunchesResponse {
  launches: Launch[]
  launchesPastResult?: {
    result: {
      totalCount: number
    }
  }
}

export interface LaunchResponse {
  launch: Launch
}

export interface Title {
  romaji: string
  english: string
  native: string
}

export interface CoverImage {
  large: string
  medium: string
  extraLarge?: string
}

export interface Date {
  year: number
  month: number
  day: number
}

export interface Character {
  id: number
  name: {
    full: string
  }
  image: {
    large: string
    medium: string
  }
}

export interface Staff {
  id: number
  name: {
    full: string
  }
  image: {
    large: string
    medium: string
  }
}

export interface Studio {
  id: number
  name: string
}

export interface Media {
  id: number
  title: Title
  coverImage: CoverImage
  bannerImage?: string
  description?: string
  episodes?: number
  genres: string[]
  averageScore?: number
  popularity?: number
  status?: string
  startDate?: Date
  endDate?: Date
  characters?: {
    nodes: Character[]
  }
  staff?: {
    nodes: Staff[]
  }
  studios?: {
    nodes: Studio[]
  }
}

export interface PageInfo {
  total: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
  perPage: number
}

export interface Page {
  pageInfo: PageInfo
  media: Media[]
}

export interface AnimeResponse {
  Page: Page
}

export interface AnimeDetailResponse {
  Media: Media
}

export interface AnimeVariables {
  page?: number
  perPage?: number
}

export interface AnimeDetailVariables {
  id: number
}