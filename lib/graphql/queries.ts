import { gql } from '@apollo/client'

export const GET_LAUNCH = gql`
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
      launch_site {
        site_name_long
      }
      details
      links {
        article_link
        video_link
        mission_patch
        flickr_images
      }
    }
  }
`

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        flickr_images
        mission_patch
      }
    }
  }
`