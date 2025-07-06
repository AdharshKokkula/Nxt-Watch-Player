import {formatDistanceToNowStrict} from 'date-fns'
import NxtWatchContext from '../../context/nxtWatchContext'

import {
  ItemLink,
  TrendingListItem,
  TrendingThumbNailImage,
  TrendingVideoDetails,
  TrendingProfileImage,
  TrendingContentSection,
  TrendingTitle,
  TrendingChannelName,
  TrendingViews,
  TrendingDate,
  TrendingDot,
} from './styledComponents'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channel,
    profileImageUrl,
  } = videoDetails

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

        return (
          <ItemLink to={`/videos/${id}`} className="link">
            <TrendingListItem>
              <TrendingThumbNailImage
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <TrendingVideoDetails>
                <TrendingProfileImage
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <TrendingContentSection>
                  <TrendingTitle color={textColor}>{title}</TrendingTitle>
                  <TrendingChannelName color={textColor}>
                    {channel.name}
                  </TrendingChannelName>
                  <TrendingViews color={textColor}>
                    {viewCount} views
                  </TrendingViews>
                  <TrendingDot>&#8226;</TrendingDot>
                  <TrendingDate>
                    {formatDistanceToNowStrict(
                      new Date(publishedAt),
                      {addSuffix: true},
                      {addpreffix: false},
                    )}
                  </TrendingDate>
                </TrendingContentSection>
              </TrendingVideoDetails>
            </TrendingListItem>
          </ItemLink>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default VideoCard
