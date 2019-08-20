import React, { Component } from 'react'
import Router from './Router'

import './App.scss'

class AppLayout extends Component {
  render() {
    return (
      <div className="app">
        <Router />
      </div>
    )
  }
}

export default AppLayout
