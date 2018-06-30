import constants from 'constants/actionTypes'

function countdown(state = {
  running: false,
  timeRemaining: 0
}, action) {
  const { payload, type } = action
  switch (type) {
    case constants.SET_RUNNING:
      return {
        ...state,
        running: payload
      }
    case constants.SET_TIME_REMAINING:
      return {
        ...state,
        timeRemaining: payload
      }
    default:
      return state
  }
}

export default countdown
