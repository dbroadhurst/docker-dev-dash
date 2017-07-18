
import { combineReducers } from 'redux'
import { dashboard } from './dashboard'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  dashboard,
  form: formReducer
})

export default reducers

