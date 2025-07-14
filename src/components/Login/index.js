import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {LoginButton} from '../../styledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginError: '',
    loginErrorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userData = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookie.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({loginError: true, loginErrorMsg: data.error_msg})
    }
  }

  render() {
    const {
      username,
      password,
      loginError,
      loginErrorMsg,
      showPassword,
    } = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="login-form-logo"
            alt="website logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
          />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.onChangeShowPassword}
              value={showPassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          {loginError && <p className="error-msg">{loginErrorMsg}</p>}
          <LoginButton type="submit">Login</LoginButton>
          <div className="passwords-section">
            <p>
              Premium User:
              <br /> UserName: rahul
              <br /> Password: rahul@2021
            </p>
            <p>
              Not Premium
              <br /> User: UserName: raja
              <br /> Password: raja@2021
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
