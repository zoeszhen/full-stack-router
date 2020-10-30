import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from "./reducers/notificationReducer"
import Blog from './components/Blog'
import Creator from './components/Creator'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginForm from './components/LoginForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      }
      )
    }
  }, [])


  const removeBlog = ({ id, title }) => {
    if (window.confirm(`Do you really want delete ${title}`)) {
      blogService.delete(id)
        .then((blogs) => {
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        })
        .error((error) => {
          dispatch(setNotification(error.message, 10, null))
        })
    }

  }
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  const createNew = (newItem) => {
    blogService
      .create(newItem)
      .then(() => {
        dispatch(setNotification(`a new blog ${title} by ${author} added`, 10, null))
      })
      .catch((error) => {
        dispatch(setNotification(error.message, 10, null))
      })
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
      <Creator />
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} updateLike={createNew} removeBlog={removeBlog} />)
      }
    </div >
  )
}

export default App