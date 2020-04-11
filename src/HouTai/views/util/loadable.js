
import Loadable from 'react-loadable'

import {Loading} from '../../components'
// 通用的过场组件

export default (loader,loading=Loading)=>{
    return Loadable({
        loader,
        loading
    })
}