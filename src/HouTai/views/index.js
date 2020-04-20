// import Loadable from 'react-loadable'//npm引入的react-loadable
import loadable from '../views/util/loadable'//自己封装的loadable
// import Loadable from './loadable' //react-loadable简易实现原理
// import {Loading} from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'
// const Dashboard=Loadable({
//     loader:()=>import('./Dashboard'),
//     loading:Loading
// })
// const Settings=Loadable({
//     loader:()=>import('./Settings'),
//     loading:Loading
// })
// const Login=Loadable({
//     loader:()=>import('./Login'),
//     loading:Loading
// })
// const ArticleList=Loadable({
//     loader:()=>import('./Article'),
//     loading:Loading
// })
// const ArticleEdit=Loadable({
//     loader:()=>import('./Article/Edit'),
//     loading:Loading
// })
// const NotFound=Loadable({
//     loader:()=>import('./NotFound'),
//     loading:Loading
// })
const Dashboard=loadable(()=>import('./Dashboard'))
const Settings=loadable(()=>import('./Settings'))
const Login=loadable(()=>import('./Login'))
const ArticleList=loadable(()=>import('./Article'))
const ArticleEdit=loadable(()=>import('./Article/Edit'))
const NotFound=loadable(()=>import('./NotFound'))
const Notifications=loadable(()=>import('./Notifications'))
const NoAuth=loadable(()=>import('./NoAuth'))
const Profile=loadable(()=>import('./Profile'))
export{
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile
}