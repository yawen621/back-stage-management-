import React, { Component, createRef } from 'react'
import { Card,Col, Row } from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import { getArticleAmount } from '../../requests'
//生成随机颜色的js 
const overViewColors = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
}
export default class Dashboard extends Component {
    constructor() {
        super()
        this.articleAmount = createRef()
    }
    initArticleChart = () => {
        getArticleAmount()
            .then(resp => {
                // 指定图表的配置项和数据
                const option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:resp.amount.map(item=>item.month)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data:resp.amount.map(item=>item.value),
                        type: 'line',
                        areaStyle: {}
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.articleChart.setOption(option);
            })
    }
    componentDidMount() {
        this.articleChart = echarts.init(this.articleAmount.current)
        this.initArticleChart()
    }
    render() {
        return (
            <>
                <Card title='概览'
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>col-6</div>
                        </Col>

                    </Row>
                </Card>
                <Card title='最近浏览量'
                    bordered={false}
                >
                    <div ref={this.articleAmount} style={{ height: '400px' }}>

                    </div>
                </Card>
            </>
        )
    }
}
