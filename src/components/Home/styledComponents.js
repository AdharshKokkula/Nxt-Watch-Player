import styled from 'styled-components'

export const VideoDescription = styled.div`
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
  background-color: ${props => (props.lightMode ? '#ffffff' : '#000000')};
  display: flex;
  padding: 16px;
  gap: 12px;
  align-items: flex-start;
`

// HOME PAGE NO VIEOS VIEW COMPONENT

export const NoVideosViewContainer = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
`
export const NoVideosHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  color: ${props => (props.lightMode === true ? '#000000' : '#ffffff')};
`
export const NoVideosImg = styled.img`
  width: 70%;
  max-width: 360px;
  margin-bottom: 20px;
`
export const NoVideosSuggestion = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  color: ${props => (props.lightMode === true ? '#000000' : '#ffffff')};
`
export const NoVideoRetryButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 10px 25px;
  border: none;
`
