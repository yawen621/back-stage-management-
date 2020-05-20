import axios from 'axios'
import { message } from 'antd'

// NODE_ENV不是process.env对象上原有的属性，它是我们自己添加上去的一个环境变量，用来确定当前所处的开发阶段。一般生产阶段设为production，开发阶段设为development，然后在脚本中读取process.env.NODE_ENV。
// 运行脚本时，可以这样改变环境变量, 在package.json文件的scripts里面添加命令：
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://cs.888dfp.com:9070' : '',
    withCredentials: true,
    crossDomain: true,
    //默认返回json数据
    responseType: 'json',
    //post请求头
    headers: { "Content-Type": "application/json" }
})

service.interceptors.request.use(config => {

    if (config.url !== "user/login") {
        config.headers.Authorization = localStorage.token || sessionStorage.token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// 响应拦截器
service.interceptors.response.use(response => {
    console.log(response)
    if (response.data.code === 500) {
        message.error('对不起出错了哦')
    }
    return Promise.resolve(response)
}, (error) => {
    if (error.response) {
        const { status } = error.response;
        if (status == 401) {
            localStorage.removeItem("token");
        } else {
            alert("出错了,联系管理员")
        }
    }
    return Promise.reject(error)
})

// 获取首页数据
export const getHome = () => {
    return service.post('/select/home')
}
// 获取通讯录列表
export const getArticles = (pageSize, curPage) => {
    return service.post('/select/communication', {
        pageSize, curPage
    })
}
// 获取设备列表
export const getEquipment = (pageSize, curPage) => {
    return service.post('/select/device', {
        pageSize, curPage
    })
}
// 搜索设备
export const getSearchEquipment = (content) => {
    return service.post('/search/device', {
        content
    })
}
//获取短信列表
export const getNote = (pageSize, curPage) => {
    return service.post('/select/sms', {
        pageSize, curPage
    })
}
// 获取通讯录可视化数据
export const getVisualArticleById = () => {
    return service.post('/select/statisphone')
}
// 获取访问量可视化数据
export const getPageView = () => {
    return service.post('/select/statistics')
}
// 获取短信可视化数据
export const getNoteEcHar = () => {
    return service.post('/select/statisphone')
}
// 查询用户
export const getqueryuser = (pageSize, curPage) => {
    return service.post('/admin/select', { pageSize, curPage })
}
// 添加用户
export const getadduser = (username, pwd, role) => {
    return service.post('/admin', { username, pwd, role })
}
// 删除用户
export const getdleteuser = (uid) => {
    return service.post('/delet/admin', { uid })
}
// 通过sid删除短信
export const deleteNote = (sid) => {
    return service.get('/delet/sms', { params: { sid } })
}
// 通过uid删除通讯录
export const deleteArticleById = (uid) => {
    return service.get('/delet/communication', { params: { uid } })
}
// 通过pid删除设备
export const deleteEquipment = (pid) => {
    return service.get('/delet/device', { params: { pid } })
}
// 删除全部通讯录
export const deleteArticleall = () => {
    return service.delete('/delet/communication')
}
// 删除全部设备
export const deleteEquipmentall = () => {
    return service.delete('/delet/device')
}
// 删除全部设备
export const deleteNoteall = () => {
    return service.delete('/delet/sms')
}

// 登录
export const loginRequest = (userInfo) => {
    return service.post('/login', userInfo)
}