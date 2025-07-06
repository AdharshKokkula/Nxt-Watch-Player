import styled from 'styled-components'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosLogOut, IoMdClose} from 'react-icons/io'

const lightModeTextColor = '#000000'
const darkModeTextColor = '#e7f6f9'
const lightModeBackgroundColor = '#ffffff'
const darkModeBackgroundColor = '#1f201b'
const lightModeBackgroundColorForContentSection = '#f4f4f4'
const darkModeBackgroundColorForContentSection = '#181818'

// HEADER COMPONENTS

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: ${props =>
    props.lightMode ? lightModeBackgroundColor : darkModeBackgroundColor};
  border-bottom: 1px solid #e2e8f0;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`

export const ProfilePicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    display: none;
  }
`

export const Hamburger = styled(GiHamburgerMenu)`
  @media (min-width: 769px) {
    display: none;
  }
  width: 24px;
  height: 24px;
  padding: 4px;
  box-sizing: content-box;
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
`

export const LogoutIcon = styled(IoIosLogOut)`
  width: 28px;
  height: 28px;
  @media (min-width: 769px) {
    display: none;
  }
  padding: 8px;
  box-sizing: content-box;
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
`

export const CloseIcon = styled(IoMdClose)`
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
`

export const LogoutButton = styled.button`
  background: none;
  border: 2px solid #3b82f6;
  color: #3b82f6;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin: 12px;
  &:hover {
    background-color: #3b82f6;
    color: #ffffff;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

export const PopupSidebar = styled.div`
  width: 250px;
  height: 100vh;
  background-color: ${props => (props.lightMode ? '#ffffff' : '#000000')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-in-out forwards;
`

export const ConfirmButton = styled.button`
  background: none;
  border: 2px solid #3b82f6;
  color: #3b82f6;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin: 12px;
  &:hover {
    background-color: #3b82f6;
    color: #ffffff;
  }
`

// SIDE BAR COMPONENTS

export const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 70px);
  background-color: ${props => (props.lightMode ? '#ffffff' : '#1f201b')};
  border-right: 1px solid #e2e8f0;
  position: fixed;
  left: 0;
  top: 70px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`

export const SidebarItem = styled.li`
  width: 100%;
  background: none;
  border: none;
  padding: 16px 24px;
  text-align: left;
  font-size: 16px;
  color: ${props => (props.lightMode ? lightModeTextColor : darkModeTextColor)};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-container: center
  font-weight: 400;
  position: relative;

  &.active {
    background-color: #fee2e2;
    color: #dc2626;
    font-weight: 500;
  }

  &:hover {
    background-color: #f1f5f9;
    color: #374151;
  }

  &:focus {
    outline: none;
    background-color: #f1f5f9;
  }
  @media (max-width: 768px) {
    .sidebar-list button {
      padding: 12px 16px;
      font-size: 14px;
    }
  }
  
  @media (max-width: 576px) {
    .sidebar-list button {
      white-space: nowrap;
      padding: 12px 16px;
    }
  }
`

// MULTIPLE COMPONENTS FOR MULTIPLE PAGES

export const BgContainer = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
`

export const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  @media (max-width: 768px) {
    .trending-container {
      flex-direction: column;
    }
  }
`

export const ContentContainer = styled.div`
  flex: 1;
  background-color: ${props =>
    props.lightMode
      ? lightModeBackgroundColorForContentSection
      : darkModeBackgroundColorForContentSection}};
  margin-left: 250px;
  padding: 0px 0px 0px 0px;
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`

export const SectionHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background-color: ${props => (props.lightMode ? '#e2e8f0' : '#181818')};
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 5px;
`
export const SectionHeading = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${props => (props.lightMode ? '#000000' : '#ffffff')};
  margin: 0;
  font-family: 'Roboto', sans-serif;
`
export const TrendingIcon = styled(HiFire)`
  font-size: 42px;
  color: #ff0000;
  margin-right: 15px;
  background-color: #fed7d7;
  padding: 8px;
  border-radius: 50%;

  @media (max-width: 768px) {
    font-size: 34px;
    padding: 4px;
  }
`

export const GamingIcon = styled(SiYoutubegaming)`
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

export const StyledBannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: 24px;
`

export const VideoActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s;
`

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 6px;

  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;

  color: #ffffff;
  background-color: #3b82f6;
`
