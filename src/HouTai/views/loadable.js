// 用于解释react-loadable原理用可以实现无缝切换
import React, { Component } from 'react'
const Loadable = ({ 
    loader,
    loading:Loading
 }) => {
    return class loadableComponent extends Component {
        state = {
            LoadedComponent:null
        }
        componentDidMount(){
            loader()
            .then(resp=>{
                this.setState({
                    LoadedComponent:resp.default 
                })
            })
        }
        render() {
            const{
                LoadedComponent
            }=this.state
            return (
                LoadedComponent
                ?
                <LoadedComponent/>
                :
                <Loading/>
            )
        }
    }
}
export default Loadable