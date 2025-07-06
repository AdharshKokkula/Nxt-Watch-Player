import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import {
  BgContainer,
  Container,
  ContentContainer,
  SectionHeadingContainer,
  SectionHeading,
  TrendingIcon,
} from '../../styledComponents'
import NxtWatchContext from '../../context/nxtWatchContext'

import './index.css'

const trendingVideosApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingVideosList: [],
    trendingVideosApiStatus: trendingVideosApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideosList()
  }

  getTrendingVideosList = async () => {
    this.setState({
      trendingVideosApiStatus: trendingVideosApiStatusConstants.inProgress,
    })
    const trendingVideosApiUrl = `https://apis.ccbp.in/videos/trending`
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
      const response = await fetch(trendingVideosApiUrl, options)
      if (response.ok) {
        const trendingVideosData = await response.json()
        const formattedTrendingVidesData = toCamelCase(trendingVideosData)
        this.setState({
          trendingVideosList: formattedTrendingVidesData,
          trendingVideosApiStatus: trendingVideosApiStatusConstants.success,
        })
      } else {
        this.setState({
          trendingVideosApiStatus: trendingVideosApiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      this.setState({
        trendingVideosApiStatus: trendingVideosApiStatusConstants.failure,
      })
    }
  }

  showVideosList = isLightMode => {
    const {trendingVideosList} = this.state
    if (trendingVideosList.total === 0) {
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
          <TrendingIcon />
          <SectionHeading lightMode={isLightMode}>Trending</SectionHeading>
        </SectionHeadingContainer>
        <ul>
          {trendingVideosList.videos.map(eachItem => (
            <li key={eachItem.id} className="trending-list-item">
              <Link to={`videos/${eachItem.id}`} className="video-link">
                <VideoCard key={eachItem.id} videoDetails={eachItem} />
              </Link>
            </li>
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

  trendingVideosListRenderer = isLightMode => {
    const {trendingVideosApiStatus} = this.state
    switch (trendingVideosApiStatus) {
      case trendingVideosApiStatusConstants.success:
        return this.showVideosList(isLightMode)
      case trendingVideosApiStatusConstants.inProgress:
        return this.showLoadingView()
      case trendingVideosApiStatusConstants.failure:
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
                  {this.trendingVideosListRenderer(isLightMode)}
                </ContentContainer>
              </Container>
            </BgContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending
