import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddFill} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/nxtWatchContext'
import {SidebarContainer, SidebarItem} from '../../styledComponents'

import './index.css'

const Sidebar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isLightMode} = value
      return (
        <SidebarContainer lightMode={isLightMode}>
          <ul className="sidebar-list">
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
          <div className="sidebar-contact-container">
            <p className="sidebar-contact-us-h1">CONTACT US</p>
            <ul className="social-media-handles-container">
              <li className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                  className="social-media-icon"
                  alt="facebook logo"
                />
              </li>
              <li className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  className="social-media-icon"
                  alt="twitter logo"
                />
              </li>
              <li className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  className="social-media-icon"
                  alt="linked in logo"
                />
              </li>
            </ul>
            <p className="sidebar-contact-description">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </SidebarContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Sidebar
