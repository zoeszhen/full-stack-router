import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { userLogin } from "../reducers/userReducer"
import { initBlogs } from "../reducers/blogsReducer"


const LoginForm = () => {
    const initUser = {
        username: "",
        password: ""
    }
    const [user, setLocalUser] = useState(initUser)
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(userLogin(user))
        dispatch(initBlogs())
    }

    const { username, password } = user
    return (
        <div>
            <h2 data-cy="loginTitle">Log in to application</h2>
            <form onSubmit={handleLogin} data-cy="submit">
                <div>
                    username
          <input
                        data-cy="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setLocalUser((preState) => ({ ...preState, username: target.value }))}
                    />
                </div>
                <div>
                    password
          <input
                        data-cy="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setLocalUser((preState) => ({ ...preState, password: target.value }))}
                    />
                </div>
                <button data-cy="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm;