import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import AccountStats from './AccountStats'
import MyPosts from './MyPosts'
import ChangePassword from './ChangePassword/ChangePassword'

const AccountPage = (props) => {
  return (
    <div>
      <h1 style={{ marginTop: '20px' }}>My Account</h1>
      <Tabs defaultActiveKey="stats">
        <Tab eventKey="stats" title="Account Statistics">
          <AccountStats msgAlert={props.msgAlert} user={props.user}/>
        </Tab>
        <Tab eventKey="posts" title="My Posts">
          <MyPosts msgAlert={props.msgAlert} user={props.user}/>
        </Tab>
        <Tab eventKey="changepw" title="Change Password">
          <ChangePassword msgAlert={props.msgAlert} user={props.user} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default AccountPage
