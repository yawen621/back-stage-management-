import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
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
    isNav: true
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon: UnorderedListOutlined,
    isNav: true,
    exact: true
}, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
}, {
    pathname: '/admin/settings',
    component: Settings,
    icon: SettingOutlined,
    title: '设置',
    isNav: true
}
]