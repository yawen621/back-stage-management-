import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './HouTai/routes'
import HouTai from './HouTai'
import './index.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import store from './HouTai/store'
// Provider是react-redux提供的一个组件
// 一般就直接吧这个组件放在应用程序的最顶层，这个组件必须有一个store属性，这个store属性的值就是咱们创建的那个store
// 只要在外层包裹这个Provider那么多有的后代组件都可以使用Redux.connect做链接
import { Provider } from 'react-redux'
export default class Routers extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConfigProvider locale={zhCN}>
                    <Router>
                        <Switch>
                            <Route path="/admin" component={HouTai} />
                            {
                                mainRouter.map(route => {
                                    return <Route key={route.pathname} path={route.pathname} component={route.component} />
                                })
                            }
                            <Redirect to="/admin" from='/' exact></Redirect>
                            <Redirect to="/404"></Redirect>
                        </Switch>
                    </Router>
                </ConfigProvider>
            </Provider>
        )
    }
}
