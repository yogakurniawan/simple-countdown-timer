export default function middleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, type, ...rest } = action
    if (!promise) {
      return next(action)
    }

    next({ ...rest, type: type.REQUEST })

    promise
      .then(response => next({ ...rest, payload: response, type: type.SUCCESS }))
      .catch((error) => {
        console.error('MIDDLEWARE ERROR:', error)
        next({ ...rest, error, type: type.FAILURE })
      })

    return promise
  }
}
