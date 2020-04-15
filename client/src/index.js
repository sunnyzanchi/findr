import 'normalize.css'
import { h, render } from 'preact'
import Router from 'preact-router'
import Home from './pages/Home'

const App = () => (
  <Router>
    <Home path="/" />
  </Router>
)

render(<App />, document.querySelector('#app'))
