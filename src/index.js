import React from 'react'
import ReactDOM from 'react-dom'
import App from './Router'
// import App from './redux+immutable'
// import {cloneDeep} from 'lodash'
// import {Map,List,fromJS,toJS} from 'immutable'
// import store from './Redux/store'
// import store from './redux+immutable/store'
// Provider是react-redux提供的一个组件
// import { Provider } from 'react-redux'
// import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

// const state={
//     name:'QF',
//     obj:{
//         x:1,
//         y:{
//             z:2
//         }
//     },
//     courses:['h5','java','python']
// }

// const newState=state
// const newState=cloneDeep(state)
// const newState=JSON.parse(JSON.stringify(state))
// const newState=Map(state)
// console.log(newState===state)
// // newState.courses.push('UI')
// const neImState=newState.set('name','路飞教育')
// console.log(newState.get('name'),neImState.get('name'))

// const list1=List([1,2]);
// const list2=list1.push(3,4,5);
// console.log(list1.get(0),list2.get(4))
// const imState=fromJS(state)
// console.log(imState.get('courses').get(0))
// console.log(imState.getIn(['courses',0]))
// const newImState1=imState.updateIn(['obj','y','z'],v=>v+1)
// console.log(newImState1.getIn(['obj','y','z']))
// console.log(imState.getIn(['obj','y','z']))
// console.log(imState.toJS().obj.y.z)

ReactDOM.render(
    // 一般就直接吧这个组件放在应用程序的最顶层，这个组件必须有一个store属性，这个store属性的值就是咱们创建的那个store
    // 只要在外层包裹这个Provider那么多有的后代组件都可以使用Redux.connect做链接
    // <Provider store={store}>
    // <Router>
    //     <Route component={App}/>
    // </Router>
    //  </Provider> 
    // <Provider store={store}>
    <App/>
    // </Provider>
    , document.querySelector('#root'))