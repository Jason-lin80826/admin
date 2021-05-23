// 能發送異步請求的ajax函數模組封裝axios
// 函數返回promise
// 可以統一處理錯誤，在外層創建一個自己的promise，且出錯時直接提示
import {message} from 'antd'
import axios from 'axios'
export default function ajax(url,data={},type='GET'){
  return new Promise((resolve,reject)=>{
    let promise
    if(type==='GET'){
      promise = axios.get(url,{
           params:data
       })
    }else{
      promise = axios.post(url,data)
    }
    promise.then(
        response =>{
            resolve(response.data)
        }
    ).catch(
        error =>{
           message.error('請求出錯了'+error.message)
        }
    )
  })
}