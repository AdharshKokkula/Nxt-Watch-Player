import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNowStrict} from 'date-fns'
import {RiCloseFill} from 'react-icons/ri'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {StyledBannerContainer, ContentContainer} from '../../styledComponents'
import NxtWatchContext from '../../context/nxtWatchContext'

import {
  VideoDescription,
  NoVideosViewContainer,
  NoVideosImg,
  NoVideosHeading,
  NoVideosSuggestion,
  NoVideoRetryButton,
} from './styledComponents'

import './index.css'

const HomeVideosApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    homeVideosList: [],
    homeVideosApiStatus: HomeVideosApiStatusConstants.initial,
    showPremiumBanner: true,
  }

  componentDidMount() {
    this.getVideosList()
  }

  closePremiumBanner = () => {
    this.setState(prevState => ({
      showPremiumBanner: !prevState.showPremiumBanner,
    }))
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getVideosList = async () => {
    this.setState({
      homeVideosApiStatus: HomeVideosApiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      const response = await fetch(homeVideosApiUrl, options)
      if (response.ok) {
        const homeVideosData = await response.json()
        const formattedHomeVidesData = toCamelCase(homeVideosData)
        this.setState({
          homeVideosList: formattedHomeVidesData,
          homeVideosApiStatus: HomeVideosApiStatusConstants.success,
        })
      } else {
        this.setState({
          homeVideosApiStatus: HomeVideosApiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      this.setState({homeVideosApiStatus: HomeVideosApiStatusConstants.failure})
    }
  }

  renderNoVideosView = isLightMode => (
    <NoVideosViewContainer>
      <NoVideosImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <NoVideosHeading lightMode={isLightMode}>
        No Search results found
      </NoVideosHeading>
      <NoVideosSuggestion lightMode={isLightMode}>
        Try different key words or remove search filter
      </NoVideosSuggestion>
      <NoVideoRetryButton
        type="button"
        className="retry-button"
        onClick={this.getVideosList}
      >
        Retry
      </NoVideoRetryButton>
    </NoVideosViewContainer>
  )

  renderVideosView = (homeVideosList, isLightMode) => (
    <ul>
      {homeVideosList.videos.map(eachItem => (
        <li key={eachItem.id}>
          <Link
            to={`videos/${eachItem.id}`}
            className="video-link"
            key={eachItem.id}
          >
            <img
              src={eachItem.thumbnailUrl}
              className="home-video-thumbnail"
              alt="video thumbnail"
            />
            <VideoDescription
              lightMode={isLightMode}
              className="video-details-container"
            >
              <img
                src={eachItem.channel.profileImageUrl}
                className="channel-profile-picture"
                alt="channel logo"
              />
              <div className="video-description-container">
                <p className="video-title">{eachItem.title}</p>
                <p className="video-channel-name">{eachItem.channel.name}</p>
                <p className="video-view-count">{eachItem.viewCount}</p>
                <p className="video-published-at">
                  {formatDistanceToNowStrict(
                    new Date(eachItem.publishedAt),
                    {addSuffix: true},
                    {addpreffix: false},
                  )}
                </p>
              </div>
            </VideoDescription>
          </Link>
        </li>
      ))}
    </ul>
  )

  showVideosList = isLightMode => {
    const {homeVideosList} = this.state
    return (
      <>
        {homeVideosList.total > 0
          ? this.renderVideosView(homeVideosList, isLightMode)
          : this.renderNoVideosView(isLightMode)}
      </>
    )
  }

  showLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  showFailuteView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-descripton">
        We are having some trouble completing your request Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getVideosList}
      >
        Retry
      </button>
    </div>
  )

  videosListRenderer = isLightMode => {
    const {homeVideosApiStatus} = this.state
    switch (homeVideosApiStatus) {
      case HomeVideosApiStatusConstants.success:
        return this.showVideosList(isLightMode)
      case HomeVideosApiStatusConstants.inProgress:
        return this.showLoadingView()
      case HomeVideosApiStatusConstants.failure:
        return this.showFailuteView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, showPremiumBanner} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isLightMode} = value
          return (
            <div className="home-bg-container">
              <Header />
              <div className="home-container">
                <Sidebar />
                <ContentContainer data-testid="home" lightMode={isLightMode}>
                  {showPremiumBanner && (
                    <StyledBannerContainer data-testid="banner">
                      <div className="premium-features-content">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          className="banner-logo"
                          alt="nxt watch logo"
                        />
                        <p className="premium-description">
                          Buy Nxt Watch Premium prepaid Plans With UPI
                        </p>
                        <button type="button">GET IT NOW</button>
                      </div>
                      <button
                        type="button"
                        className="close-icon-button"
                        onClick={this.closePremiumBanner}
                        data-testid="close"
                      >
                        <RiCloseFill className="close-icon" />
                      </button>
                    </StyledBannerContainer>
                  )}
                  <div className="video-search-container">
                    <div className="video-bar-container">
                      <input
                        type="search"
                        className="search-bar"
                        placeholder="Search"
                        onChange={this.updateSearchInput}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        onClick={this.getVideosList}
                      >
                        <BsSearch className="search-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="videos-display-container">
                    {this.videosListRenderer(isLightMode)}
                  </div>
                </ContentContainer>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
