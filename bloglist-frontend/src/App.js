import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "./reducers/userReducer"
import Blog from './components/Blog'
import Creator from './components/Creator'
import UserList from './components/UserList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginForm from './components/LoginForm'
import LoginForm from './components/LoginForm'
import { initBlogs } from './reducers/blogsReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      dispatch(initBlogs())
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    window.location.reload();
  }

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <Notification data-cy="message"></Notification>
      <h2>blogs</h2>
      <div>You have been logged in
        <button onClick={() => { logout() }}>
          logout
        </button>
      </div>
      <Router>
        {/* <Menu /> */}
        <Switch>
          <Route path="/user">
            <UserList />
          </Route>
          {/* <Route path="/anecdotes/:id">
            <AnecdoteDetails anecdotes={anecdotes} />
          </Route> */}
          <Route path="/">
            <Creator />
            <Blog></Blog>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div >
  )
}

export default App