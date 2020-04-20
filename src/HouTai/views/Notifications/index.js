import React, { Component } from 'react'
import { Card, Button, List, Badge, Spin } from 'antd'
// connect方法执行之后是一个高阶组件
import { connect } from 'react-redux'
import { markNotificationAsReadById, markAllNotificationAsRead } from '../../actions/notifications'

// mapState，这里的state实际上就是store.getState()的值
const mapState = (state) => {
    console.log(state)
    const {
        list,
        isLoading
    } = state.notfications
    // 这里return了什么，在组件里就可以通过this.props获取
    return {
        list,
        isLoading
    }
}

@connect(mapState, { markNotificationAsReadById, markAllNotificationAsRead })
class Notifications extends Component {
    render() {
        console.log(this.props)
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title='通知中心'
                    bordered={false}
                    extra={
                        <Button disabled={this.props.list.every(item => item.hasRead === true)}
                            onClick={this.props.markAllNotificationAsRead}
                        >全部标记为已读</Button>
                    }
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                            <List.Item
                                extra={item.hasRead ? null : <Button onClick={this.props.markNotificationAsReadById.bind(this, item.id)}>全部标记为已读</Button>}
                            >
                                <List.Item.Meta
                                    title={<a href="https://ant.design"><Badge dot={!item.hasRead}>{item.title}</Badge></a>}
                                    description={item.desc}
                                />
                            </List.Item>
                        )}
                    />,
            </Card>
            </Spin>
        )
    }
}
export default Notifications