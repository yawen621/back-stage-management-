import {
    Equipment,
    Login,
    NotFound,
    Note,
    ArticleList,
    NoAuth,
    Profile,
    Home,
    Adduser,
    Queryuser,
    Searchequipment
} from '../views'
import { VideoCameraOutlined, ReadOutlined, MailOutlined, UnlockOutlined, HomeOutlined, UsergroupAddOutlined, SearchOutlined, VideoCameraAddOutlined } from '@ant-design/icons'

export const mainRouter = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}, {
    pathname: '/admin/noauth',
    component: NoAuth,
}]

export const adminRouter = [{
    pathname: '/admin/home',
    icon: HomeOutlined,
    component: Home,
    isNav: true,
    title: '首页',
    roles: [1]
}, {
    title: '设备查看',
    isNav: true,
    roles: [1],
    children: [{
        pathname: '/admin/equipment',
        component: Equipment,
        icon: VideoCameraOutlined,
        title: '设备查看',
        isNav: true,
        roles: [1],
    },{
        pathname:'/admin/Searchequipment',
        conmponent:Searchequipment,
        icon:VideoCameraAddOutlined,
        title:'搜索设备',
        isNav:true,
        roles:[1]
    }]
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: '通讯录查看',
    icon: ReadOutlined,
    isNav: true,
    exact: true,
    roles: [1]
}, {
    pathname: '/admin/note',
    component: Note,
    icon: MailOutlined,
    title: '短信查看',
    isNav: true,
    roles: [1]
}, {
    icon: UnlockOutlined,
    isNav: true,
    title: '权限管理',
    roles: [1],
    children: [{
        pathname: '/admin/queryuser',
        component: Queryuser,
        icon: SearchOutlined,
        isNav: true,
        title: '查询用户',
        roles: [1]
    }, {
        pathname: '/admin/adduser',
        component: Adduser,
        icon: UsergroupAddOutlined,
        isNav: true,
        title: '添加用户',
        roles: [1]
    }]
}, {
    pathname: '/admin/profile',
    component: Profile,
    roles: [1]
}
]