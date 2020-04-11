import React, { Component } from 'react'

import { BlogList } from './components'
import { Provider } from 'react-redux'
import store from './store'
export default class App extends Component {
    render() {
        return (
                <Provider store={store}>
                    <BlogList />
                </Provider>      
        )
    }
}
