import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import SearchPage from './components/SearchPage';
import SearchResults from './components/SearchResults';
import TabResults from './components/TabResults';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ SearchPage } />
          <Route path='/search-results' component={ SearchResults } />
          <Route path='/tab-results' component={ TabResults } />
        </Switch>
      </div>
    );
  }
}

export default App;
