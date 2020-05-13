//使用axios进行异步操作
import axios from "axios"
import {message} from "antd"
message.config({
    top: 200
})
const isDev = process.env.NODE_ENV === "development"
//   /api/v1/articleList
const service = axios.create({
    baseURL: isDev? "http://rap2.taobao.org:38080/app/mock/251909" : 'http://rap2.taobao.org:38080/app/mock/251909'
})


const service2 = axios.create({
    baseURL: isDev? "http://rap2.taobao.org:38080/app/mock/251909" : 'http://rap2.taobao.org:38080/app/mock/251909'
})


//axios的拦截器 （请求之前的拦截、响应之后的拦截）
//请求之前的拦截作用： 可以在每次发送请求之前，可以在请求头上面携带一些数据传送给后端。
service.interceptors.request.use(config=>{
    //console.log("config",config) //token放入localStorage.getItem("authToken")
    // config.data = {...config.data,"authToken":"asldaslkjaslkdsad"}
    config.data = Object.assign({},config.data,{
        authToken:localStorage.getItem("authToken")
    })
    return config;
})

//响应之后的拦截操作  根据后端返回给你的状态码进行业务操作判断。
service.interceptors.response.use(res=>{
    if(res.data.code === 200){
        return res.data.data;
    }else{
        message.error(res.data.errMsg)
    }
})



//获取文章列表
export const getArticle = (offset,limited)=>{
    return service.post("/api/v1/articleList",{offset,limited})
}


//根据id删除文章
export const deleteArticleById = id=>{
    return service.post(`/api/v1/articleDelete/`+id)
}


//根据id获取文章详情
export const getArticleDetailById = id=>{
    return service.post(`/api/v1/article/${id}`)
}


//传入id与data数据进行保存
export const saveArticleById = (id,data)=>{   //saveArtilceByid(id,{title,content,author})
    return service.post(`/api/v1/articlesave/${id}`,data)
}


//所有的通知
export const requestNotifications = ()=>{
    return service.post(`/api/v1/notifications`)
}


//用户登录接口
export const requestLogin = (loginInfo)=>{  
    return service2.post(`/api/v1/login`,loginInfo)
}