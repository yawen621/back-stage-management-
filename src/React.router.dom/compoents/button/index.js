import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
 class Button extends Component {
    goHome = () => {
        // this.props.history.push('/home')
        this.props.history.push({
            pathname: '/home',
            state: {
                id: this.props.match.params.id
            }
        })
    }
    render() {
        return (
            <button onClick={this.goHome}>返回首页</button>
        )
    }
}
export default withRouter(Button)