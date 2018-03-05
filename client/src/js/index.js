import 'normalize.css';
import { h, render } from 'preact';
import Router from 'preact-router';
import Home from './pages/Home';

const App = () => (
  <Router>
    <Home path="/" />
  </Router>
);

render(<App />, document.body);

// This clears out the old rendered DOM on save for HMR
if (module.hot) {
  module.hot.dispose(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
}
