import React, { Component } from 'react'
import XLSX from 'xlsx'
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip } from 'antd'
import moment from 'moment'


import { getArticles, deleteArticleById } from '../../requests'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const displayTitle = {
    id: 'id',
    title: '标题',
    author: '作者',
    createAt: '创建时间',
    amount: '阅读量'
}
const ButtonGroup = Button.Group
export default class Article extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 10,
            deleleArticleTitle: '',
            isShowArticleModal: false,
            deleteArticleConfirmLoading: false,
            deleteArticleID: null
        }
    }

    createColumns = (columnsKeys) => {
        const colums = columnsKeys.map(item => {
            if (item === 'amount') {
                return {
                    title: displayTitle[item],
                    key: item,
                    render: (text, record) => {
                        // console.log(record)
                        const { amount } = record
                        // 这里是根据一个数字大小做一个条件渲染
                        // 同理可以根据职位级别不同的颜色
                        // const titleMep={
                        //     '001':'red',
                        //     '002':'#09f',
                        //     '003':'green'
                        // }
                        // return <Tag color={titleMep[titleKey]}>{text.amount}</Tag>
                        return <Tooltip title={amount > 220 ? '超过220' : '没超过220'}><Tag color={amount > 220 ? 'red' : 'green'}>{text.amount}</Tag></Tooltip>
                    }
                }
            }
            if (item === 'createAt') {
                return {
                    title: displayTitle[item],
                    key: item,
                    render: (text, record) => {
                        const { createAt } = record
                        return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
                    }
                }
            }
            return {
                title: displayTitle[item],
                dataIndex: item,
                key: item
            }
        })
        colums.push({
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return <ButtonGroup>
                    <Button size="small" type="primary" onClick={this.toEdit.bind(this,record.id)}>编辑</Button>
                    <Button size="small" type="danger" onClick={() => this.showDeleteArticle(record)}>删除</Button>
                </ButtonGroup>
            }
        })
        return colums
    }

    toEdit=(id)=>{
        this.props.history.push(`/admin/article/edit/${id}`)
    }

    // 弹出Modal弹框的事件
    showDeleteArticle = (record) => {
        // 使用函数的方式调用，定制化没那么强
        // Modal.confirm({
        //     icon: <ExclamationCircleOutlined />,
        //     content:<Typography>确定要删除:<span style={{color:'#f00'}}>{record.title}</span>吗?</Typography>,
        //     title:'此操作不可逆,请谨慎操作！！！',
        //     okText:'别磨叽 赶紧删除',
        //     cancelText:'我点错了',
        //     onOk(){
        //         deleteArticle(record.id)
        //         .then(resp=>{
        //             console.log(resp)
        //         })
        //     }
        // })
        this.setState({
            isShowArticleModal: true,
            deleleArticleTitle: record.title,
            deleteArticleID: record.id
        })
    }
    // 弹框点击确认删除事件
    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true
        })
        deleteArticleById(this.state.deleteArticleID)
            .then(resp => {
                message.success(resp.msg)
                // 这里项目经验跟产品沟通究竟是留在当前页还是到第一页
                this.setState({
                    offset:0
                },()=>{
                    this.getDate()
                })
            })
            .finally(() => {
                this.setState({
                    deleteArticleConfirmLoading: false,
                    isShowArticleModal: false
                })
            })
    }

    // 弹框取消点击事件
    hideDeleteModal = () => {
        this.setState({
            isShowArticleModal: false,
            deleleArticleTitle: '',
            deleteArticleConfirmLoading: false
        })
    }
    getDate = () => {
        this.setState({
            isLoading: true
        })
        getArticles(this.state.offset, this.state.limited)
            .then(response => {
                console.log(response)
                const columnsKeys = Object.keys(response.list[0])
                const columns = this.createColumns(columnsKeys)
                console.log(response.list)
                this.setState({
                    total: response.total,
                    dataSource: response.list,
                    columns
                })
            })
            .catch(err => {
                // 处理错误，虽然有全局处理
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    // 分页数据
    onPageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({
            offset: pageSize * (page - 1),
            limited: pageSize
        }, () => {
            this.getDate()
        })
    }

    // 每页数据pageSize 变化的回调
    onShowSizeChange = (current, size) => {
        // 这里出去和产品聊得时候必须问清楚需求，究竟是回到第一页还是留在当前页 问清楚
        console.log(current, size)
        this.setState({
            offset: 0,
            limited: size
        }, () => {
            this.getDate()
        })
    }

    componentDidMount() {
        this.getDate()
    }
    // 导出函数
    toExcel = () => {
        // 在实际项目中实际上这个功能是前端发送一个ajax请求到后端，然后后端返回一个文件下载的地址
        const data = [Object.keys(this.state.dataSource[0])]
        //[['id','title','author','amount','createAt']]
        for (let i = 0; i < this.state.dataSource.length; i++) {
            // const values=Object.values(this.state.dataSource[i])
            // data.push(values)
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh:mm:ss')
            ])
        }
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `路飞-${this.state.offset / this.state.limited + 1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
    }

    render() {
        return (
            <Card title="文章列表"
                bordered={false}
                extra={< Button onClick={this.toExcel} > 导出excel</Button>}
            >
                <Table
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    loading={this.state.isLoading}
                    pagination={{
                        total: this.state.total,
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: this.onPageChange,
                        onShowSizeChange: this.onShowSizeChange,
                        pageSizeOptions: ['10', '15', '20', '30']
                    }}
                />
                <Modal
                    title='此操作不可逆,请谨慎操作！！！'
                    visible={this.state.isShowArticleModal}
                    onCancel={this.hideDeleteModal}
                    confirmLoading={this.state.deleteArticleConfirmLoading}
                    onOk={this.deleteArticle}
                >
                    <Typography>确定要删除:<span style={{ color: '#f00' }}>{this.state.deleleArticleTitle}</span>吗?</Typography>
                </Modal>
            </Card >
        )
    }
}
