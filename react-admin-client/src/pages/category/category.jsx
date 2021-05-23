import React, { Component } from 'react'
import { Card ,Table,Space,Modal} from 'antd';
import {reqCategorys,reqUpdateCategory , reqAddCategory} from '../api/index'
import LinkButton from '../../components/Link-button'
import Addform from './Addform'
import Update from './Update'
export default class Category extends Component {
    state = {
        categorys:[],//一級分類列表
        subCategory:[],
        parentName:'',
        parentId:'0',
        loading :false,
        visible:0
    }
    // 初始化
    initColumns = ()=>{
        this.columns = [
            {
              title: '分類名稱',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 300,
              render:(category)=>{
                  return(
                    <Space size="middle">
                    <LinkButton onClick={()=>{this.showUpdate(category)}}>修改分類</LinkButton>
                    {
                      this.state.parentId==='0'?<LinkButton onClick={()=>{this.subCategorys(category)}}>查看子分類</LinkButton>
                      : null
                    }
                    </Space>
                 )
              }
            },
          ];
    }
    // 獲取一級/二級分類列表
    getCategorys = async(parentId)=>{
        parentId = parentId || this.state.parentId
        this.setState({loading:true})
        const result = await reqCategorys(parentId)
        this.setState({loading:false})
        const categorys = result.data
        if(parentId==='0'){
            this.setState({categorys})
        }else{
            this.setState({subCategory:categorys})
        }
        
    };
    subCategorys = (category) =>{
        console.log(category._id)
        this.setState({parentName:category.name
                      ,parentId:category._id},()=>{
                          this.getCategorys()
                      })
    }
    showCategorys = () =>{
        this.setState({
            subCategory:[],
            parentName:'',
            parentId:'0',
        })
    }
    showAdd = () =>{
        this.setState({
          visible:1
        })
    }
    handleAdd = () =>{
        this.form.validateFields()
        .then(async(values) => {
         // 關閉視窗
        this.setState({
            visible:0
        }) 
        const parentId = values.addform
        const categoryName = values.addInput
        // 清除儲存的數據
        this.form.resetFields()
        const result = await reqAddCategory( categoryName,parentId )
        if(result.status===0){
            //重新渲染頁面
            if(parentId===this.state.parentId){
              this.getCategorys()
            }
            else{
              this.getCategorys('0')
            }
        }
        })
    }
    showUpdate =(category)=>{
        this.category = category 
        this.setState({
            visible:2
        })
    }
    handleUpdate = () =>{
        this.form.validateFields()
        .then(async(values) => {
            // 關閉視窗
            this.setState({
                visible:0
            })
            const categoryId = this.category._id
            const {categoryName} = values
            //發送修改的請求
            const result = await reqUpdateCategory(categoryId,categoryName)
            if(result.status===0){
                 //重新渲染頁面
            this.getCategorys()
            }
        })
    }
    handleCancel = ()=>{
        // 清除儲存的數據
        this.form.resetFields()
        this.setState({
            visible:0
        })
    }
    componentWillMount(){
        this.initColumns()
    };
    componentDidMount(){
        this.getCategorys()
    };
    render() {
        const {categorys,loading,parentId,subCategory,parentName,visible} = this.state
        const category = this.category || {}
        const title = parentId==='0'? '一級分類列表' : 
        (
          <span>
            <LinkButton onClick={this.showCategorys}>一級分類列表</LinkButton>
            <span>&gt;</span>
            <span>{parentName}</span>
          </span>
        )     
          
        return (
            <div>
                <Card title={title} extra={<LinkButton type="primary" onClick={this.showAdd}>添加</LinkButton>}>
                <Table 
                dataSource={parentId==='0'? categorys : subCategory} 
                columns={this.columns} 
                loading={loading}
                bordered 
                rowKey='_id'
                pagination={{defaultPageSize:5,showQuickJumper:true,showSizeChanger:false}}/>;
                </Card>
                <Modal title="添加分類" visible={visible===1} onOk={this.handleAdd} onCancel={this.handleCancel}>
                <Addform categorys={categorys} parentId={parentId} setForm={(form)=>{this.form=form}}/>
                </Modal>
                <Modal title="修改分類" visible={visible===2} onOk={this.handleUpdate} onCancel={this.handleCancel}>
                    <Update categoryName={category.name} setForm={(form)=>{this.form=form}}/>
                </Modal>
            </div>
        )
    }
}
