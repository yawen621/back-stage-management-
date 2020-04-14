import React, { Component, createRef } from 'react'
import { Card, Button, Form, Input, DatePicker, Spin,message} from 'antd'
import E from 'wangeditor'
import './edit.less'
import { getArticleById, saveArticle } from '../../requests'

import moment from 'moment'
const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
}

export default class Edit extends Component {
    constructor() {
        super()
        this.editorRef = createRef()
        this.formRef = createRef()
        this.state={
            isSaving:false
        }
    }
    // constructor(){
    //     super()
    //     this.state={
    //         titleValidateStatus:'success',
    //         titleHelp:'11111111111'
    //     }
    // }
    // 3.0迁移到4.0后获取表单数据使用onFinish
    onFinish = values => {
        console.log('Success', values);
        // ES6的Object.assign()基本用法参考文档https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        const data = Object.assign({}, values, {
            createAt: values.createAt.valueOf()
        })
        this.setState({
            isSaving:true
        })
        // console.log(data)
        saveArticle(this.props.match.params.id, data)
            .then(resp => {
                message.success(resp)
                // 如果需要是要跳转
                this.props.history.push('/admin/article')
            })
            .finally(()=>{
                this.setState({
                    isSaving:false
                })
            })
    }
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    // dom操作富文本编辑器的集成安装wangeditor创建富文本编辑重要步骤
    initEditor = () => {
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            // html 即变化之后的内容
            // 这里很坑调用了Form的ref才能拿到setFieldsValue这个属性
            this.formRef.current.setFieldsValue({
                content: html
            })
        }

        this.editor.create()
    }
    componentDidMount() {
        this.initEditor()
        this.setState({
            isSaving:true
        })
        // 调用requests里的接口方法
        // 注意antd4.0要使用setFieldsValue必须用ref获得实体
        getArticleById(this.props.match.params.id)
            .then(resp => {
                const { id, ...data } = resp
                data.createAt = moment(data.createAt)
                this.formRef.current.setFieldsValue(data)
                this.editor.txt.html(data.content)
            })
            .finally(()=>{
                this.setState({
                    isSaving:false
                })
            })
    }
    render() {
        return (
            <Card title='编辑文章'
                bordered={false}
                extra={<Button onClick={this.props.history.goBack}>返回</Button>}
            >
                <Spin spinning={this.state.isSaving}>
                    <Form
                        ref={this.formRef}
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
                            name="title"
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
                            <Input />
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
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="阅读量"
                            name="amount"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '阅读量不能为空！',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="发布时间"
                            name="createAt"

                            rules={[
                                {
                                    required: true,
                                    message: '创建时间不能为空！',
                                },
                            ]}
                        >
                            <DatePicker showTime placeholder="选择时间" />
                        </Form.Item>
                        <Form.Item
                            label="创建内容"
                            name="content"

                            rules={[
                                {
                                    required: true,
                                    message: '创建内容不能为空！',
                                },
                            ]}
                        >
                            {/* react中获取id使用ref */}
                            <div className="qf-editor" ref={this.editorRef}>
                            </div>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            <Button type="primary" htmlType="submit">
                                保存修改
                        </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}
