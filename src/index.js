import React from 'react'
import ReactDOM from 'react-dom'
import App from './Router'

// import store from './Redux/store'

// Provider是react-redux提供的一个组件
// import { Provider } from 'react-redux'
// import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

ReactDOM.render(
    // 一般就直接吧这个组件放在应用程序的最顶层，这个组件必须有一个store属性，这个store属性的值就是咱们创建的那个store
    // 只要在外层包裹这个Provider那么多有的后代组件都可以使用Redux.connect做链接
    // <Provider store={store}>
    // <Router>
    //     <Route component={App}/>
    // </Router>
    //  </Provider> 
    <App/>
    , document.querySelector('#root'))