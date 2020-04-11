import React, { Component } from 'react'
// React-router：提供了router的核心api。如Router、Route、Switch等，但没有提供有关dom操作进行路由跳转的ap；
// React-router-dom：提供了BrowserRouter、Route、Link等api，可以通过dom操作触发事件控制路由。
import { Route,NavLink as Link ,Redirect,Switch} from 'react-router-dom'
import {
    Artical,
    Home,
    Users,
    ArticalDetail,
    NotFound
} from './views'


export default class App extends Component {
    state={
        isLogin:false
    }
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/home">首页</Link>
                    </li>
                    <li>
                        <Link to="/artical">文章</Link>
                    </li>
                    <li>
                        <Link to="/users">用户</Link>
                    </li>
                </ul>
                <Switch>
                <Route path="/home" component={Home}/>
                <Route component={Artical} path="/artical" exact/>
                <Route path="/users" render={(routeProps)=>{
                    return this.state.isLogin ?<Users {...routeProps}/> : <div>请登录</div>
                }}/>
                <Route component={ArticalDetail} path="/artical/:id"/>
                <Route component={NotFound} path="/404"/>
                <Redirect to="/home" from="/" exact></Redirect>
                <Redirect to="/404"></Redirect>
                </Switch>
            </div>
        )
    }
}
