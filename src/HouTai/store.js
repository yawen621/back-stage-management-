// createStore是redux提供的一个用于创建store的方法，这个原理已经讲到过
import {createStore,applyMiddleware} from 'redux'
// 异步执行方法需要thunk
import thunk from 'redux-thunk'
// 引入合并后的reducer
import rootReducer from './reducers'
export default createStore(
    rootReducer,
    applyMiddleware(thunk)
)