const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotification = (content, duration, timerId) => {
    return dispatch => {
        if (timerId) {
            clearTimeout(timerId);
        }
        const newTimerId = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: null
            })
        }, duration * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { content, timerId: newTimerId }
        })

    }
}

export default notificationReducer;