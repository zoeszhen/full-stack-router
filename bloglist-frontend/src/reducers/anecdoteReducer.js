import anecdotesService from "../service/anecdotes"
const reducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'VOTE':
      return state
        .map((anecdote) => anecdote.id === action.data.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    default: return state
  }
}

export const incrementVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdote = () => {
  return async dispatch => {
    const notes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: notes,
    })
  }
}
export default reducer