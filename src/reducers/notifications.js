import actionTypes from "../actions/actionTypes"
const initState = {
    isLoading:false,
    list:[]
}
const reducer = (state=initState,action)=>{
    switch (action.type) {
        case actionTypes.RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.list  //这里是异步请求获取到的数据
            }
        case actionTypes.START_NOTIFICATIONS_POST:
            return {
                ...state,
                isLoading:true  //代表正在加载
            }
        case actionTypes.END_NOTIFICATIONS_POST:
            return {
                ...state,
                isLoading:false //代表加载完毕了
            }
        case actionTypes.MARK_NOTIFICATIONS_BY_ID:
            const newList = state.list.map(item=>{
                if(item.id === action.payload.id){
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
        case actionTypes.MARK_NOTIFICATIONS:
            return {
                ...state,
                list:state.list.map(item=>{   //[{hasRead:true},{hasRead:true}]
                    item.hasRead = true
                    return item
                })
            }
        default:
            return state;
    }
}

export default reducer;