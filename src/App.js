import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar';


@observer
@inject('clientsStore')
class App extends Component {

  componentDidMount() {
    const { clientsStore } = this.props
    if (clientsStore.getClients) {
      clientsStore.getClients()
    }
  }

  render() {

    return (
      <Router>
        <div>
          {window.location.pathname === '/' ? <Redirect to='/clients' /> : null}
          <Navbar />
        </div>
      </Router>
    );
  }
}

export default App;
