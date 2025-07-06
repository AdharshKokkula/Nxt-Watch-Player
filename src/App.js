import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import NxtWatchContext from './context/nxtWatchContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    isLightMode: true,
    savedVideosList: [],
    likedVideosList: [],
    dislikedVideosList: [],
  }

  changeMode = () => {
    this.setState(prevState => ({
      isLightMode: !prevState.isLightMode,
    }))
  }

  checkVideoInSavedList = id => {
    const {savedVideosList} = this.state
    return savedVideosList.some(video => video.id === id)
  }

  saveVideo = videoDetails => {
    console.log('video Details', videoDetails)
    if (this.checkVideoInSavedList(videoDetails.id)) {
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.filter(
          eachItem => eachItem.id !== videoDetails.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoDetails],
      }))
    }
  }

  checkVideoIsLiked = id => {
    const {likedVideosList} = this.state
    if (likedVideosList.includes(id)) {
      return true
    }
    return false
  }

  checkVideoIsDisiked = id => {
    const {dislikedVideosList} = this.state
    if (dislikedVideosList.includes(id)) {
      return true
    }
    return false
  }

  removeVideoFromLiked = id => {
    this.setState(prevState => ({
      likedVideosList: prevState.likedVideosList.filter(
        eachId => eachId !== id,
      ),
    }))
  }

  removeVideoFromDisLiked = id => {
    this.setState(prevState => ({
      dislikedVideosList: prevState.dislikedVideosList.filter(
        eachId => eachId !== id,
      ),
    }))
  }

  likeVideo = id => {
    const isVideoLiked = this.checkVideoIsLiked(id)
    const isVideoDisliked = this.checkVideoIsDisiked(id)
    if (isVideoDisliked) {
      this.removeVideoFromDisLiked(id)
    }
    if (isVideoLiked) {
      this.removeVideoFromLiked(id)
    } else {
      this.setState(prevState => ({
        likedVideosList: [...prevState.likedVideosList, id],
      }))
    }
  }

  dislikeVideo = id => {
    const isVideoLiked = this.checkVideoIsLiked(id)
    const isVideoDisliked = this.checkVideoIsDisiked(id)
    if (isVideoLiked) {
      this.removeVideoFromLiked(id)
    }
    if (isVideoDisliked) {
      this.removeVideoFromDisLiked(id)
    } else {
      this.setState(prevState => ({
        dislikedVideosList: [...prevState.dislikedVideosList, id],
      }))
    }
  }

  render() {
    const {
      isLightMode,
      savedVideosList,
      likedVideosList,
      dislikedVideosList,
    } = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isLightMode,
          savedVideosList,
          likedVideosList,
          dislikedVideosList,
          changeMode: this.changeMode,
          saveVideo: this.saveVideo,
          likeVideo: this.likeVideo,
          dislikeVideo: this.dislikeVideo,
        }}
      >
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/trending" exact component={Trending} />
          <ProtectedRoute path="/gaming" exact component={Gaming} />
          <ProtectedRoute path="/saved-videos" exact component={SavedVideos} />
          <ProtectedRoute
            path="/videos/:id"
            exact
            component={VideoItemDetails}
          />
          <Route path="/bad-path" exact component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
