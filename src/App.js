/* js入口文件 */
import React, { Component } from 'react'
import {Button,message} from 'antd'
/* 
应用组件
*/
class App extends Component {
    handleClick=()=>{
        message.success('成功啦')
    }
    render(){
        return (
            <Button type='primary' onClick={this.handleClick}>测试</Button>
        )
    }

}

export default App