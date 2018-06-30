import { makeActionCreator } from 'utils/common'
import constants from 'constants/actionTypes'

export const setRunning = makeActionCreator(constants.SET_RUNNING, 'payload')
export const setTimeRemaining = makeActionCreator(constants.SET_TIME_REMAINING, 'payload')