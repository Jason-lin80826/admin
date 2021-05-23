import React, { Component } from 'react'
import {
 Card,
 Table,
 Button,
 Modal,
 message
} from 'antd'
import storgeUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqRoles , reqAddRoles, reqUpdateRoles} from '../api/index'
import AddRole from './addrole'
import Authform from './authform'
export default class Role extends Component {
    state = {
        roles:[], //所有角色列表
        role:{},   //被選中的角色
        visible:0,
        authVisible:0
    }
    onRow = (role) =>{
        return{
            onClick:event =>{
                this.setState({role})
            }
        }
    }
    initialColums = () =>{
        this.columns=[
            {
                title: '角色名稱',
                dataIndex: 'name',
              },
              {
                title: '創建時間',
                dataIndex: 'create_time',
              },
              {
                title: '授權時間',
                dataIndex: 'auth_time',
              },
              {
                title: '授權人',
                dataIndex: 'auth_name',
              },
        ]
    }  
    getRoles= async() =>{
      const result = await reqRoles()
      if(result.status===0){
          const roles = result.data
          this.setState({roles})
      }
    }
    getMenus = (menus) =>{
       if(menus){
        const {role} = this.state
        role.menus = menus
       }
    } 
    handleAdd = async() =>{
        this.form.validateFields()
        .then(async(values) => {
         // 關閉視窗
        this.setState({
            visible:0
        }) 
        const roleName = values.addRole
        this.form.resetFields()
        const result = await reqAddRoles(roleName) 
        if(result.status===0){
            //新產生的角色 
           const role = result.data
           message.success('添加成功')
           this.setState(state=>({
               roles: [...state.roles,role]
           }))
        }else{
            message.error('添加失敗')
        }
      })
    }
    handleUpdate = async() => {
        this.setState({
           authVisible:0
        }) 
        const {role} = this.state
        const result = await reqUpdateRoles(role)
        if(result.status===0){
            // 如果修改自己的權限
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {}
                storgeUtils.remove()
                this.props.history.replace('/login')
                message.success('請重新登錄')
            }else {
                message.success('更改權限成功')
                this.setState({
                    roles: [...this.state.roles]
                }) 
            }
        }else{
            message.error('更改權限失敗')
        }
    }
    handleCancel = ()=>{
        // 清除儲存的數據
        // this.form.resetFields()
        this.setState({
            visible:0,
            authVisible:0
        })
    }
    componentWillMount(){
        this.initialColums()
    }   
    componentDidMount(){
        this.getRoles()
    }
    render() {
        const {roles,role,visible,authVisible} =this.state
        const title = (
            <span>
                <Button type='primary' onClick={()=>{this.setState({visible:1})}}>創建角色</Button> &nbsp;&nbsp;
                <Button type='primary' onClick={()=>{this.setState({authVisible:1})}} disabled={!role._id}>設置角色權限</Button>
            </span>
        )
        return (
            <>
            <Card title={title}>
                <Table
                  bordered
                  dataSource={roles} 
                  columns={this.columns}
                  rowKey='_id'
                  pagination={{defaultPageSize:5,showSizeChanger:false}}   
                  rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role._id],
                    onSelect: (role) => {
                        this.setState({
                            role
                        })
                    }
                  }}         
                  onRow={this.onRow}
                />
            </Card>
            <Modal title="添加角色" visible={visible===1} onOk={this.handleAdd} onCancel={this.handleCancel}>
                <AddRole  setForm={(form)=>{this.form=form}}/>
            </Modal>
            <Modal title="添加角色權限" visible={authVisible===1} onOk={this.handleUpdate} onCancel={this.handleCancel}>
                <Authform role={role} getMenus={this.getMenus}/>
            </Modal>
            </>
        )
    }
}
