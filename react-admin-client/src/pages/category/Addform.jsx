import React from 'react'
import {
  Form,
  Select,
  Input
} from 'antd'
const Item = Form.Item 
const Option = Select.Option
const Addform =(props) => {
    const [form] = Form.useForm();
    React.useEffect(() => {
      form.setFieldsValue({
        addform: props.parentId
        });
      props.setForm(form)
    }, [form,props]);
        return (
            <Form form={form}>
                  <Item name='addform'>
                      <Select>
                          <Option value='0' >一級分類列表</Option>
                          {
                            props.categorys.map((c)=><Option key={c._id} value={c._id} >{c.name}</Option>)
                          }
                      </Select>
                  </Item>
                  <Item  name='addInput' initialValue=''rules={[{ required: true, message: '請輸入名稱' }]}>
                       <Input placeholder="請輸入"></Input>
                  </Item>
            </Form>
        )
}
export default  Addform 