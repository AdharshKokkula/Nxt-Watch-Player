import styled from 'styled-components'
import {RiPlayListAddFill} from 'react-icons/ri'

export const SavedContainer = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 60px;
  overflow-y: auto;
  @media screen and (min-width: 768px) {
    margin-left: 250px;
    margin-bottom: 0px;
  }
`

export const SavedVideoTitle = styled.div`
  display: flex;
  align-items: center;
`

export const SavedTitleIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }
`

export const SavedIcon = styled(RiPlayListAddFill)`
  font-size: 42px;
  color: #ff0000;
  margin-right: 15px;
  background-color: #fed7d7;
  padding: 8px;
  border-radius: 50%;

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 8px;
  }
`

export const SavedText = styled.h1`
  font-family: Roboto;
  font-size: 25px;
  color: ${props => props.color};
  margin: 3px;
  @media screen and (min-width: 768px) {
    font-size: 35px;
  }
`

export const SavedVideoList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0px;
`

export const NoSavedVideosView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
`

export const NoSavedVideosImage = styled.img`
  width: 200px;
  @media screen and (min-width: 768px) {
    width: 450px;
  }
`
export const NoSavedVideosHeading = styled.h1`
  font-family: Roboto;
  font-size: 25px;
  color: ${props => props.headingColor};
  text-align: center;
`

export const NoSavedVideosNote = styled.p`
  font-family: Roboto;
  font-size: 18px;
  color: ${props => props.noteColor};
  text-align: center;
`
