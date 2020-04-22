import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps=state=>{
    return{
        count:state.getIn(['counter','count'])
    }
}
@connect(mapStateToProps)
class CounterDisplay extends Component { 
    render() {
        return (
            <div>
                {this.props.count}
            </div>
        )
    }
}
export default CounterDisplay