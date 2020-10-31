import loginService from '../services/login'
import userService from '../services/user'
const initState = {
    user: undefined,
    userList: []
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.data
            }
        case 'SET_USERLIST':
            return {
                ...state,
                userList: action.data
            }
        default:
            return state
    }
}

export const userLogin = user => {
    return async dispatch => {
        const token = await loginService.login(user)
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        dispatch({
            type: 'SET_USER',
            data: {
                username: user.username,
                token
            },
        })
    }
}

export const setUserList = () => {
    return async dispatch => {
        const userList = await userService.getAll()
        dispatch({
            type: 'SET_USERLIST',
            data: userList,
        })
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export default userReducer