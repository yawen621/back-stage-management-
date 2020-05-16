import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile,
    Authority,
    Home
} from '../views'
import { VideoCameraOutlined, ReadOutlined, MailOutlined, UnlockOutlined,HomeOutlined} from '@ant-design/icons'

export const mainRouter = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

export const adminRouter = [{
    pathname:'/admin/home',
    icon:HomeOutlined,
    component:Home,
    isNav: true,
    title:'首页',
    isNav:true,
    roles:['001']
},{
    pathname: '/admin/dashboard',
    component: Dashboard,
    icon: VideoCameraOutlined,
    title: '设备查看',
    isNav: true,
    roles: ['001'],
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: '通讯录查看',
    icon: ReadOutlined,
    isNav: true,
    exact: true,
    roles: ['001']
}, {
    pathname: '/admin/settings',
    component: Settings,
    icon: MailOutlined,
    title: '短信查看',
    isNav: true,
    roles: ['001']
}, {
    pathname: '/admin/authority',
    component: Authority,
    icon: UnlockOutlined,
    isNav: true,
    title: '权限管理',
    roles: ['001']
},
{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    roles: ['001']
}, {
    pathname: '/admin/noauth',
    component: NoAuth,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/Notifications',
    component: Notifications,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/profile',
    component: Profile,
    roles: ['001', '002', '003']
}
]