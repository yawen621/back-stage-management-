// import {combineReducers} from 'redux'
// immutable和redux结合
import {combineReducers} from 'redux-immutable'

import counter from './counter'
export default combineReducers({
    counter
})