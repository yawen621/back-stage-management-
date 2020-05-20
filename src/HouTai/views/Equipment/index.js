import React, { Component } from 'react'
import XLSX from 'xlsx'
import { Card, Button, Table, Modal, Typography, message } from 'antd'
import moment from 'moment'
import './edit.less'
import { getEquipment, deleteEquipment, deleteEquipmentall } from '../../requests'
import { connect } from 'react-redux'
const displayTitle = {
    pid: 'id',
    phone: '登录手机',
    Invitation: '邀请码',
    time: '登录时间',
    position: '经纬度',
    phonemodel: '手机型号',
    ipcofig: 'ip地址'

}
const ButtonGroup = Button.Group
const mapState = (state) => ({
    role: state.users.deletes
})
@connect(mapState)
class Article extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [],
            isLoading: false,
            offset: 20,
            limited: 1,
            deleleArticleTitle: '',
            isShowArticleModal: false,
            deleteArticleConfirmLoading: false,
            deleteArticleID: null,
            deleteArticles: false,
            deleteall: false
        }
    }
    componentDidMount() {
        // console.log(this)
        this.getDate()
    }

    componentWillUnmount() {
        console.log(this.updater.isMounted(this))
        console.log('componentWillUnmount')
    }

    createColumns = (a) => {

        const colums = a.map((item, value) => {
            if (item === 'time') {
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
        if (this.props.role === 1) {
            colums.push({
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return <ButtonGroup>
                        <Button size="small" type="danger" onClick={() => this.showDeleteArticle(record)}>删除</Button>
                    </ButtonGroup>
                }
            })
        }

        return colums
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
            deleleArticleTitle: record.phone,
            deleteArticleID: record.pid
        })
    }
    // 弹框点击确认删除事件
    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true
        })
        deleteEquipment(this.state.deleteArticleID)
            .then(resp => {
                if (resp.data.code === 200) {
                    message.success(resp.data.msg)
                } else {
                    message.error(resp.data.msg)
                }
                // 这里项目经验跟产品沟通究竟是留在当前页还是到第一页
                this.setState({
                    offset: 0
                }, () => {
                    // this.getDate()
                })
            })
            .finally(() => {
                this.setState({
                    deleteArticleConfirmLoading: false,
                    isShowArticleModal: false
                })
            })
    }

    // 全部删除点击确认框
    deleteAll = () => {
        this.setState({
            deleteArticles: true
        })
        deleteEquipmentall()
            .then(resp => {
                if (resp.data.code === 200) {
                    message.success(resp.data.msg)
                } else {
                    message.error(resp.data.msg)
                }
            })
            .finally(() => {
                this.setState({
                    deleteArticles: false,
                    deleteall: false
                })
            })
    }
    Delete = () => {
        this.setState({
            deleteArticles: true
        })

    }
    articleModal = () => {
        this.setState({
            deleteArticles: false,
            deleteall: false
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
    setData = (state) => {
        if (!this.updater.isMounted(this)) return
        this.setState(state)
    }
    getDate = () => {
        this.setState({
            isLoading: true
        })
        getEquipment(this.state.offset, this.state.limited)
            .then(response => {
                const notes = response.data.data
                const note = []
                for (let item of notes) {
                    var obj = {}
                    for (let key in item) {
                        if (key === 'pid' || key === 'phone' || key === 'Invitation' || key === 'time' || key === 'position' || key === 'phonemodel' || key === 'ipcofig') {
                            obj[key] = item[key]
                        }
                    }
                    note.push(obj)
                }
                const columnsKeys = Object.keys(response.data.data[0])
                const columns = this.createColumns(columnsKeys)
                // 如果请求完成之后组件已经销毁，就不需要在设置setState
                // if(!this.updater.isMounted(this)) return
                this.setData({
                    dataSource: note,
                    columns
                })
            })
            .catch(err => {
                // 处理错误，虽然有全局处理
            })
            .finally(() => {
                if (!this.updater.isMounted(this)) return
                this.setState({
                    isLoading: false
                })
            })
    }

    // 分页数据
    onPageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({
            offset: pageSize * (page + 1),
            // limited: pageSize
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
            // this.getDate()
        })
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
                this.state.dataSource[i].pid,
                this.state.dataSource[i].phone,
                this.state.dataSource[i].Invitation,
                moment(this.state.dataSource[i].time).format('YYYY年MM月DD日 hh:mm:ss'),
                this.state.dataSource[i].position,
                this.state.dataSource[i].phonemodel,
                this.state.dataSource[i].ipcofig,

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
            <>
                <Card title="设备列表"
                    bordered={false}
                    extra={< Button onClick={this.toExcel} > 导出excel</Button>}
                >
                    <Table
                        rowKey={record => record.pid}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        loading={this.state.isLoading}
                        pagination={{
                            // current: this.state.offset / this.state.limited + 1,
                            hideOnSinglePage: true,
                            showQuickJumper: true,
                            showSizeChanger: true,
                            onChange: this.onPageChange,
                            onShowSizeChange: this.onShowSizeChange,
                            pageSizeOptions: ['10', '15', '20', '30'],
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
                    <Modal
                        title='你现在正在删除全部数据'
                        visible={this.state.deleteArticles}
                        onCancel={this.articleModal}
                        confirmLoading={this.state.deleteall}
                        onOk={this.deleteAll}
                    >
                        <Typography>确定要删除设备全部数据吗?</Typography>
                    </Modal>
                </Card >
                <Card
                    bordered={false}
                    extra={<Button className="action" onClick={this.Delete}>删除全部设备</Button>}
                >
                </Card>
            </>
        )
    }
}

export default Article