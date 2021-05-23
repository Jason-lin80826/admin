import React from 'react'
import {
  Form,
  Input
} from 'antd'
const Item = Form.Item 
const Addrole =(props) => {
    const [form] = Form.useForm();
    React.useEffect(() => {
      props.setForm(form)
    }, [form,props]);
        return (
            <Form form={form}>
                  <Item  name='addRole' initialValue=''rules={[{ required: true, message: '請輸入名稱' }]}>
                       <Input placeholder="請輸入"></Input>
                  </Item>
            </Form>
        )
}
export default  Addrole