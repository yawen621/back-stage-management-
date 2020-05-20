import React, { Component } from 'react'
import { adminRouter } from './HouTai/routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Frame } from './HouTai/components'
import { connect } from 'react-redux'
import { NoAuth, Home, Equipment, ArticleList, Note, Adduser, Queryuser, Searchequipment } from './HouTai/views'
const mapState = (state) => ({
    isLogin: state.users.isLogin,
    role: state.users.deletes
})
@connect(mapState)
class App extends Component {
    render() {
        console.log(this.props)
        return (
            this.props.isLogin
                ?
                <Frame>
                    <Switch>
                        {/* {
                            adminRouter.map(route => {
                                const hasPermission = route.roles.includes(this.props.role)
                                if (route.children) {
                                    route.children.map(val => {
                                        const hasPermissions = val.roles.includes(this.props.role)
                                        console.log(val.pathname+':'+hasPermissions)
                                        return hasPermissions ? <Route
                                        key={val.pathname}
                                        path={val.pathname}
                                        exact={val.exact}
                                        render={(routerProps)=>{
                                            return <val.component{...routerProps}/>
                                        }}
                                        /> : <NoAuth />
                                    })
                                }
                                return hasPermission ? <Route
                                    key={route.pathname}
                                    path={route.pathname}
                                    exact={route.exact}
                                    render={(routerProps) => {
                                        return <route.component{...routerProps} />
                                    }} /> : <NoAuth />
                            })
                        } */}
                        <Route key={'/admin/home'} path='/admin/home' exact component={Home}></Route>
                        <Route key={'/admin/equipment'} path='/admin/equipment' exact component={Equipment}></Route>
                        <Route key={'/admin/article'} path='/admin/article' exact component={ArticleList}></Route>
                        <Route key={'/admin/note'} path='/admin/note' exact component={Note}></Route>
                        <Route key={'/admin/adduser'} path='/admin/adduser' exact component={Adduser}></Route>
                        <Route key={'/admin/queryuser'} path='/admin/queryuser' exact component={Queryuser}></Route>
                        <Route key={'/admin/Searchequipment'} path='/admin/Searchequipment' exact component={Searchequipment}></Route>
                        <Redirect to={adminRouter[0].pathname} from='/admin' exact />
                        <Redirect to='/404' />
                    </Switch>
                </Frame>
                :
                <Redirect to="/login" />
        )
    }
}

export default App