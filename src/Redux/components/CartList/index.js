import React, { Component } from 'react'
// connect方法执行之后是一个高阶组件
import { connect } from 'react-redux'
// 导入actions
import { increment, decrementAsync,decrement } from '../../actions/cart'
class CartList extends Component {
    render() {
        console.log(this.props)
        return (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>商品名称</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.cartList.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={
                                            () => {
                                                this.props.decrementAsync(item.id)
                                            }
                                        }>等一会再减</button>
                                        <button onClick={
                                            () => {
                                                this.props.decrement(item.id)
                                            }
                                        }>-</button>
                                        <span>{item.amount}</span>
                                        <button onClick={
                                            () => {
                                                this.props.increment(item.id)
                                            }
                                        }>+</button>
                                    </td>
                                    <td></td>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

// mapState，这里的state实际上就是store.getState()的值
const mapState = (state) => {
    // 这里return了什么，在组件里就可以通过this.props获取
    console.log(state)
    return {
        cartList: state.cart
    }
}

// const mapDispatchToProps=dispatch=>{
//     return{
//         add:(id)=>dispatch(increment(id)),
//         reduce:(id)=>dispatch(decrement(id))
//     }
// }
// connect方法有四个参数 常用的就是前面两个
// 第一个参数是mapState，作用就是从store里把state注入到当前组件的props上
// 第二个参数可以是mapDispatchToProps这个的主要作用是吧action生成的方法注入到当前组件的props上，
// 一般来说也没必要这样用
// export default connect(mapState,mapDispatchToProps)(CartList)
// 直接第二个参数传递一个对象，这里面的对象就是actionCreators，只要传入了actionCreators，在组件内就通过this.props.actionCreator来调用，这样的话，在调用之后，那个actionCreator就会自动帮你把它内部的action dispatch出去
export default connect(mapState, { increment, decrementAsync,decrement })(CartList)