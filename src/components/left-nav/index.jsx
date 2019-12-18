import React, { Component } from 'react'
import {Link , withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

//子菜单项目
const SubMenu = Menu.SubMenu
/* 
左侧导航的文件
*/
class LeftNav extends Component {

    /* 
    根据menu的数据数组生成对应的标签数组 
    使用map() + 递归调用
    */
    getMenuNodes_map = (menuList) =>{
        return menuList.map(item =>{
            /* 
              {
                title: '首页', // 菜单标题名称
                key: '/home', // 对应的path
                icon: 'home', // 图标名称
                children:[] //可能有，可能无
            }
            <Menu.Item>

            </Menu.item>
            或者
            <SubMenu>
                <Menu.Item>

                </Menu.Item>
            </SubMenu>
            需要判断是否有children
            */
           
            //如果没有children
           if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
           }else{
               return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
               )
           }

        })
    }

    /* 
    根据menu的数据数组生成对应的标签数组 
    使用reduce() + 递归调用
    */
    getMenuNodes = (menuList) =>{
        //得到当前请求的路由路径
        const path = this.props.location.pathname

        return menuList.reduce((pre,item)=>{
            //向pre中添加<Menu.Item>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key===path)
                //如果存在，说明当前Item所对应的子列表需要展开
                if(cItem){
                    this.openKey = item.key
                }


                //向pre中添加<SubMenu>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
        
            return pre
        },[])//初始值是一个空数组[]
    }

    /* 
    在第一次render()之前执行一次 
    为第一次render()准备数据(必须同步的)
    */
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        
        
        //得到当前请求的路由路径
        const path = this.props.location.pathname
        //得到需要打开菜单项的key
        const openKey = this.openKey
        // console.log('render()',openKey,path)
        return (
            <div className="left-nav">
                <Link to='/'  className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>管理后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    >
                    
                    {/* 
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="mail"/>
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <Icon type="mail"/>
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key='/user'>
                        <Link to='/user'>
                            <Icon type="mail"/>
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key='/role'>
                        <Link to='/role'>
                            <Icon type='mail'/>
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    */}
                   {//获取getmenu的所有子节点，返回是一个数组
                       this.menuNodes
                   }


                </Menu>
            </div>
        )
    }
}

/* 
withRouter 高阶组件：
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
*/
export default withRouter(LeftNav)
