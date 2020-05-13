import React,{Component} from "react"
//Loadable就是一个函数，内部接受一个对象，最终返回一个组件
const Loadable = ({loader,loading:Loading})=>{
    return class LoadableComponent extends Component{
        state = {
            LoadComp:null
        }
        componentDidMount(){
            //import("./Article") ==> 返回一个promise对象
            loader().then(res=>{
                this.setState({
                    LoadComp:res.default
                })
            })
        }
        render(){
            let {LoadComp} = this.state;
            return (
                LoadComp?<LoadComp/>:<Loading/>
            )
        }
    } 
}

export default Loadable;