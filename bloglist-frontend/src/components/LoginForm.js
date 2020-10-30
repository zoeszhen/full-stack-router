import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"


const LoginForm = () => {
    const initUser = {
        username: "",
        password: ""
    }
    const dispatch = useDispatch()
    const [user, setUser] = useState(initUser)
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            // blogService.setToken(user.token)
            setUser(initUser)
            // blogService.getAll().then(blogs =>
            //     setBlogs(blogs)
            // )
        } catch (error) {
            dispatch(setNotification(error.message, 10, null))
        }
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
                        onChange={({ target }) => setUser((preState) => ({ ...preState, username: target.value }))}
                    />
                </div>
                <div>
                    password
          <input
                        data-cy="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setUser((preState) => ({ ...preState, password: target.value }))}
                    />
                </div>
                <button data-cy="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm;