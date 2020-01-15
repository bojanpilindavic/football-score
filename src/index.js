import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/store'
import Main from './components/Main'
import MatchResult from './components/MatchResult'
import Table from './components/Table'
import { BrowserRouter as Router, Route } from "react-router-dom";

const app = (
    <Provider store={store}>
      <Router>
        <App />
          <Route exact path="/" component={Main} />
          <Route path="/Table" component={Table} />
          <Route path="/MatchResults" component={MatchResult} />
      </Router>
    </Provider>
  )

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
