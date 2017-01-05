import Inferno from 'inferno';
import App from './App';
import {Router, IndexRoute, Route, Link} from 'inferno-router';
import PortfolioPage from './PortfolioPage';
import MainPage from './MainPage';

import {createHashHistory} from 'history';

const hashHistory = createHashHistory();

Inferno.render(<Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
  <Route path="/" component={App}>
    <Route path="portfolio/:slug" component={PortfolioPage} />
    <IndexRoute component={MainPage} />
  </Route>
</Router>, document.getElementById('app'));
