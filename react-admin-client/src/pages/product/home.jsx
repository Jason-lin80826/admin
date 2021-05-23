import React, { Component } from 'react'
import {
  Button,
  Card,
  Select,
  Table,
  Input,
  message
} from 'antd'
import Linkbutton from '../../components/Link-button'
import {reqProduct,searchProducts,reqUpdateStatus} from '../api/index'
export default class ProductHome extends Component {
    state = {
        products:[],
        total:0,
        loading:false,
        searchName:'',
        searchType:'productName'
    }
    updateStatus = async(_id,newStatus)=>{
      const result =  await reqUpdateStatus(_id,newStatus) 
      if(result.status===0){
        message.success('更新成功')
        this.getProducts(this.pageNum)
      }
    }
    initialColums = () =>{
        this.columns=[
            {
                title: '商品名稱',
                dataIndex: 'name',
              },
              {
                title: '商品描述',
                dataIndex: 'desc',
              },
              {
                title: '價格',
                dataIndex: 'price',
                render:(price) => '$'+price//指定了對應屬性，所以傳入的是對應屬性值
              },
              {
                width:100,
                title: '狀態',
                render:(product) => {
                  const {status,_id} =  product
                  const newStatus =  status===1?  2 :  1
                    return(
                        <span>
                            <Button type='primary' onClick={()=>{this.updateStatus(_id,newStatus)}}>{status===1? '下架' : '上架'}</Button>
                            <span>{status===1? '在售' : '已下架'}</span>
                        </span>    
                    )
                }
              },
              {
                width:100,
                title: '操作',
                render:(product) => {
  
                    return(
                        <span>
                            <Linkbutton onClick={()=>this.props.history.push('/product/detail',{product})}>詳情</Linkbutton>
                            <Linkbutton onClick={()=>this.props.history.push('/product/update',product)}>修改</Linkbutton>
                        </span>    
                    )
                }
              },
        ]
    }
    getProducts = async(pageNum)=>{
      this.pageNum = pageNum //保存現在的頁數
      this.setState({loading:true})
      const {searchName,searchType} = this.state
      let result
      if(searchName){
        result = await searchProducts({pageNum,pageSize:3,searchName,searchType})
      }else{
        result = await reqProduct(pageNum,3)
      }
      this.setState({loading:false})
      if(result.status===0){
          const {total,list} =result.data
          console.log(total,list)
          this.setState({
            products: list,
            total:total
          })
      }
    }
    componentWillMount(){
        this.initialColums()
    }
    componentDidMount(){
        this.getProducts(1)
    }
    render() {
        const {products,total,loading,searchType} =this.state
        const title = (
        <span>
            <Select value={searchType} 
            style={{width:150}} 
            onChange={(value)=>{this.setState({searchType:value})}}
            >
                <Select.Option value='productName'>按名稱搜索</Select.Option>
                <Select.Option value='productDesc'>按描述搜索</Select.Option>
            </Select>
            <Input placeholder='關鍵字' 
            style={{width:150,margin:'0 15px'}}
            onChange={(e)=>{this.setState({searchName:e.target.value})}}
            />
            <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
        </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/product/update')}>
              添加商品
            </Button>
        )    
        return (
           <Card title={title} extra={extra}>
               <Table  
               bordered
               loading={loading}
               dataSource={products} 
               columns={this.columns}
               rowKey='_id'
               pagination={{
                defaultPageSize:3,
                showQuickJumper:true,
                showSizeChanger:false,
                total,
                current: this.pageNum,
                onChange:this.getProducts
               }}
               />
           </Card>
        )
    }
}
