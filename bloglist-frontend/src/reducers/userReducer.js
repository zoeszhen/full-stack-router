import loginService from '../services/login'
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data
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

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export default userReducer