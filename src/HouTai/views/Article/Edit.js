import React, { Component } from 'react'
import { Card, Button, Form, Input,DatePicker} from 'antd'

const formItemLayout={
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
}
export default class Edit extends Component {
    // constructor(){
    //     super()
    //     this.state={
    //         titleValidateStatus:'success',
    //         titleHelp:'11111111111'
    //     }
    // }
    onFinish = values => {
        console.log('Success', values);
    }
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <Card title='编辑文章'
                bordered={false}
                extra={<Button>返回</Button>}
            >
                <Form
                    {...formItemLayout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="标题"
                        name="username"
                        // 自定义效验规则
                        // validateStatus={this.state.titleValidateStatus}
                        // help={this.state.titleHelp}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '标题不能为空！',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '作者不能为空！',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="阅读量"
                        name="read"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '阅读量不能为空！',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="创建时间"
                        name="time"
                        
                        rules={[
                            {
                                required: true,
                                message: '创建时间不能为空！',
                            },
                        ]}
                    >
                        <DatePicker  showTime placeholder="选择时间"/>
                    </Form.Item>
                    <Form.Item
                        label="创建内容"
                        name="text"
                        
                        rules={[
                            {
                                required: true,
                                message: '创建内容不能为空！',
                            },
                        ]}
                    >
                        <div>
                            这里是内容
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:4}}>
                        <Button type="primary" htmlType="submit">
                            保存修改
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
