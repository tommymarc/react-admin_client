import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import './index.less'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils.js'



class Header extends Component {
    
    state = {
        currentTime:formateDate(Date.now()),//当前时间字符串格式
        dayPictureUrl:'',//天气图片url
        type:'',//天气的文本
    }
    
    getTime = () => {
        //每隔一秒获取当前时间，并更新状态数据currentTime
        setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather = async () => {
        //调用接口请求函数异步获取数据
       const {type} = await reqWeather('武汉');
       this.setState({type})
    }

    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        /* 
        find()查找数组内的某个元素对象
        如果是找外层对象路径的可以用find，如果是匹配的是数组子元素对象的title则不行
        find()返回的是boolean值
        只能通过自己forEach()遍历 
        */
        menuList.forEach(item => {
            if(item.key === path){//如果当前item对象的key与path一样，item的title就是需要显示的title
                title = item.title
            }else if(item.children){
                //在所有的子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key===path)
                //如果有值，说明有匹配的
                if(cItem){
                    //取出它的title
                    title = cItem.title
                }
            }
        })
        return title
    }
    /* 
    第一次render()之后执行一次 
    一般在此执行异步操作：发ajax请求/启动定时器
    */
    componentDidMount(){
        //获取当前时间
        this.getTime()
        //获取当前天气显示
        this.getWeather()
    }

    render() {

        const {currentTime,type} = this.state;
        const username = memoryUtils.user.username
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="晴"/>
                        <span>{type}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)