import React, { Component } from 'react'
import zhCN from 'antd/es/locale/zh_CN'; //antd国际化
import { Button, Spin, ConfigProvider, Pagination,Badge} from 'antd'
export default class App extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Button type="primary">点我一下</Button>
                <Spin>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo cupiditate facere illum totam. Officiis pariatur neque repudiandae provident, sunt porro ipsa nemo. Quo, cum. Soluta distinctio eius delectus nostrum rerum.
                </Spin>
                <Pagination total={500} defaultCurrent={2} showQuickJumper />
                <Badge count={20} showZero overflowCount={19}>
                    <span>lorem</span>
                </Badge>
            </ConfigProvider>
        )
    }
}
