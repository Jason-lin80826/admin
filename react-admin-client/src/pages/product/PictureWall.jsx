import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDelImgs} from '../api/index'
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
export default class PictureWall extends Component {
    static propType={
        imgs: PropTypes.isarray
    }
    state = {
        previewVisible: false, //標示是否顯示大圖
        previewImage: '',//大圖的url
        previewTitle: '',
      };
      constructor(props){
          super(props)
          let fileList = []
          const {imgs} = this.props
          if(imgs && imgs.length>0){
            fileList = imgs.map((img,index)=>({
                uid: -index,
                name: img,
                status: 'done',
                url:'http://120.55.193.14:5000/upload/'+img
            }))
        }
        this.state={
            previewVisible: false, //標示是否顯示大圖
            previewImage: '',//大圖的url
            previewTitle: '',
            fileList
        }
      }
    
      handleCancel = () => this.setState({ previewVisible: false });
    
      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };
    
      handleChange = async({ file,fileList }) => {
        console.log(fileList)
          //一但上傳成功,將當前上傳的file修正{name,url}
          if(file.status==='done'){
              const result = file.response
              if(result.status===0){
                message.success('圖片上傳成功')  
                const {name,url} =  result.data
                const realfile = fileList[fileList.length-1]
                realfile.name = name
                realfile.url = url
              }else{
                  message.error('圖片上傳失敗')
              }
          }else if(file.status==='removed'){
              const result = await reqDelImgs(file.name)
              if(result.status===0){
                  message.success('刪除圖片成功')
              }else{
                  message.error('刪除圖片失敗')
              }
          }
        this.setState({ fileList })
      };
      componentDidMount(){
    	//通过pros接收父组件传来的方法
        this.props.onRef(this)
     }
      getImgs = ()=>{
          return this.state.fileList.map((file)=>file.name)
      }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        return (
          <>
            <Upload
              action="http://120.55.193.14:5000/manage/img/upload"//上傳圖片的接口地址
              accept='image/*'//接收的圖片格式
              name='image'//請求參數名
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </>
        );
    }
}
