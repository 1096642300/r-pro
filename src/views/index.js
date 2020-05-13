//使用react-loadable进行路由懒加载
import Loadable from 'react-loadable';
// import Loadable from "./loadable"
import {Loading} from "../components"

const ArticleList = Loadable({
    loader:()=>import("./Article"),
    loading:Loading
})
const ArticleEdit = Loadable({
    loader:()=>import("./Article/Edit"),
    loading:Loading
})
const Dashboard = Loadable({
    loader:()=>import("./Dashboard"),
    loading:Loading
})
const Settings = Loadable({
    loader:()=>import("./Settings"),
    loading:Loading
})
const Login = Loadable({
    loader:()=>import("./Login"),
    loading:Loading
})
const NotFound = Loadable({
    loader:()=>import("./NotFound"),
    loading:Loading
})
const Notifications = Loadable({
    loader:()=>import("./Notifications"),
    loading:Loading
})
const NoAuth = Loadable({
    loader:()=>import("./NoAuth"),
    loading:Loading
})

export {
    ArticleList,
    ArticleEdit,
    Dashboard,
    Settings,
    Login,
    NotFound,
    Notifications,
    NoAuth
}