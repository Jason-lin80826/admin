import React from 'react'
import {
  Form,
  Input,
  Select,
} from 'antd'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const Option = Select.Option
const Item = Form.Item 
const Adduser =(props) => {
    const [form] = Form.useForm();
    const {roles} = props
    const user = props.user || {}
    console.log(user)
    React.useEffect(() => {
        if(user._id) {
            form.setFieldsValue({
                username: user.username,
                phone: user.phone,
                email: user.email,
                role_id: user.role_id
            });
        }
        props.setForm(form)
    }, [form,props]);
        return (
            <Form form={form} {...layout}>
                  <Item label="用戶名" name='username' initialValue='' rules={[{ required: true, message: '請輸入用戶名' }]}>
                       <Input placeholder="請輸入"></Input>
                  </Item>
                  {user._id? null :
                   <Item label="密碼"  name='password' rules={[{ required: true, message: '請輸入密碼' }]}>
                        <Input.Password placeholder="請輸入"></Input.Password>
                   </Item>
                  } 
                  <Item label="手機" name='phone' initialValue='' rules={[{ required: true, message: '請輸入手機' }]}>
                       <Input placeholder="請輸入"></Input>
                  </Item>
                  <Item label="信箱" name='email' initialValue='' rules={[{ required: true, message: '請輸入信箱' }]}>
                       <Input placeholder="請輸入"></Input>
                  </Item>
                  <Item label="角色" name='role_id' initialValue='' rules={[{ required: true, message: '請輸入角色' }]}>
                       <Select>
                            {roles.map((role )=><Option key={role._id} value={role._id}>{role.name}</Option>)}
                       </Select>
                  </Item>
            </Form>
        )
}
export default  Adduser