import React, { Component } from 'react'
import{
    CounterBtn,
    CounterDisplay
} from './components'

import {increment,decrement} from './actions/counter'
import {connect } from 'react-redux'


@connect(null,{increment,decrement})
class index extends Component {
    render() {
        return <>
                <CounterBtn onClick={this.props.decrement}>-</CounterBtn>
                <CounterDisplay/>
                <CounterBtn onClick={this.props.increment}>+</CounterBtn>
            </>
        
    }
}
export default index