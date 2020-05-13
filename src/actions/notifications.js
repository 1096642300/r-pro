import actionTypes from "./actionTypes"
import {requestNotifications} from "../request"
const startNoticationsPost = ()=>{
    return {
        type:actionTypes.START_NOTIFICATIONS_POST
    }
}
const endNoticationsPost = ()=>{
    return {
        type:actionTypes.END_NOTIFICATIONS_POST
    }
}

export const markNoticationsByID = id=>{
    return dispatch=>{
        dispatch(startNoticationsPost())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATIONS_BY_ID,
                payload:{
                    id
                }
            })
            dispatch(endNoticationsPost())
        },1000)
    }
}

export const markAllNotications = ()=>{
    return dispatch=>{
        dispatch(startNoticationsPost())  
        setTimeout(()=>{
            dispatch({type:actionTypes.MARK_NOTIFICATIONS})
            dispatch(endNoticationsPost())
        },1000)
    }
}


//异步请求notifications数据
export const getNotifications = ()=>{
    return dispatch=>{
        dispatch(startNoticationsPost())  
        requestNotifications()
            .then(res=>{
                dispatch({
                    type:actionTypes.RECEIVE_NOTIFICATIONS,
                    payload:{
                        list:res.list
                    }
                })
                dispatch(endNoticationsPost())
            })        
    }
}