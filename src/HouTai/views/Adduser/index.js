import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox,message} from 'antd'
import './index.less'
import { getadduser } from '../../requests'
export default class Adduser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            pwd: null,
            role: null
        }
    }
    onFinish = values => {
        console.log('Failed:', values);
        this.setState({
            username: values.username,
            pwd: values.password,
            role: values.remember
        })
        getadduser(this.state.username,this.state.pwd,this.state.role)
        .then(resp=>{
            if(resp.data.code===200){
                message.success(resp.data.msg)
            }else{
                message.error(resp.data.msg)
            }
        })
    };
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            <>
                <Card
                    title="添加用户"
                    bordered={false}
                >
                </Card>
                <Form
                    {...layout}
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="用户"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空' }]}
                    >
                        <Input style={{ width: 200 }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Input.Password style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                        label="权限"
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>管理员权限</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}
