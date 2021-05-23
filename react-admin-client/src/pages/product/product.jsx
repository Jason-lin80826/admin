import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductUpdate from './Update'
import ProductDetail from './detail'
import './product.css'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/> {/*路徑完全符合*/}
                <Route path='/product/update' component={ProductUpdate} />
                <Route path='/product/detail' component={ProductDetail} /> 
                <Redirect to='/product'/>
            </Switch>
        )
    }
}
