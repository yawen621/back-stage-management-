import React, { Component } from 'react'
import { Layout, Menu} from 'antd';
import { adminRouter } from '../../routes'
// 高阶组件中的withRouter，作用就是将一个组件包裹进Route里面，然后react-router的三个对象history，location，math就会被放进这个组件的props属性中
// 用Navlink的方法也可以
import { withRouter, NavLink } from 'react-router-dom'
import './frame.less'
import logo from './logo.png'
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {
  // onMenuClick = ({ key }) => {
  //   // console.log(key)
  //   this.props.history.push(key)
  // }
  render() {
    const selectedKeyArr=this.props.location.pathname.split('/')
    selectedKeyArr.length=3

    const menus = adminRouter.filter(route => route.isNav === true)
    return (
      <Layout style={{minHeight:'100%'}}>
        <Header className="header qf-header" style={{ background: '#fff' }}>
          <div className="qf-logo">
            <img src={logo} alt="QFADMIN" />
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedKeyArr.join('/')]}
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                menus.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <NavLink to={item.pathname}>
                        <item.icon />
                        {item.title}
                      </NavLink>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding:'16px' }}>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                background:'#fff',
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame