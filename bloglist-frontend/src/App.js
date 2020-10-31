import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "./reducers/userReducer"
import Blog from './components/Blog'
import Creator from './components/Creator'
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
      console.log("user", user)
      dispatch(setUser(user))
      dispatch(initBlogs())
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    window.location.reload();
  }

  // if (user === null) {
  //   return <LoginForm />
  // }

  return (
    <div>
      <Notification data-cy="message"></Notification>
      <h2>blogs</h2>
      <div>You have been logged in
        <button onClick={() => { logout() }}>
          logout
        </button>
      </div>
      <Creator />
      <Blog></Blog>
    </div >
  )
}

export default App