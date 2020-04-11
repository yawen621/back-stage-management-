import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { mainRouter } from './HouTai/routes'
import HouTai from './HouTai'
import './index.less'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
export default class Routers extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route path="/admin" render={(routerProps) => {
                            // TODO权限，需要登录才能访问/admin
                            return <HouTai {...routerProps} />
                        }} />
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
        )
    }
}
