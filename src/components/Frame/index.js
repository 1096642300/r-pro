import React, { Component } from 'react'
import { Layout, Menu, Icon,Dropdown,Avatar,Badge} from 'antd';
import {withRouter} from "react-router-dom"
import Logo from "./logo.png"
import "./index.less"
import {connect} from "react-redux"
import {getNotifications} from "../../actions/notifications"
import {exit} from '../../actions/user'
const { Header, Content, Sider } = Layout;


const mapState = state=>{
  return {
    notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length,
    avatar:state.user.avatar,
    displayName:state.user.displayName
  }
}

@connect(mapState,{getNotifications,exit})
@withRouter    
class Frame extends Component {
   dropDownMenuClick = ({key})=>{
    if(key==="/exit"){ //用户要退出了
      this.props.exit()
    }else{
      this.props.history.push(key)
    }
   }
   componentDidMount(){
     this.props.getNotifications()
   }

    menu = ()=>(
      <Menu onClick={this.dropDownMenuClick}>
        <Menu.Item key={"/admin/notifications"}>
            <Badge dot={Boolean(this.props.notificationsCount)}>
              通知中心
            </Badge>
        </Menu.Item>
        <Menu.Item key={"/admin/settings"}>
            个人设置
        </Menu.Item>
        <Menu.Item key={"/exit"}>
            退出
        </Menu.Item>
      </Menu>
    );
    handleClick = ({ key })=>{
      this.props.history.push(key)
    }
    render() {
      let selectedKeysArr = this.props.location.pathname.split("/")
      selectedKeysArr.length = 3
        return (
            <Layout>
                <Header className="header qf-header">
                    <div className="logo" >
                        <img className="qf-logo" src={Logo} alt=""/>
                    </div>
                    <Dropdown overlay={this.menu()}>
                      <div className="ant-dropdown-link" style={{display:"flex","alignItems":"center"}}>
                        <Avatar src={this.props.avatar} />
                        <span>欢迎您：{this.props.displayName}</span> 
                        <Badge count={this.props.notificationsCount} offset={[-10,-10]}>
                          <Icon type="down" />
                        </Badge>
                      </div>
                    </Dropdown>
                </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[selectedKeysArr.join("/")]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={this.handleClick}
                >
                    {
                      this.props.menu.map(item=>{
                        return (
                          <Menu.Item key={item.pathname}>
                            <Icon type={item.type}/>
                            {item.title}
                          </Menu.Item>
                        )
                      })
                    }
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px' }}>
                <Content
                  style={{
                    background: '#fff',
                    margin: 0,
                  }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}

export default Frame