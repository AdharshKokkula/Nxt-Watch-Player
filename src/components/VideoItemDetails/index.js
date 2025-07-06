import {Component} from 'react'
import Cookie from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import {
  VideoItemDetailsContent,
  MainVideoDetailsContainer,
  LikeButton,
  DislikeButton,
  SaveButton,
} from './styledComponents'
import NxtWatchContext from '../../context/nxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const videosApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    videoApiStatus: videosApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({videoApiStatus: videosApiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoItemDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookie.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const toCamelCase = obj => {
      if (Array.isArray(obj)) {
        return obj.map(item => toCamelCase(item))
      }
      if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase(),
          )
          acc[camelKey] = toCamelCase(obj[key])
          return acc
        }, {})
      }
      return obj
    }

    try {
      const response = await fetch(videoItemDetailsApiUrl, options)
      if (response.ok) {
        const videoDetailsResponse = await response.json()
        const formattedVideoDetails = toCamelCase(videoDetailsResponse)
        this.setState({
          videoDetails: formattedVideoDetails,
          videoApiStatus: videosApiStatusConstants.success,
        })
      } else {
        this.setState({
          videoApiStatus: videosApiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      this.setState({videoApiStatus: videosApiStatusConstants.failure})
    }
  }

  renderVideoDetails = () => {
    const {videoDetails} = this.state
    const {
      id,
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails.videoDetails
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {
            isLightMode,
            likeVideo,
            dislikeVideo,
            likedVideosList,
            dislikedVideosList,
            saveVideo,
            savedVideosList,
          } = value

          const isLiked = likedVideosList.includes(id)
          const isDisliked = dislikedVideosList.includes(id)
          const isSaved = savedVideosList.some(
            savedVideo => savedVideo.id === id,
          )

          const onClickLike = () => {
            likeVideo(id)
          }

          const onClickDislike = () => {
            dislikeVideo(id)
          }

          const onClickSave = () => {
            saveVideo(videoDetails.videoDetails)
          }

          return (
            <MainVideoDetailsContainer lightMode={isLightMode}>
              <div className="video-player-container">
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  className="youtube-video-player"
                />
              </div>

              <div className="video-info-container">
                <p className="video-title">{title}</p>

                <div className="video-stats-container">
                  <div className="views-published-container">
                    <p className="video-views">{viewCount} views</p>
                    <p className="video-published-date">• {publishedAt}</p>
                  </div>

                  <ul className="video-actions-container">
                    <li>
                      <LikeButton
                        reaction={isLiked}
                        className={`action-button ${isLiked ? 'active' : ''}`}
                        onClick={onClickLike}
                      >
                        <AiOutlineLike className="action-icon" />
                        Like
                      </LikeButton>
                    </li>
                    <li>
                      <DislikeButton
                        reaction={isDisliked}
                        className={`action-button ${
                          isDisliked ? 'active' : ''
                        }`}
                        onClick={onClickDislike}
                      >
                        <AiOutlineDislike className="action-icon" />
                        Dislike
                      </DislikeButton>
                    </li>
                    <li className="save-button-container">
                      <SaveButton isSaved={isSaved} onClick={onClickSave}>
                        <BiListPlus
                          className={`action-icon ${isSaved ? 'active' : ''}`}
                        />
                        {isSaved ? 'Saved' : 'Save'}
                      </SaveButton>
                    </li>
                  </ul>
                </div>

                <hr className="separator" />

                <div className="channel-info-container">
                  <img
                    src={channel.profileImageUrl}
                    alt="channel logo"
                    className="channel-profile-image"
                  />
                  <div className="channel-details">
                    <p className="channel-name">{channel.name}</p>
                    <p className="channel-subscribers">
                      {channel.subscriberCount} subscribers
                    </p>
                    <p className="video-description">{description}</p>
                  </div>
                </div>
              </div>
            </MainVideoDetailsContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getVideoDetails}
      >
        Retry
      </button>
    </div>
  )

  renderVideoItemDetails = () => {
    const {videoApiStatus} = this.state

    switch (videoApiStatus) {
      case videosApiStatusConstants.success:
        return this.renderVideoDetails()
      case videosApiStatusConstants.inProgress:
        return this.renderLoadingView()
      case videosApiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLightMode} = value
          return (
            <div className="video-item-details-bg-container">
              <Header />
              <div className="video-item-details-content-container">
                <Sidebar />
                <VideoItemDetailsContent lightMode={isLightMode}>
                  {this.renderVideoItemDetails()}
                </VideoItemDetailsContent>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
