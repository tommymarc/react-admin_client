/* js入口文件 */
import React, { Component } from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
/* 
应用组件
*/
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
class App extends Component {
    
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default App