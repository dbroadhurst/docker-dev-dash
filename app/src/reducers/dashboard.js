export const LOAD_CONTAINERS_INFO = 'LOAD_CONTAINERS_INFO'
export const SET_CONTAINERS_INFO = 'SET_CONTAINERS_INFO'
export const LOAD_DOCKER_INFO = 'LOAD_DOCKER_INFO'
export const SET_DOCKER_INFO = 'SET_DOCKER_INFO'

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

// Handler is a saga
export const loadDockerInfo = () => {
  return {
    type: LOAD_DOCKER_INFO
  }
}

export const setDockerInfo = (info) => {
  return {
    type: SET_DOCKER_INFO,
    payload: info
  }
}

const ACTION_HANDLERS = {
  [SET_CONTAINERS_INFO]: (state, action) => {
    return { ...state, containers: action.payload }
  },
  [SET_DOCKER_INFO]: (state, action) => {
    return { ...state, info: action.payload }
  }
}

let defaultState = {
  containers: [],
  info: {}
}

export const dashboard = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
