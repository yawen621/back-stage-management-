import React from 'react'
import './index.less'
export default class NoMatch extends React.Component {

    render() {
        return (
            <div>
            <div className="head404"></div>

            <div className="txtbg404">

                <div className="txtbox">

                    <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

                    <p className="paddingbox">请点击以下链接继续浏览网页</p>

                    <p>》<a style={{cursor:'pointer'}} onClick="javascript:;">返回上一页面</a></p>

                    <p>》<a onClick="javascript:;">返回网站首页</a></p>

                </div>

            </div>
            </div>
        );
    }
}