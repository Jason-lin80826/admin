import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {reLogin} from '../api/index'
import './login.less'
import logo from '../../assets/img/logo.png'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'
import storgeUtils from '../../utils/storageUtils'
// 登陸的router 組件
export default class Login extends Component {
    onFinish = async (value) =>{
        const {username,password} = value
            const result = await reLogin(username,password)
            if(result.status===0){//成功
                const user = result.data
                memoryUtils.user = user
                storgeUtils.set(user)
                message.success('登入成功')
               this.props.history.replace('/')
            }else{ //失敗
               message.error('密碼錯誤')
            }
        }
    render() {
        const user = memoryUtils.user
        if(user && user._id){
            return <Redirect to='/'/>
        }
        return (
            <div className='login'>
                <header className='login-header'>
                  <img src={logo} alt=''/>
                  <h2>後台管理系統</h2>
                </header>     
                <section className='login-section'>
                    <h2>用戶登錄</h2>
                    <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your Username!' },
                            { min: 4, message: '必須為4位以上' },
                            { max: 12, message: '必須為12位以下' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '不能有英數字與下滑線外之字符' },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your Username!' },
                            { min: 4, message: '必須為4位以上' },
                            { max: 12, message: '必須為12位以下' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '不能有英數字與下滑線外之字符' },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
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
