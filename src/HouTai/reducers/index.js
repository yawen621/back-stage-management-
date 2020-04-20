// 在实际的项目中，由于只有单一的store，但是状态会有很多分类，所以我们需要划分reducer
// ，createStore的参数又只接受一个reducer,所以redux比较聪明的提供了一个用于合并多个reducer的方法。注意不要手动合并
import {combineReducers} from 'redux'
// 引入cart reducer，如果有多个，继续引入
import notfications from './notification'
import users from './users'
// 导出合并后的reducer
export default combineReducers({
     // 把多个reducer作为combineReducers对象参数传入，在外部可以通过store.getState().cart来获取Reducer里面的state
     notfications,
     users
})