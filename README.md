千锋教育
react+antd后套管理项目

redux的使用先安装
npm i redux react-redux //异步使用redux-thunk -S

新建文件夹
reducers actions
新建文件store.js
固定的内容
import {createStore} from 'redux'
import rootReducer from './reducers'

export default createStore(
    rootReducer
)

redux-immutable结合redux使用
必选先安装redux-immutable immutable
把reducers中的redux改为redux-immutable