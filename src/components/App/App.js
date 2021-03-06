import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import AccountPage from '../AccountPage'

// import Post from './../Post'
import Feed from './../Feed'
import PostPage from './../PostPage'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Redirect to='/feed' />
          )} />
          <Route exact path='/feed' render={() => (
            <Feed token={this.state.user ? this.state.user.token : null} user={this.state.user} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/feed/:topic' render={(routeProps) => (
            <Feed token={this.state.user ? this.state.user.token : null} user={this.state.user} msgAlert={this.msgAlert} routeProps={routeProps} topic={routeProps.match.params.topic}/>
          )}/>
          <Route path='/posts/:id' render={(props) => (
            <PostPage routeprops={props} user={user} msgAlert={this.msgAlert}/>
          )}/>
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/account' render={() => (
            <AccountPage msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
