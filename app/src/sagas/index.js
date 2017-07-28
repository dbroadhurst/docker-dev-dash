import { call, put, takeLatest } from 'redux-saga/effects'

var port = window.location.href.match(/\d+/g)
if (!port[1]) {
  port = port[0]
} else {
  port = port[1]
}

function loadInfo(url) {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res)
      }
    })
    .then(json => {
      return json
    }, e => {
      throw new Error(`could not load ${url}`)
    })
}

function* loadContainersInfo(action) {
  let containersInfo = yield call(loadInfo, `http://localhost:${port}/ps`)
  for (let container of containersInfo) {
    let log = yield call(loadInfo, `http://localhost:${port}/logs/${container.ID}`)
    container.log = decodeURI(log.log)
  }
  yield put({ type: 'SET_CONTAINERS_INFO', payload: containersInfo })
}

function* loadDockerInfo(action) {
  let info = yield call(loadInfo, `http://localhost:${port}/info`)
  yield put({ type: 'SET_DOCKER_INFO', payload: info })
}

export default function* mySaga() {
  yield takeLatest('LOAD_CONTAINERS_INFO', loadContainersInfo)
  yield takeLatest('LOAD_DOCKER_INFO', loadDockerInfo)
}

