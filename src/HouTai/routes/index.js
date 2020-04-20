import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile
} from '../views'
import { DashboardOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons'

export const mainRouter = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    icon: DashboardOutlined,
    title: '仪表盘',
    isNav: true,
    roles:['001','002','003']
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon: UnorderedListOutlined,
    isNav: true,
    exact: true,
    roles:['001']
}, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    roles:['001','002']
}, {
    pathname: '/admin/noauth',
    component: NoAuth,
    roles:['001','002','003']
}, {
    pathname: '/admin/Notifications',
    component: Notifications,
    roles:['001','002','003']
}, {
    pathname: '/admin/profile',
    component: Profile,
    roles:['001','002','003']
}, {
    pathname: '/admin/settings',
    component: Settings,
    icon: SettingOutlined,
    title: '设置',
    isNav: true,
    roles:['001']
}
]