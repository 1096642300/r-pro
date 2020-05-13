import React, { Component,createRef } from 'react'
import {Card} from "antd"
import echarts from "echarts"
export default class Dashboard extends Component {
    // 指定图表的配置项和数据
    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };
    constructor(){
        super()
        this.articleAmount = createRef()
    }
    componentDidMount(){
        this.initArticleChart()
    }
    initArticleChart = ()=>{
        this.articleChart = echarts.init(this.articleAmount.current);
        // 使用刚指定的配置项和数据显示图表。
        this.articleChart.setOption(this.option);
    }
    render() {
        return (
            <Card 
                title={"浏览数"}
            >
                <div style={{height:420}} ref={this.articleAmount}></div>
            </Card>
        )
    }
}
