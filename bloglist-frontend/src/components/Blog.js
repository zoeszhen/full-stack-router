import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, incrementLike, removeBlog } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  if (blogs) {
    return (
      blogs.map((blog) =>
        <div key={blog.id} style={blogStyle}>
          <div data-cy={`blog-${blog.title}`}>
            {blog.title}
          </div>
          <div data-cy={`blog-${blog.author}`}>
            {blog.author}
          </div>
          {isOpen !== blog.id && <button data-cy="view-button" onClick={() => setIsOpen(blog.id)} >
            view
          </button>}
          {isOpen === blog.id &&
            <>
              <button data-cy="view-button" onClick={() => setIsOpen(null)} >
                hide
              </button>
              <div data-cy={`blog-${blog.title}-like`}>
                likes: {blog.likes}
                <button data-cy="like-button" onClick={() => { dispatch(incrementLike(blog.id)) }}>like</button>
              </div>
              {blog.url && <div>
                url: {blog.url}
              </div>}
              <button data-cy="delete-button" onClick={() => dispatch(removeBlog(blog.id))}>delete</button>
            </>
          }
        </div>)

    )
  }
  return <div>wait</div>
}

export default Blog
