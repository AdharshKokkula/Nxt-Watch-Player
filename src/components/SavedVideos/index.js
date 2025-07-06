import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/nxtWatchContext'
import VideoCard from '../VideoCard'

import {
  SavedIcon,
  SavedVideoList,
  NoSavedVideosView,
  NoSavedVideosImage,
  NoSavedVideosHeading,
  NoSavedVideosNote,
} from './styledComponents'

import {
  BgContainer,
  Container,
  ContentContainer,
  SectionHeadingContainer,
  SectionHeading,
} from '../../styledComponents'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isLightMode, savedVideosList} = value

      const headingColor = !isLightMode ? '#f1f5f9' : '#1e293b'
      const noteColor = !isLightMode ? '#e2e8f0' : '#475569'

      return (
        <>
          <BgContainer>
            <Header />
            <Container>
              <Sidebar />
              <ContentContainer lightMode={isLightMode}>
                {savedVideosList.length > 0 ? (
                  <>
                    <SectionHeadingContainer lightMode={isLightMode}>
                      <SavedIcon />
                      <SectionHeading>Saved Videos</SectionHeading>
                    </SectionHeadingContainer>

                    <SavedVideoList>
                      {savedVideosList.map(eachVideo => (
                        <VideoCard
                          key={eachVideo.id}
                          videoDetails={eachVideo}
                        />
                      ))}
                    </SavedVideoList>
                  </>
                ) : (
                  <NoSavedVideosView>
                    <NoSavedVideosImage
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                    />
                    <NoSavedVideosHeading headingColor={headingColor}>
                      No saved videos found
                    </NoSavedVideosHeading>
                    <NoSavedVideosNote noteColor={noteColor}>
                      You can save your videos while watching them
                    </NoSavedVideosNote>
                  </NoSavedVideosView>
                )}
              </ContentContainer>
            </Container>
          </BgContainer>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
