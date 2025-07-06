import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {
  BgContainer,
  Container,
  ContentContainer,
  SectionHeadingContainer,
  GamingIcon,
  SectionHeading,
} from '../../styledComponents'
import NxtWatchContext from '../../context/nxtWatchContext'

import './index.css'

const gamingVideosApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gamingVideosList: [],
    gamingVideosApiStatus: gamingVideosApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideosList()
  }

  getGamingVideosList = async () => {
    this.setState({
      gamingVideosApiStatus: gamingVideosApiStatusConstants.inProgress,
    })
    const gamingVideosApiUrl = `https://apis.ccbp.in/videos/gaming`
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
      const response = await fetch(gamingVideosApiUrl, options)
      if (response.ok) {
        const gamingVideosData = await response.json()
        const formattedGamingVideosData = toCamelCase(gamingVideosData)
        this.setState({
          gamingVideosList: formattedGamingVideosData,
          gamingVideosApiStatus: gamingVideosApiStatusConstants.success,
        })
      } else {
        this.setState({
          gamingVideosApiStatus: gamingVideosApiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      this.setState({
        gamingVideosApiStatus: gamingVideosApiStatusConstants.failure,
      })
    }
  }

  showVideosList = isLightMode => {
    const {gamingVideosList} = this.state
    if (gamingVideosList.total === 0) {
      return (
        <div className="no-search-result-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
            className="no-search-result-image"
            alt="no videos"
          />
          <h1 className="no-search-result-heading">No Search Results Found</h1>
          <p className="no-search-result-description">
            Try different keywords or remove the search filter.
          </p>
        </div>
      )
    }
    return (
      <>
        <SectionHeadingContainer lightMode={isLightMode}>
          <GamingIcon />
          <SectionHeading>Gaming</SectionHeading>
        </SectionHeadingContainer>
        <ul className="gaming-videos-container">
          {gamingVideosList.videos.map(eachItem => (
            <Link to={`videos/${eachItem.id}`} className="video-link">
              <li key={eachItem.id} className="gaming-video-item-container">
                <img
                  src={eachItem.thumbnailUrl}
                  className="gaming-video-thumbnail"
                  alt="video thumbnail"
                />
                <div className="gaming-video-details-container">
                  <div className="gaming-video-description-container">
                    <p className="gaming-video-title">{eachItem.title}</p>
                    <p className="gaming-video-view-count">
                      {eachItem.viewCount} Watching Worldwide
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
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
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  gamingVideosListRenderer = isLightMode => {
    const {gamingVideosApiStatus} = this.state
    switch (gamingVideosApiStatus) {
      case gamingVideosApiStatusConstants.success:
        return this.showVideosList(isLightMode)
      case gamingVideosApiStatusConstants.inProgress:
        return this.showLoadingView()
      case gamingVideosApiStatusConstants.failure:
        return this.showFailuteView()
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
            <BgContainer>
              <Header />
              <Container>
                <Sidebar />
                <ContentContainer lightMode={isLightMode}>
                  {this.gamingVideosListRenderer(isLightMode)}
                </ContentContainer>
              </Container>
            </BgContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
