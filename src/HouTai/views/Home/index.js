import React, { Component, createRef } from 'react'
import { Card, Col, Row } from 'antd'
import './Home.less'
import { getHome, getVisualArticleById, getPageView, getNoteEcHar } from '../../requests'
import echarts from 'echarts'
import {IdcardTwoTone,ProfileTwoTone,SmileTwoTone} from '@ant-design/icons'
//生成随机颜色的js 
const overViewColors = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
}
export default class Home extends Component {
    constructor() {
        super()
        this.Article = createRef()
        this.PageView = createRef()
        this.Note = createRef()
        this.state = {
            user: null,
            phone: null,
            admin: null
        }
    }
    initArticleChart = () => {
        getVisualArticleById()
            .then(resp => {
                // 指定图表的配置项和数据
                const option = {
                    title: {
                        text: '通讯录可视化数据'
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: resp.data.data.map(item => item.time)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: resp.data.data.map(item => item.count),
                        type: 'bar',
                        name: '通讯录',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.articleChart.setOption(option);
            })
    }
    initGetPageView = () => {
        getPageView()
            .then(resp => {
                // 指定图表的配置项和数据
                const option = {
                    title: {
                        text: '访问量可视化数据'
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: resp.data.data.map(item => item.time)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: resp.data.data.map(item => item.count),
                        type: 'bar',
                        name: '访问量',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.arPageView.setOption(option);
            })
    }
    initGetNote = () => {
        getNoteEcHar()
            .then(resp => {
                console.log(resp)
                // 指定图表的配置项和数据
                const option = {
                    title: {
                        text: '短信可视化数据'
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: resp.data.data.map(item => item.time)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: resp.data.data.map(item => item.count),
                        type: 'bar',
                        name: '短信',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.arrNote.setOption(option);
            })
    }
    componentDidMount() {
        this.getDate()
        this.articleChart = echarts.init(this.Article.current)
        this.arPageView = echarts.init(this.PageView.current)
        this.arrNote = echarts.init(this.Note.current)
        this.initArticleChart()
        this.initGetPageView()
        this.initGetNote()
    }
    getDate = () => {
        getHome().then(response => {
            let Home = response.data.data
            this.setState({
                user: Home.user,
                phone: Home.phone,
                admin: Home.admin
            })
        })
    }
    render() {
        return (
            <>
                <Card title='网站数据'
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                            <IdcardTwoTone/>
                                用户
                            <span className="qf-span">{this.state.user}</span>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                            <ProfileTwoTone/>
                                通讯录
                                <span className="qf-span">{this.state.phone}</span>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                            <SmileTwoTone/>
                                管理员
                                <span className="qf-span">{this.state.admin}</span>
                            </div>
                        </Col>
                        <Card
                            bordered={false}
                        >
                            <div ref={this.Article} style={{ height: '400px', width: '800px' }}>

                            </div>
                        </Card>
                        <Card
                            bordered={false}
                        >
                            <div ref={this.PageView} style={{ height: '400px', width: '800px' }}>

                            </div>
                        </Card>
                        <Card
                            bordered={false}
                        >
                            <div ref={this.Note} style={{ height: '400px', width: '800px' }}>

                            </div>
                        </Card>
                    </Row>
                </Card>
            </>
        )
    }
}
