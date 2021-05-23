import React, { Component } from 'react'
import {Card,List} from 'antd'
import {reqCategory} from '../api/index'
const Item = List.Item
export default class ProductDetail extends Component {
    state = {
        cName1:'',
        cName2:'',
    }
    async componentDidMount(){
        const {pCategoryId,categoryId} = this.props.location.state.product
        
        // 1及分類
        const result = await reqCategory(categoryId)
        console.log(result)
        if(pCategoryId==='0'){
            const cName1 = result.data.name
            this.setState({cName1})
        }else{
            const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]) 
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })
        }
    }
    render() {
        const {name,price,detail,desc,imgs} = this.props.location.state.product
        const {cName1,cName2} =this.state
        const title = (
            <span>
                <span>&lt;</span>
                <span>商品詳情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
              <List>
                  <Item>
                      <span className='left'>商品名稱</span>
                      <span>{name}</span>
                  </Item>
                  <Item>
                      <span className='left'>商品描述</span>
                      <span>{desc}</span>
                  </Item>
                  <Item>
                      <span className='left'>商品價格</span>
                      <span>{price}</span>
                  </Item>
                  <Item>
                      <span className='left'>所屬分類</span>
                      <span>{cName1} {cName2? '-->' +cName2: ''}</span>
                  </Item>
                  <Item>
                      <span className='left'>商品圖片</span>
                      <span>
                          {
                            imgs.map((img)=>{
                               return <img key={img} className='product-img' src={'http://120.55.193.14:5000/upload/'+img} alt='img'/>
                            })
                          }
                      </span>
                  </Item>
                  <Item>
                      <span className='left'>商品詳情</span>
                      <span dangerouslySetInnerHTML={{__html:detail}}>
                      </span>    
                  </Item>
              </List>
            </Card>
        )
    }
}
