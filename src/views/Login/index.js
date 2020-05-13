import React, { Component } from 'react'
import {Card,Form, Icon, Input, Button, Checkbox} from "antd"
import "./login.less"
import {connect} from "react-redux"
import {login} from "../../actions/user"
import {Redirect} from "react-router-dom"

const mapState = state=>({
    isLogin:state.user.isLogin,
    isLoading:state.user.isLoading
})

@connect(mapState,{login})
@Form.create()
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.login(values)
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                this.props.isLogin
                    ?
                    <Redirect to="/admin"/>
                    :
                    <Card 
                        title={"QF QD-Admin"}
                        className="qf-form"
                    >
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                disabled={this.props.isLoading}
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                disabled={this.props.isLoading}
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox  disabled={this.props.isLoading}>Remember me</Checkbox>)}
                            <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            </Form.Item>
                        </Form>
                    </Card>
        )
    }
}

export default  Login