import React, { Component, createRef } from 'react'
import { Card,Col, Row } from 'antd'
import './Home.less'
//生成随机颜色的js 
const overViewColors = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
}
export default class Home extends Component {
    constructor() {
        super()
        this.articleAmount = createRef()
    }
    render() {
        return (
            <>
                <Card title='网站数据'
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                                用户
                               <span className="qf-span">2</span>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                                通讯录
                                <span className="qf-span">2</span>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                                管理员
                                <span className="qf-span">2</span>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="qf-gutter-box" style={{ backgroundColor: overViewColors() }}>
                                短信数据
                                <span className="qf-span">2</span>
                            </div>
                        </Col>

                    </Row>
                </Card>
            </>
        )
    }
}
