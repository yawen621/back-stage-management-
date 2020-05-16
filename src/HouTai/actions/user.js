import actionTypes from './actionType'
import { loginRequest } from '../requests'

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}
const loginFailed = () => {
    window.localStorage.removeItem('token')
    window.sessionStorage.removeItem('token')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const changeAvatar=(avatarUrl)=>{
    return{
        type:actionTypes.CHANGE_AVATAR,
        payload:{
            avatarUrl
        }
    }
}

export const logout = () => dispatch => {
    dispatch(loginFailed())
}


export const login = (userInfo) => dispatch => {
    dispatch(startLogin())
    loginRequest(userInfo)
        .then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                const {
                    token,
                    ...userInfo
                } = resp.data.data.user.role
                const remember=JSON.parse(resp.config.data).remember
                console.log(remember)
                if (remember === true) {
                    window.localStorage.setItem('token', token)
                    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                } else {
                    window.sessionStorage.setItem('token',token)
                    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
                dispatch(loginSuccess(resp.data.data))
            } else {
                dispatch(loginFailed())
            }
        })
}