import React, { Component } from 'react'
import XLSX from 'xlsx'
import { Card, Button, Table, Modal, Typography, message } from 'antd'
import moment from 'moment'
import { deleteEquipment, getqueryuser, getdleteuser } from '../../requests'
import { connect } from 'react-redux'
const displayTitle = {
    uid: 'id',
    username: '用户名',
    time: '创建时间',
    logintime: '上次登录时间',
    loginIP: '上次登录IP',
    rolename: '职位'

}
const mapState = (state) => ({
    role: state.users.deletes
})
const ButtonGroup = Button.Group
@connect(mapState)
class Queryuser extends Component {
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
            if (item === 'logintime') {
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
            deleleArticleTitle: record.username,
            deleteArticleID: record.uid
        })
    }
    // 弹框点击确认删除事件
    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true
        })
        getdleteuser(this.state.deleteArticleID)
            .then(resp => {
                if (resp.data.code === 200) {
                    message.success(resp.data.msg)
                } else {
                    message.error(resp.data.msg)
                }
                // 这里项目经验跟产品沟通究竟是留在当前页还是到第一页
                this.getDate()
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
    setData = (state) => {
        if (!this.updater.isMounted(this)) return
        this.setState(state)
    }
    getDate = () => {
        this.setState({
            isLoading: true
        })
        getqueryuser(this.state.offset, this.state.limited)
            .then(response => {
                const notes = response.data.data
                const note = []
                for (let item of notes) {
                    var obj = {}
                    for (let key in item) {
                        if (key === 'uid' || key === 'username' || key === 'time' || key === 'logintime' || key === 'loginIP' || key === 'rolename') {
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
                this.state.dataSource[i].uid,
                this.state.dataSource[i].username,
                this.state.dataSource[i].time,
                this.state.dataSource[i].logintime,
                this.state.dataSource[i].loginIP,
                this.state.dataSource[i].rolename,

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
                </Card >
            </>
        )
    }
}
export default Queryuser