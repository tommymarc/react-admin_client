import React,{Component} from 'react'
import {Form,Input,Icon,Button,} from 'antd'
import {reqLogin} from '../../api'


import logo from './images/logo.png'
import './login.less'


class Login extends Component{
    //提交按钮
    handleSubmit=(e)=>{
        //阻止默认事件
        e.preventDefault();

        //对所有表单字段进行校验
        this.props.form.validateFields(async (error,values)=>{
            if(!error){
                //console.log('提交登陆的ajax请求',values)
                //请求登陆
                const {username,password} = values;
               /*  reqLogin(username,password).then(response =>{
                    console.log('成功了',response.data)
                }).catch(error =>{
                    console.log('失败了',error)
                }) */
                try{
                    const response = await reqLogin(username,password);
                    console.log('请求成功',response)
                }catch(error){
                    console.log('请求出错了',error)
                }
                
            }else{
                console.log('校验失败')
            }
        })
        /* //对所有表单字段进行校验
        this.props.form.validateFields(async (err,values) =>{
            //校验成功
            if(!err){
                //console.log('提交登陆的ajax请求',values)
                //请求登陆
                const {username,password} = values
                const result = await reqLogin(username,password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
                //console.log('请求成功',result)
                if(result.status===0){//登陆成功
                    //提示登陆成功
                    message.success('登陆成功')
                    //保存user
                    const user = result.data;
                    memoryUtils.user = user //保存在内存中
                    storageUtils.saveUser(user) //保存在local中

                    //跳转到管理界面(不需要再退回到登陆页面)
                    this.props.history.replace('/')
                }else{//登陆失败
                    //提示错误信息
                    message.error(result.msg)
    
                }
            }else{
                console.log('校验失败')
            } 
        })*/
    }
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React:后台管理项目</h1>
                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                           {
                               getFieldDecorator('username',{
                                   rules:[
                                       {required:true,whitespcae:true,message:'必须输入用户名'},
                                       {min:4,message:'用户名必须大于4位'},
                                       {max:12,message:'用户名必须小于12位'},
                                       {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须位英文、数字或者_组成'}
                                   ],
                                   initialValue: 'admin', // 初始值
                               })(
                                <Input 
                                    prefix={<Icon type="user" style={{color:'rgba(0,0,0,.5)'}}/>}
                                    placeholder="用户名"
                                />
                               )
                           }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {required:true,whitespace:true,message:'必须输入密码'},
                                        {min:6,message:'密码必须大于6位'},
                                        {max:16,message:'密码必须小于16位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'密码必须是英文、数字或_组成'}
                                    ]
                                })(
                                    <Input 
                                        prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.5)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin

/* 
async 和await
1.作用？

2.哪里写await？

3.哪里写async
*/