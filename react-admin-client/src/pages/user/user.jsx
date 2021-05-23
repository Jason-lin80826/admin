import React, { Component } from 'react'
import {
  Button,
  Card,
  Table,
  Modal,
  message
} from 'antd'
import {reqUsers, reqDeleteUser, reqAddorUpdateUser} from '../api/index'
import Adduser from './addorupdate'
import Linkbutton from '../../components/Link-button'
export default class User extends Component {
    state = {
        users:[],
        roles: [],
        show:false
    }
    initialColums = () =>{
        this.columns=[
            {
                title: '用戶名',
                dataIndex: 'username',
              },
              {
                title: '信箱',
                dataIndex: 'email',
              },
              {
                title: '電話',
                dataIndex: 'phone',
              },
              {
                title: '註冊時間',
                dataIndex: 'create_time',
                // render: formateDate
              },
              {
                title: '所屬角色',
                dataIndex: 'role_id',
                render: (role_id) => {
                    return this.roleName[role_id]
                }
              },
              {
                title: '操作',
                render:(user) => {
  
                    return(
                        <span>
                            <Linkbutton onClick={() =>this.showUpdate(user)}>修改</Linkbutton>
                            <Linkbutton onClick={() =>this.deleteUser(user)}>刪除</Linkbutton>
                        </span>    
                    )
                }
              },
        ]
    }
    getUsers = async() => {
       const result = await reqUsers()
       if (result.status === 0){
           console.log(result.data)
           const {users, roles} = result.data
           this.initRoleName(roles)
           this.setState({
               users,
               roles
            })
       }
    }
    initRoleName = (roles) =>{
      const roleName = roles.reduce((pre,role) =>{
        pre[role._id] = role.name
        return pre
      },{})
      this.roleName = roleName
    }
    showAdd = () => {
      this.user = null  //去除前面保存的user
      this.setState({show: true})
    }
    showUpdate = (user) => {
      this.user = user
      this.setState({
        show: true
      })
    }
    deleteUser = (user) => {
      Modal.confirm(
        {
          title: `確認刪除${user.username}嗎?`,
          okText: '確認',
          cancelText: '取消',
          onOk: async() => {
            const result = await reqDeleteUser(user._id)
            if (result.status === 0) {
              message.success('刪除成功')
              this.getUsers()
            }
          }
        }
      )
    }
    handleAddorUpdate = async() => {
      this.form.validateFields()
      .then(async(values) => {
        this.setState({
          show:false
        }) 
      // 如果是更新，需指定更新哪個user 
      if (this.user && this.user._id) {
        values._id = this.user._id
      }  
      this.form.resetFields() 
      const result = await reqAddorUpdateUser(values)
      if (result.status === 0){
        message.success(`${this.user?'修改':'新增'}成功`)
        this.getUsers()
      }
      })
    }
    handleCancel = () => {
        this.form.resetFields() 
        this.setState({show:false})
    }
    componentWillMount(){
        this.initialColums()
    }
    componentDidMount(){
        this.getUsers()
    }
    render() {
        const {users, show, roles} = this.state
        const user = this.user || {}
        const title = (
            <Button type='primary' onClick = {this.showAdd}>
              創建用戶
            </Button>
        )    
        return (
           <Card title={title}>
               <Table  
               bordered
               dataSource={users} 
               columns={this.columns}
               rowKey='_id'
               pagination={{
                defaultPageSize:3,
                showQuickJumper:true,
                showSizeChanger:false,
               }}
               />
            <Modal title={user._id?"修改用戶": '添加用戶'} visible={show} onOk={this.handleAddorUpdate} onCancel={this.handleCancel}>
                <Adduser roles={roles} user={this.user} setForm={(form)=>{this.form=form}} />
            </Modal>
           </Card>
        )
    }
}
