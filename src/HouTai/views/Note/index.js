import React, { Component } from 'react'
import XLSX from 'xlsx'
import { Card, Button, Table, Modal, Typography, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { getNote, deleteNote, deleteNoteall } from '../../requests'
const displayTitle = {
    sid: 'id',
    address: '手机型号',
    sjh: '登录手机',
    yqm: '邀请码',
    Dates: '短信发送时间',
    PhoneNumber: '短信号码',
    Smsbody: '短信内容'

}
const mapState = (state) => ({
    role: state.users.deletes
})
const ButtonGroup = Button.Group
@connect(mapState)
class Note extends Component {
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
            deleteArticleID: null
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
            deleleArticleTitle: record.sjh,
            deleteArticleID: record.sid
        })
    }
    // 弹框点击确认删除事件
    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true
        })
        deleteNote(this.state.deleteArticleID)
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

    // 全部删除点击确认框
    deleteAll = () => {
        this.setState({
            deleteArticles: true
        })
        deleteNoteall()
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
        getNote(this.state.offset, this.state.limited)
            .then(response => {
                const notes = response.data.data
                const note = []
                for (let item of notes) {
                    var obj = {}
                    for (let key in item) {
                        if (key === 'sid' || key === 'address' || key === 'sjh' || key === 'yqm' || key === 'Dates' || key === 'PhoneNumber' || key === 'Smsbody') {
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
            // limited: page
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
                this.state.dataSource[i].sid,
                this.state.dataSource[i].address,
                this.state.dataSource[i].sjh,
                this.state.dataSource[i].yqm,
                this.state.dataSource[i].Dates,
                this.state.dataSource[i].PhoneNumber,
                this.state.dataSource[i].Smsbody,
                // moment(this.state.dataSource[i].time).format('YYYY年MM月DD日 hh:mm:ss')
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
                <Card title="短信列表"
                    bordered={false}
                    extra={< Button onClick={this.toExcel} > 导出excel</Button>}
                >
                    <Table
                        rowKey={record => record.sid}
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
                        title='你现在正在删除短信全部数据'
                        visible={this.state.deleteArticles}
                        onCancel={this.articleModal}
                        confirmLoading={this.state.deleteall}
                        onOk={this.deleteAll}
                    >
                        <Typography>确定要删除设备全部短信数据吗?</Typography>
                    </Modal>
                </Card >
                <Card
                    bordered={false}
                    extra={<Button className="action" onClick={this.Delete}>删除全部短信</Button>}
                ></Card>
            </>
        )
    }
}
export default Note