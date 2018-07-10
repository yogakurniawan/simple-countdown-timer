import constants from 'constants/actionTypes'

function countdown(state = {
  running: false,
  timeLeft: 0
}, action) {
  const {
    payload,
    type
  } = action
  switch (type) {
    case constants.SET_RUNNING:
      return {
        ...state,
        running: payload
      }
    case constants.SET_TIME_LEFT:
      return {
        ...state,
        timeLeft: payload
      }
    default:
      return state
  }
}

export default countdown
