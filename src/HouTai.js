import React, { Component } from 'react'
import { adminRouter } from './HouTai/routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import  {Frame}  from './HouTai/components'
import {connect} from 'react-redux'
const mapState=(state)=>({
    isLogin:state.users.isLogin,
    role:state.users.role
})
@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin
            ?
            <Frame>
                <Switch>
                    {
                        adminRouter.map(route => {
                            return <Route
                                key={route.pathname}
                                path={route.pathname}
                                exact={route.exact}
                                render={(routerProps) => {
                                    const hasPermission=route.roles.includes(this.props.role)
                                    return hasPermission ? <route.component{...routerProps} /> : <Redirect to="/admin/noauth"/>
                                }} />
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact />
                    <Redirect to='/404' />
                </Switch>
            </Frame>
            :
            <Redirect to="/login"/>
        )
    }
}

export default App