import React, { Component } from 'react'
import {Card,Button, List,Badge,Spin} from "antd"
import {connect} from "react-redux"
import {markNoticationsByID,markAllNotications} from "../../actions/notifications"


const mapState = state=>{
    return {
        list:state.notifications.list,
        isLoading:state.notifications.isLoading
    }
}

@connect(mapState,{markNoticationsByID,markAllNotications})
class Notifications extends Component {
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card 
                    title={"通知中心"}
                    extra={<Button onClick={this.props.markAllNotications} disabled={this.props.list.every(item=>item.hasRead===true)}>全部标记为已读</Button>} 
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                        <List.Item
                            extra={item.hasRead?null:<Button onClick={this.props.markNoticationsByID.bind(this,item.id)}>标记已读</Button>}
                        >
                            <List.Item.Meta
                                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                description={item.desc}
                            />
                        </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }
}


export default  Notifications



// var arr = [3,3,3]

// var flag = arr.every(item=>item===3)
// console.log(flag)