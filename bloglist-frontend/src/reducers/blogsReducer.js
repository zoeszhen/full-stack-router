import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      return state
        .map((blog) => blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    case 'INIT_BLOG':
      return action.data
    default: return state
  }
}

export const incrementLike = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const notes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: notes,
    })
  }
}
export default reducer