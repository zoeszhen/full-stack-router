import React, { useState } from 'react'
import blogService from "../services/blogs"
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"


const Creator = () => {
    const dispatch = useDispatch()
    const initBlog = {
        url: "",
        author: "",
        title: "",
        likes: 0
    }
    const [isShow, setIsShow] = useState(false)
    const [blog, setBlog] = useState(initBlog)
    const setNewValue = (newItem) => {
        setBlog((prevState) => ({
            ...prevState,
            ...newItem
        }))
    }
    const createNew = () => {
        blogService
            .create(blog)
            .then(() => {
                dispatch(setNotification(`a new blog ${title} by ${author} added`, 10, null))
            })
            .catch((error) => {
                dispatch(setNotification(error.message, 10, null))
            })
    }

    const { url, author, title } = blog;

    return (
        isShow ? <div>
            <h2>Create New</h2>
            <div>
                title
          <input
                    type="text"
                    id="title"
                    data-cy="create-title"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setNewValue({ title: target.value })}
                />
            </div>
            <div>
                author
          <input
                    type="author"
                    id="author"
                    data-cy="create-author"
                    value={author}
                    name="author"
                    onChange={({ target }) => setNewValue({ author: target.value })}
                />
            </div>
            <div>
                url
          <input type="url"
                    id="url"
                    value={url}
                    name="url"
                    data-cy="create-url"
                    onChange={({ target }) => setNewValue({ url: target.value })}
                />
            </div>
            <button data-cy="create-submit" type="submit" onClick={() => createNew()}>create</button>
        </div> :
            <button data-cy="create-isshow" onClick={() => setIsShow(true)}>Create</button>
    )
}

export default Creator