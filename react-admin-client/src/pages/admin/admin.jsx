import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import  memoryUtils from '../../utils/memoryUtils'
import  Header from '../../components/header'
import Leftnav from '../../components/left-nav';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Home from '../home/home';
import User from '../user/user';
// 管理的路由組件
export default class Admin extends Component {
    render() {
        const { Footer, Sider, Content } = Layout;
        const user = memoryUtils.user
        if(!user || !user._id){
            // 自動跳到登錄
            return <Redirect to='/login'/>
        }
        return (         
            <Layout style={{minHeight:'100%'}}>
              <Sider>
                  <Leftnav/>
              </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin:'20px',backgroundColor:'#fff'}}>
                    <Switch>
							<Route path="/home" component={Home}></Route>
							<Route path="/category" component={Category}></Route>
							<Route path="/product" component={Product}></Route>
							<Route path="/role" component={Role}></Route>
							<Route path="/user" component={User}></Route>
							<Route path="/bar" component={Bar}></Route>
							<Route path="/line" component={Line}></Route>
							<Route path="/pie" component={Pie}></Route>
                            <Redirect to="/home"/>
					</Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>推薦使用chrome瀏覽器</Footer>
                </Layout>
            </Layout>
        )
    }
}
