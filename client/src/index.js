import { h, render } from 'preact'
import Router from 'preact-router'

import CreateList from './pages/CreateList'
import Home from './pages/Home'
import Lobby from './pages/Lobby'
import Login from './pages/Login'
import LoginOrRegister from './pages/LoginOrRegister'
import Register from './pages/Register'

import useLocalStorage from './useLocalStorage'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [session, setSession] = useLocalStorage('session')

  return (
    <Router>
      <LoginOrRegister path="/" />
      <Home path="/app" />
      <CreateList path="/create" />
      <Login path="/login" />
      <Lobby path="/lobby" />
      <Register path="/register" />
    </Router>
  )
}

render(<App />, document.querySelector('#app'))
