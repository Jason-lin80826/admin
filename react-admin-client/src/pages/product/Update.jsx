import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
import  {reqCategorys ,reqAddOrUpdate} from '../api/index.js'
import PictureWall from './PictureWall'
import ControlledEditor from './richtext'
const {Item} = Form
const {TextArea} = Input
// 指定itemlayout
const layout = {
    labelCol: { span: 1.5 },//左邊lanbel寬度
    wrapperCol: { span: 8 }, //右側包裹的寬度
  };

export default class ProductUpdate extends Component {
    state = {
        options:[]
    }

    getCategorys= async (parentId)=>{
        const result = await reqCategorys(parentId)
        if(result.status===0){
            const categorys = result.data
            if(parentId==='0'){
                this.initOptions(categorys)
            }else{
                return  categorys
            }
            
        }
    }
    initOptions = async(categorys) =>{
        //根據categorys生成新的arrays
       const options = categorys.map((c)=>({
        value: c._id,
        label: c.name,
        isLeaf: false,
       }))
       //如果是二級列表的更新
       const {isUpdate,product} = this
       const {pCategoryId} =product
       if(isUpdate && pCategoryId!=='0'){
           // 獲取二級分類列表
        const subcategorys = await this.getCategorys(pCategoryId)
        const childOptions = subcategorys.map((c)=>({
            value: c._id,
            label: c.name,
            isLeaf: true,
        }))
        const targetOption = options.find((option)=>option.value===pCategoryId)
        targetOption.children = childOptions
       }

       this.setState({options})
    }
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        // 獲取二級分類列表
        const subcategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if(subcategorys && subcategorys.length>0){
            const childOptions = subcategorys.map((c)=>({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            // 關連到option上
            targetOption.children  = childOptions
        }else{
            targetOption.isLeaf=true
        } 
        this.setState([...this.state.options]);
      };
    
    onFinish = async(values) => {
        console.log('Success:', values);
        let categoryIds = values.productcategory
        let categoryId,pCategoryId
        if(categoryIds.length===1){
            pCategoryId = '0'
            categoryId = categoryIds[0]
        }else{
            pCategoryId = categoryIds[0]
            categoryId  = categoryIds[1]
        }
        const imgs = this.child.getImgs()
        const details = this.child2.getDetails()
        // 收集數據，封裝成product
        let product = {
            name: values.productname,
            desc: values.productdesc,
            price:values.productprice,
            categoryId: categoryId,
            pCategoryId: pCategoryId,
            img:imgs,
            detail:details
        }
        if(this.isUpdate){
            product._id = this.product._id
        }
        const result = await reqAddOrUpdate(product)
        if(result.status===0){
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
            this.props.history.goBack()
        }else{
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失敗`)
        }
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    checkPrice = (rule,value)=>{
        console.log(value)
        if (value>= 0) {
            return Promise.resolve();
          }else{
            return Promise.reject(new Error('Price must be greater than zero!'));
          } 
    }
    onRef = (ref) => {
        this.child = ref
    }  
    onRef2 = (ref2) => {
        this.child2 = ref2
    }  
    componentDidMount(){
      this.getCategorys('0')
    }
    componentWillMount(){
        const product= this.props.location.state
        console.log(product)
        // 保存是否是更新的標誌
        this.isUpdate =!!product
        //保存初始的值
        this.product= product || {}
        
      }
    render() {
    const {product,isUpdate} = this
    const categoryIds = []
    const {categoryId,pCategoryId,imgs,detail} =product
    console.log(imgs)
    if(isUpdate){
        if(categoryId==='0'){
          //商品是一級分類商品
          categoryIds.push(categoryId)
          //商品是二級分類商品
        }else{
          categoryIds.push(pCategoryId)  
          categoryIds.push(categoryId)
        }
    }
    const title = (
        <span>
            <Button onClick={()=>this.props.history.goBack()} type='primary'>返回</Button>
            {this.isUpdate?'修改商品' : '添加商品'}
        </span>
    )
        return (
            <Card title={title}>
               <Form {...layout}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                initialValues={{ 
                    productname:product.name,
                    productdesc:product.desc,
                    productprice:product.price,
                    productcategory:categoryIds
                }}
               >
                   <Item label='商品名稱'  name="productname" rules={[{ required: true, message: '請輸入商品名稱' }]}>
                    <Input placeholder='請輸入商品名稱' />
                   </Item>
                   <Item label='商品描述' name="productdesc" rules={[{ required: true, message: '請輸入商品描述'}]}>
                    <TextArea placeholder='請輸入商品描述' allowClear autoSize={{ minRows: 1, maxRows: 6 }}/>
                   </Item>
                   <Item label='商品價格' name="productprice" rules={[{ required: true, message: '請輸入商品價格'},{validator: this.checkPrice}]}>
                    <Input type='number' placeholder='請輸入價格' addonAfter='元'/>
                   </Item>
                   <Item label='商品分類' name="productcategory" rules={[{ required: true, message: '請輸入商品描述'}]}>
                    <Cascader options={this.state.options} loadData={this.loadData}/>
                   </Item>
                   <Item label='商品圖片'>
                       {/* 利用ref調用子組建的方法 */}
                    <PictureWall onRef={this.onRef} imgs={imgs}/>
                   </Item>
                   <Item label='文本編輯器' labelCol={{span:1.5 }} wrapperCol={{ span: 18 }}>
                     <ControlledEditor  onRef2={this.onRef2} detail={detail}/>
                   </Item>
                   <Item >
                    <Button type='primary' htmlType="submit">提交</Button>
                   </Item>
               </Form>
            </Card>
        )
    }
}
