import actionTypes from '../action/actionTypes'
const initState = {
    list: [{
        userId: 1,
        id: 1,
        title: '我不知道我在说什么',
        body: '傻瓜是怎么炼成的'
    },
    {
        userId: 2,
        id: 2,
        title: '22222222222222222',
        body: '22222222222222222222222'
    }],
    errMsg:'',
    isLoading: false
}
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCH_BLOG_LIST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_BLOG_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload.list,
                errMsg:''
            }
        case actionTypes.FETCH_BLOG_LIST_FAILED:
            return {
                ...state,
                isLoading: false,
                errMsg:'有些不正常'
            }
        default:
            return state
    }
}