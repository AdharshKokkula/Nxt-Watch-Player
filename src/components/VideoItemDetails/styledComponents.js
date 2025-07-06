import styled from 'styled-components'

export const VideoItemDetailsContent = styled.div`
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: calc(100vh - 70px);
  padding: 24px;
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
  background-color: ${props => (props.lightMode ? '#ffffff' : '#000000')};
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

export const MainVideoDetailsContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
  background-color: ${props => (props.lightMode ? '#ffffff' : '#000000')};
`

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${props => {
    if (props.reaction === true) {
      return ' #2563eb'
    }
    return '#64748b'
  }};
`
export const LikeIcon = styled.button`
  color: ${props => {
    if (props.reaction === true) {
      return ' #2563eb'
    }
    return '#64748b'
  }};
`

export const DislikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${props => {
    if (props.reaction === true) {
      return ' #2563eb'
    }
    return '#64748b'
  }};
`
export const Dislike = styled.button`
  color: ${props => {
    if (props.reaction === true) {
      return ' #2563eb'
    }
    return '#64748b'
  }};
`

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${props => {
    if (props.isSaved === true) {
      return ' #2563eb'
    }
    return '#64748b'
  }};
`
export const SaveText = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${props => {
    if (props.isSaved === true) {
      return ' #2563eb'
    }
    return '#64748b'
  }};
`

// SAVED VIDEO CONTAINER

export const SavedVideoTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #2d3748;
  margin: 0 0 8px 0;
  line-height: 1.4;
  font-family: 'Roboto', sans-serif;
`

export const VideoItemSaveButton = styled.button`
  color: ;
`
