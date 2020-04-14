import axios from 'axios'
import { message } from 'antd'

// NODE_ENV不是process.env对象上原有的属性，它是我们自己添加上去的一个环境变量，用来确定当前所处的开发阶段。一般生产阶段设为production，开发阶段设为develop，然后在脚本中读取process.env.NODE_ENV。
// 运行脚本时，可以这样改变环境变量, 在package.json文件的scripts里面添加命令：
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/249906' : ''
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // 在发起请求请做一些业务处理
    console.log(config)
    config.data = Object.assign({}, config.data, {
        // authToken:window.localStorage.getItem('authToken')
        authToken: 'itisatokenplaceholders'
    })
    return config
}, function (error) {
    // 对请求失败做处理
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做处理
    console.log(response)
    if (response.data.code === 200) {
        return response.data.data
    } else {
        // 全局处理错误
        message.error(response.data.errMsg)
    }
},
    function (error) {
        // 对响应错误做处理
        return Promise.reject(error)
    });


// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/api/v1/articleList', {
        offset, limited
    })
}

// 通过id删除文章
export const deleteArticleById = (id) => {
    return service.post(`/api/v1/articleDelete/${id}`)
}

// 通过id获取文章
export const getArticleById = (id) => {
    return service.post(`/api/v1/article/${id}`)
}

// 保存文章
export const saveArticle = (id, data) => {
    return service.post(`/api/v1/articleEdit/${id}`, data)
}

// 获取文章阅读量
export const getArticleAmount = () => {
    return service.post('/api/v1/articleAmount')
}
// 获取通知列表
export const getNotifications = () => {
    return service.post('/api/v1/notifications')
}
