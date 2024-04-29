import { Button, Avatar, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './personal-info.scss'
import useAuth from 'hooks/useAuth'
import { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

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
}

const PersonalInfo = () => {
  const { userData, updateUserData } = useAuth()

  // console.log(userData.roles[0]);

  const handleSubmit = (values) => {
    // console.log('Success:', values);
    updateUserData(values)
  }
  const handleChangePassword = (e) => {
    console.log(e)
  }

  return (
    <div className="personal-info-wrapper">
      <div className="personal-info__avatar">
        <Avatar size={70} icon={<UserOutlined />} />
      </div>
      {userData === null ? (
        <>
          <LoadingOutlined />
        </>
      ) : (
        <Form
          onFinish={handleSubmit}
          {...formItemLayout}
          style={{
            width: 700,
          }}
        >
          <Form.Item
            initialValue={userData.fullname}
            label="Họ và tên"
            name="fullname"
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
            initialValue={userData.username}
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
            initialValue={userData.email}
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
            initialValue={userData.phone_numbers}
            label="Số điện thoại"
            name="phone_numbers"
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
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input!'
            //   }
            // ]}
          >
            <Button type="primary" onClick={handleChangePassword}>
              Thay đổi mật khẩu
            </Button>
          </Form.Item>

          <Form.Item
            initialValue={userData.country}
            label="Quốc gia"
            name="country"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input!'
            //   }
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item initialValue={userData.city} label="Thành phố" name="city">
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={userData.address}
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
      )}
    </div>
  )
}

export default PersonalInfo
