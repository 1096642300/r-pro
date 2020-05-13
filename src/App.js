import React, { Component } from 'react'
import {Route,Switch,Redirect} from "react-router-dom"
import {adminRoute} from "./routes"
import {Frame} from "./components"
import {connect} from "react-redux"
const menu = adminRoute.filter(route=>route.isNav===true)

const mapState = state=>({                      
    isLogin:state.user.isLogin,
    role:state.user.role
})

@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin ?
                    <Frame menu={menu}>
                        <Switch>
                            {
                                adminRoute.map(route=>{
                                    return <Route 
                                        path={route.pathname}
                                        key={route.pathname}
                                        exact={route.exact}
                                        render={(routeProps)=>{
                                            const hasPermission = route.roles.includes(this.props.role)
                                            return  hasPermission?<route.component {...routeProps}/>:<Redirect to="/admin/noauth"/>
                                        }}
                                    />
                                })
                            }
                            <Redirect to={adminRoute[0].pathname} from="/admin" exact/>
                            <Redirect to="/404"/>
                        </Switch>
                    </Frame>
                :
                    <Redirect to="/login"/>
        )
    }
}

export default  App