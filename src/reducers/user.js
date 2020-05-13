import actionTypes from "../actions/actionTypes"
const isLogin = Boolean(localStorage.getItem("authToken")) || Boolean(sessionStorage.getItem("authToken")) 
const users = JSON.parse(localStorage.getItem("users")) || JSON.parse(sessionStorage.getItem("users"))
const initState = {
    ...users,
    isLogin,  //是否登录
    isLoading:false //登录时的loading
}

export default (state=initState,action)=>{
    switch (action.type) {
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLoading:true   //正在开始进行登录了
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLogin:true,
                isLoading:false
            }
        case actionTypes.LOGIN_FAILED:
            return {
                id:"",
                avatar:"",
                displayName:"",
                role:"",
                isLogin:false,
                isLoading:false
            }
        default:
            return state;
    }
}