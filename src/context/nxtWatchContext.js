import React from 'react'

const NxtWatchContext = React.createContext({
  isLightMode: true,
  changeMode: () => {},
  savedVideosList: [],
  saveVideo: () => {},
  likedVideosList: [],
  likeVideo: () => {},
  dislikedVideosList: [],
  dislikeVideo: () => {},
})

export default NxtWatchContext
