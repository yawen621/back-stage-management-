import React, { Component, createContext } from 'react'

// createContext这个方法的结果是一个对象里面有Provider和Consumer
// Provider用于提供状态
// Consumer用于接收状态
console.log(createContext())
const {
    Provider,
    Consumer: CounterConsumer//解构出来重新赋值给一个CounterConsumer
} = createContext()


// 封装一个基本的Provider
class CounterProvider extends Component {
    constructor() {
        super()
        this.state = {
            count: 100,
            title:'abc'
        }
    }
    incrementCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    decrementCount = () => {
        this.setState({
            count: this.state.count - 1
        })
    }
    render() {
        return (
            <Provider value={{
                count: this.state.count,
                onIncrementCount:this.incrementCount,
                onDecrementCount:this.decrementCount
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export {
    CounterProvider,
    CounterConsumer
}