import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {FaMoon} from 'react-icons/fa'
import {RiPlayListAddFill, RiSunLine} from 'react-icons/ri'

import Popup from 'reactjs-popup'
import Cookie from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import './index.css'

import NxtWatchContext from '../../context/nxtWatchContext'
import {
  SidebarItem,
  NavbarContainer,
  ProfilePicture,
  Hamburger,
  LogoutButton,
  LogoutIcon,
  ConfirmButton,
  PopupSidebar,
  CloseIcon,
} from '../../styledComponents'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isLightMode, changeMode} = value

      const onChangeMode = () => {
        changeMode()
      }

      const onLogout = () => {
        const {history} = props
        Cookie.remove('jwt_token')
        history.replace('/login')
      }

      const getLogOutButton = () => (
        <div className="logout-container">
          <LogoutButton>Logout</LogoutButton>
          <LogoutIcon lightMode={isLightMode} />
        </div>
      )

      const LogoutPopup = () => (
        <Popup trigger={getLogOutButton()} modal nested>
          {close => (
            <div className="modal">
              <div className="content">
                <p className="heading">Are you sure, you want to logout</p>
              </div>
              <div className="actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <ConfirmButton onClick={onLogout}>Confirm</ConfirmButton>
              </div>
            </div>
          )}
        </Popup>
      )

      return (
        <NavbarContainer lightMode={isLightMode}>
          <Link to="/">
            <img
              src={
                isLightMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              }
              className="website-logo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-items">
            <li className="nav-item">
              <button
                type="button"
                data-testid="theme"
                className="mode-button"
                onClick={onChangeMode}
              >
                {isLightMode ? (
                  <FaMoon />
                ) : (
                  <RiSunLine className="light-mode-button" />
                )}
              </button>
            </li>

            <li className="nav-item">
              <ProfilePicture
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                className="display-picture"
                alt="profile"
              />

              {/* Hamburger Menu Trigger */}
              <Popup
                modal
                nested
                overlayStyle={{background: 'rgba(0, 0, 0, 0.5)'}}
                contentStyle={{padding: 0, border: 'none'}}
                closeOnDocumentClick
                trigger={<Hamburger lightMode={isLightMode} />}
              >
                {close => (
                  <PopupSidebar
                    lightMode={isLightMode}
                    className="popup-sidebar"
                  >
                    <button
                      type="button"
                      className="close-sidebar-btn"
                      onClick={close}
                    >
                      <CloseIcon
                        lightMode={isLightMode}
                        className="close-icon"
                      />
                    </button>
                    <ul className="sidebar-list">
                      <SidebarItem lightMode={isLightMode}>
                        <Link to="/">
                          <img
                            src={
                              isLightMode
                                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                            }
                            className="website-logo"
                            alt="website logo"
                          />
                        </Link>
                      </SidebarItem>
                      <SidebarItem lightMode={isLightMode}>
                        <Link to="/" className="sidebar-link">
                          <AiFillHome className="side-bar-icon" />
                          Home
                        </Link>
                      </SidebarItem>
                      <SidebarItem lightMode={isLightMode}>
                        <Link to="/trending" className="sidebar-link">
                          <HiFire className="side-bar-icon" />
                          Trending
                        </Link>
                      </SidebarItem>
                      <SidebarItem lightMode={isLightMode}>
                        <Link to="/gaming" className="sidebar-link">
                          <SiYoutubegaming className="side-bar-icon" />
                          Gaming
                        </Link>
                      </SidebarItem>
                      <SidebarItem lightMode={isLightMode}>
                        <Link to="/saved-videos" className="sidebar-link">
                          <RiPlayListAddFill className="side-bar-icon" />
                          Saved Videos
                        </Link>
                      </SidebarItem>
                    </ul>
                  </PopupSidebar>
                )}
              </Popup>
            </li>

            <li className="nav-item">
              <LogoutPopup />
            </li>
          </ul>
        </NavbarContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(Header)
