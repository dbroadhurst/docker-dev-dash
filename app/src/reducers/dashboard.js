export const LOAD_CONTAINERS_INFO = 'LOAD_CONTAINERS_INFO'
export const SET_CONTAINERS_INFO = 'SET_CONTAINERS_INFO'

// Handler is a saga
export const loadContainersInfo = () => {
  return {
    type: LOAD_CONTAINERS_INFO
  }
}

export const setContainersInfo = (info) => {
  return {
    type: SET_CONTAINERS_INFO,
    payload: info
  }
}

const ACTION_HANDLERS = {
  [SET_CONTAINERS_INFO]: (state, action) => {
    return { ...state, containers: action.payload }
  }
}

let defaultState = {
  containers: []
}

export const dashboard = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
