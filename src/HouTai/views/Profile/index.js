import React, { Component } from 'react'
import { Card, Upload, Button, Spin } from 'antd'
import {connect} from 'react-redux'
import axios from 'axios'
import {changeAvatar} from '../../actions/user'
const mapState = state =>({
    avatarUrl:state.users.avatar
})

@connect(mapState,{changeAvatar})
class Profile extends Component {
    state = {
        isUploading: false,
    }
    handleUploadAvatar = ({ file }) => {
        const data = new FormData()
        data.append('Token', 'f7d701cf0e341f86bd0d0a8f04754e23c7e9382a:CAMn8y8EYs0ICrP1FzZdK5P6a-U=:eyJkZWFkbGluZSI6MTU4NzMxNTYzNiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE2ODUzIiwiYWlkIjoiMTY4MjIxMiIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
        this.setState({
            isUploading: true
        })
        axios.post('http://up.imgapi.com/',data)
        .then(resp=>{
            if(resp.status===200){
                this.setState({
                    isUploading:false
                })
                this.props.changeAvatar(resp.data.linkurl)
            }else{
                // 自行处理错误
            }
        })
        .catch(error=>{
            // 自行处理错误
        })
    }
    render() {
        return (
            <Card
                title="个人设置"
                bordered={false}
            >
                <Upload
                    showUploadList={false}
                    customRequest={this.handleUploadAvatar}
                    style={{
                        border:'1px dashed #dedede',
                        width:80,
                        height:80,
                        display:'bloack'
                    }}
                >
                    <Spin
                        spinning={this.state.isUploading}
                    >
                        {
                            this.props.avatarUrl ? <img style={{width:'100px',height:'100px'}} src={this.props.avatarUrl} alt="头像" /> : <Button>
                                点击上传
                            </Button>
                        }
                    </Spin>
                </Upload>
            </Card>
        )
    }
}
export default Profile