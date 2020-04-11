import React, { Component } from 'react'
import Another from './another'
class App extends Component {
    render() {
        return (
            <div>
                HOC
                <Another name="组件"/>
            </div>
        )
    }
}

export default App