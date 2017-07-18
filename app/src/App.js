import React from 'react'
import './App.css'
import Dashboard from './components/Dashboard'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App
