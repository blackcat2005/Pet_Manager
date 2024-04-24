import React from 'react';
import {
  Button,
  Cascader,
  Avatar,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './personal-info.scss'


// const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const PersonalInfo = () => {
  return (
    <div className='personal-info-wrapper'>
      <div className='personal-info__avatar'>
      <Avatar size={70} icon={<UserOutlined/>} />

      </div>
      <Form
    {...formItemLayout}
    // variant="filled"
    style={{
      width: 700,
    }}
  >
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phonenumber"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Button type="primary" htmlType="submit">
          Thay đổi mật khẩu
        </Button>
      </Form.Item>

      <Form.Item
        label="Quốc gia"
        name="country"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Thành phố"
        name="city"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Địa chỉ cụ thể"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default PersonalInfo;