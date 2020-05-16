import React, { Component} from 'react'
import { Form, Input, Button, Checkbox, Card, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { login } from '../../actions/user'
import { Redirect } from 'react-router-dom'
import './login.less'
import ParticlesBg from 'particles-bg'
import MouseParticles from 'react-mouse-particles'
const mapState = state => ({
    isLogin: state.users.isLogin,
    isLoading: state.users.isLoading
})
@connect(mapState, { login })
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            randomStyle: ["circle", "cobweb", "square", "thick", "polygon"]
        }
    }
    onChange = e => {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    };
    onFinish = values => {
        const { checked } = this.state;
        const params = {
            ...values,
            remember: checked,
        }
        console.log('Success', params);
        this.props.login(params)
    }
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            this.props.isLogin
                ?
                <Redirect to='/admin'></Redirect>
                :
                <div>
                    <Card
                        title="QF ADMIN登录"
                        className="qf-login-wrapper"
                    >
                       
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: this.state.checked }}
                                // 3.0迁移到4.0后获取表单数据使用onFinish替代了onSubmit
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '用户名必须' }]}
                                >
                                    <Input
                                        disabled={this.props.isLoading}
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" 
                                        />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '密码是必须' }]}
                                >
                                    <Input

                                        disabled={this.props.isLoading}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox
                                            checked={this.state.checked}
                                            disabled={this.props.isLoading}
                                            onChange={this.onChange}
                                        >记住我</Checkbox>
                                        <Button
                                            loading={this.props.isLoading}
                                            type="primary"
                                            htmlType="submit" className="login-form-button">
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                            </Form>
                    </Card>
                    <ParticlesBg type={this.state.randomStyle[Math.floor(Math.random() * this.state.randomStyle.length)]} bg={true} />
                    <MouseParticles g={1} color="random" cull="col,image-wrapper"/>
                </div>
        )
    }
}
export default Login