import React, { Component } from 'react'
import {withRouter}  from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.css'
import memoryUtils from '../../utils/memoryUtils' 
import menuList from '../../config/menuConfig'
import storgeUtils from '../../utils/storageUtils'
class Header extends Component {
    logout = ()=> {
        Modal.confirm({
          title: '確定要退出嗎',
          icon: <ExclamationCircleOutlined />,
          okText: '確認',
          cancelText: '取消',
          onOk: ()=>{
            storgeUtils.remove()
            memoryUtils.user ={}
            this.props.history.replace('/login')
          }
        });
      }
    getTitle = ()=>{
        const path = this.props.location.pathname
        let title
        menuList.forEach((item)=>{
            if(item.key===path) {
                title = item.title
            }else if(item.children){
                const ctitle = item.children.find(citem=>citem.key===path)
                if(ctitle) title = ctitle.title
            }
        })
        return title
    }
    render() {
        const {username} = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className="header-top">
                    <span>歡迎, {username}</span>
                    {/* eslint-disable-next-line */}
                    <a href='#' onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <span>{title}</span>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
