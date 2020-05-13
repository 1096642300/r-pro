import React, { Component,createRef} from 'react'
import {Card,Button,Form, Input,DatePicker,message,Spin} from "antd"
import E from "wangeditor"
import {getArticleDetailById,saveArticleById,movie} from "../../request"
import "./Edit.less"
import moment from "moment"

const formItemLayout = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:20
    }
}
@Form.create()
class ArticleEdit extends Component {
    constructor(){
        super()
        this.conentRef = createRef()
        this.state = {
            isLoading:false
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(values.currentAt.valueOf())
                values.currentAt = values.currentAt.valueOf()
                this.setState({isLoading:true})
                saveArticleById(this.props.match.params.id,values)
                    .then(res=>{
                        message.success(res.msg)
                    }).finally(()=>{
                        this.setState({isLoading:false})
                        //跳入到列表页
                        this.props.history.push("/admin/article")
                    })
            }
        });
    }
    initEditor = ()=>{
        this.editor = new E(this.conentRef.current)
        this.editor.customConfig.onchange =  (html)=> {
            // html 即变化之后的内容
            this.props.form.setFieldsValue({
                content:html
            })
        }
        this.editor.create()
    }
    componentDidMount(){
        this.initEditor()
        //根据id请求数据
        this.setState({isLoading:true})
        getArticleDetailById(this.props.match.params.id)
            .then(res=>{
                const {id,...data} = res  //data = {author,title,currentAt,content,amount}
                data.currentAt = moment(res.currentAt)
                this.props.form.setFieldsValue(data)
                this.editor.txt.html(data.content) //让富文本编辑器里面能够显示content的内容
                // this.props.form.setFieldsValue({
                //     title:res.title,
                //     amount:res.amount,
                //     author:res.author,
                //     currentAt:moment(res.currentAt),
                //     content:res.content
                // })
            }).finally(()=>{
                this.setState({isLoading:false})
            })

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card 
                title={"文章编辑"}
                extra={<Button onClick={this.props.history.goBack}>取消</Button>} 
            >
                <Spin spinning={this.state.isLoading}>
                    <Form 
                        onSubmit={this.handleSubmit}
                        {...formItemLayout}                    
                    >
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: 'Please input your title!' }
                                ]
                            })(
                                <Input placeholder="标题" />
                            )}
                        </Form.Item>
                        <Form.Item label="阅读量">
                            {getFieldDecorator('amount', {
                                rules: [
                                    { required: true, message: 'Please input your amount!' }
                                ]
                            })(
                                <Input placeholder="阅读量" />
                            )}
                        </Form.Item>
                        <Form.Item label="作者">
                            {getFieldDecorator('author', {
                                rules: [
                                    { required: true, message: 'Please input author!' }
                                ]
                            })(
                                <Input placeholder="admain" />
                            )}
                        </Form.Item>
                        <Form.Item label="发布时间">
                            {getFieldDecorator('currentAt', {
                                rules: [
                                    { required: true, message: 'Please input currentAt!' }
                                ]
                            })(
                                <DatePicker showTime placeholder="Select Time"/> 
                            )}
                        </Form.Item>
                        <Form.Item label="content">
                            {getFieldDecorator('content', {
                                rules: [
                                    { required: true, message: 'Please input content!' }
                                ]
                            })(
                                <div className="qf-editor" ref={this.conentRef}></div> 
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}
export default  ArticleEdit
