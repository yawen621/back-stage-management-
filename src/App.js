//createContexts是react提供的跨组件传值的方法
import React, { Component, createContext } from 'react'
import {CounterProvider} from './counterStore.js'
import {CounBtn,Counter} from './components'
export default class App extends Component {
    render() {
        return (
            <CounterProvider>
                <CounBtn type="decrement">-</CounBtn>
                <Counter />
                <CounBtn type="increment">+</CounBtn>
            </CounterProvider>
        )
    }
}
