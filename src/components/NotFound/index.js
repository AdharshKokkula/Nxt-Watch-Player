import Header from '../Header'
import Sidebar from '../Sidebar'
import {BgContainer, Container, ContentContainer} from '../../styledComponents'

import './index.css'

const NotFound = () => (
  <BgContainer>
    <Header />
    <Container>
      <Sidebar />
      <ContentContainer>
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            className="not-found-image"
            alt="not found"
          />
          <h1 className="not-found-h1">Page Not Found</h1>
          <p className="not-found-p">
            we are sorry, the page you requested could not be found.
          </p>
        </div>
      </ContentContainer>
    </Container>
  </BgContainer>
)

export default NotFound
