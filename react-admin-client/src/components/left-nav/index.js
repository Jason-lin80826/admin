import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu} from 'antd';
import logo from '../../assets/img/logo.png'
import './index.css'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
class Leftnav extends Component {
      isAuth = (item) => {
        // 判斷當前用戶對item是否有權限
        const {key, isPublic} = item
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
        //1.如果當前用戶是admin
        //2.如果當前item 是公開的
        //3.能匹配到key 或是 child
        if (username === 'admin' || isPublic || menus.indexOf(key) !==-1) {
          return true
        } else if(item.children){
          return !!item.children.find(child =>menus.indexOf(child.key)!==-1)
        }
          return false
        
      }
      getNode = (menuList)=>{
        const path =this.props.location.pathname
      return menuList.map((item)=>{
        //  如果當前用戶有item的權限，才需要顯示
        if (this.isAuth(item)) {
          if(!item.children && this.isAuth(item)){
            return(
              <Menu.Item key={item.key} icon={item.icon}>
                     <Link to={item.key}>
                     {item.title}
                     </Link>  
              </Menu.Item>
            )
           }else if(item.children && this.isAuth(item) ) {
             const citem=item.children.find((citem)=>path.indexOf(citem.key)===0)
             if(citem)  {this.openkey = item.key}
            return(
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {
                  this.getNode(item.children)
                }
              </SubMenu>
            )
           }
        }
      })
     };
     componentWillMount(){
       this.menuNode =this.getNode(menuList)
     }  
    render() {
      let path =this.props.location.pathname
      if(path.indexOf('/product')===0){
          path = '/product'
      }
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                  <img src={logo} alt='logo'/>
                  <h1>後臺管理</h1>
                </Link>
                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={[this.openkey]}
                        mode="inline"
                        theme="dark"
                        > 
                        {this.menuNode}        
              </Menu>   
            </div>
        )
    }
}
// withRouter高階組件:
// 包裝非路由組件,返回一個新組件,新的組件向非路由組件傳遞3個新的屬性location,history,match
export default withRouter(Leftnav)