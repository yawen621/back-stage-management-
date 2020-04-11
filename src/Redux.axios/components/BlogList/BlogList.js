import React, { Component } from 'react'
import { connect } from 'react-redux'
import BlogItem from './Blogitem'
import { fetchBlogList } from '../../action/blog'

// 实际上这是一个容器组件(Smart/Container Components)
class BlogList extends Component {
    componentDidMount() {
        this.props.fetchBlogList()
    }
    // 这里还需要对传入数据做检测prop-type
    render() {
        const {
            blogList,
            isLoading,
            errMsg
        } = this.props
        const hasError = Boolean(errMsg)
        // console.log(this.props)
        return (
            isLoading
                ?
                <div>loading</div>
                :
                (
                    hasError
                        ?
                        <div>{errMsg}</div>
                        :
                        <ul>
                            {
                                blogList.map(blog => {
                                    return (
                                        <BlogItem key={blog.id} {...blog} />
                                    )
                                })
                            }
                        </ul>
                )
        )
    }
}
const mapState = state => ({
    blogList: state.blog.list,
    isLoading: state.blog.isLoading,
    errMsg:state.blog.errMsg
})
export default connect(mapState, { fetchBlogList })(BlogList)