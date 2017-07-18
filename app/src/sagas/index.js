import { call, put, takeLatest } from 'redux-saga/effects'

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
  let containersInfo = yield call(loadInfo, 'http://localhost:3030/containers')
  for (let container of containersInfo) {
    let log = yield call(loadInfo, `http://localhost:3030/logs/${container.id}`)
    container.log = decodeURI(log.log)
  }
  yield put({ type: 'SET_CONTAINERS_INFO', payload: containersInfo })
}

export default function* mySaga() {
  yield takeLatest('LOAD_CONTAINERS_INFO', loadContainersInfo)
}
