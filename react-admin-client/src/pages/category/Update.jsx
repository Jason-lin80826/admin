import React from 'react'
import {
  Form,
  Input
} from 'antd'
const Update = (props) => {
    const [form] = Form.useForm();
    const categoryName = props.categoryName
    React.useEffect(() => {
        form.setFieldsValue({
            categoryName
          });
        props.setForm(form)
      }, [categoryName,props,form]);
        return (
            <Form form={form}>
                <Form.Item name="categoryName" rules={[{ required: true, message: '請輸入名稱' }]}>
                    <Input />
                </Form.Item>
            </Form>
        )
}
export default  Update