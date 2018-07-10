import { makeActionCreator } from 'utils/common'
import constants from 'constants/actionTypes'

export const setRunning = makeActionCreator(constants.SET_RUNNING, 'payload')
export const setTimeLeft = makeActionCreator(constants.SET_TIME_LEFT, 'payload')