/* 
进行local数据存储管理的工具模块
*/
// const USER_KEY = 'user_key'
/* export default {
    //保存user
    saveUser(user){
        //读取的是string，而user是对象
        //需要JSON.stringify(user)转换成JSON格式 string
       localStorage.setItem(USER_KEY,JSON.stringify(user)) 
    },
     
    //读取user
     getUser(){
        //  return localStorage.getItem('user_key',)
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    //删除user
    removeUser(){
        localStorage.removeItem(USER_KEY)
    }
    
}; */

/* 
运用第三方库 store 
针对浏览器兼容问题
语法简单封装好的
*/
import store from 'store'
const USER_KEY = 'user_key'
export default {
    //保存user
    saveUser(user){
        store.set(USER_KEY,user)
    },
    //读取user
    getUser(){
        return store.get(USER_KEY)||{}
    },
    //删除user
    removeUser(){
        store.remove(USER_KEY)
    }

}