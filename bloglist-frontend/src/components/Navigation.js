import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Link } from "react-router-dom"
import user from '../services/user'

const Navigation = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const logout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
        window.location.reload();
    }
    const padding = {
        padding: "5px"
    }
    const navStyle = {
        background: "grey"
    }
    return (
        <div style={navStyle}>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/user">user</Link>
            {user && user.username} logged in
            <button onClick={() => logout()}>logout</button>
        </div>

    )
}

export default Navigation