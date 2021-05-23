import React from 'react'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'
const treeData = [
    {
      title: '平台權限',
      key: 'all',
      children: menuList
    },
  ];
const Item = Form.Item 
const Authform =(props) => {
    const [form] = Form.useForm();
    const {role} = props
    const [checkedKeys, setcheckedKeys] = React.useState([]);
    React.useEffect(() => {
        setcheckedKeys(role.menus)
    }, [role.menus]);
    
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        setcheckedKeys(checkedKeys)
        props.getMenus(checkedKeys)
      };
        return (
            <Form form={form}>
                <Item  name='roleName'  initialValue={role.name} >
                       <Input disabled></Input>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={onCheck}
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                />  
            </Form>
        )
}
export default  Authform