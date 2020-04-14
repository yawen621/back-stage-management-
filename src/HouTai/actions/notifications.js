import actionTypes from './actionType'
import { getNotifications } from '../requests'
const starMarkAsRead = () => {
    return {
        type: actionTypes.START_NOTIFICATION_POST
    }
}

const finishMarkAsRead = () => {
    return {
        type: actionTypes.FINISH_NOTIFICATION_POST
    }
}

export const markNotificationAsReadById = id => dispatch => {
    dispatch(starMarkAsRead())
    // 这里模拟的一个服务端(ajax)请求
    setTimeout(() => {
        dispatch({
            type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
            payload: {
                id
            }
        })
        dispatch(finishMarkAsRead())
    }, 2000)
}
export const markAllNotificationAsRead = () => dispatch => {
    dispatch(starMarkAsRead())
    // 这里模拟的一个服务端(ajax)请求
    setTimeout(() => {
        dispatch({
            type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ,
        })
        dispatch(finishMarkAsRead())
    }, 2000)
}

export const getNotificationsList = () => dispatch => {
    dispatch(starMarkAsRead())
    getNotifications()
        .then(resp => {
            dispatch({
              type:actionTypes.RECIVED_NOTIFICATIONS,
              payload:{
                  list:resp.list
              }
            })
            dispatch(finishMarkAsRead())
        })
}