import React, {useEffect, useState } from 'react'
import { Form, Input, Button, Modal, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import auth from 'api/auth'
import './login.scss'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from 'hooks/useAuth'

function Login() {

  const { isLoggedIn, setUserState } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (dataUser) => {
    try {
      if (dataUser) {
        const res = await auth.login(dataUser)
        console.log('response', res)
        setUserState(res.data);
        toast.success('Đăng nhập thành công')
        navigate('/pet')
      }
    } catch (error) {
      console.log('error: ', error)
      //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
      toast.error('Đăng nhập thất bại')
    }
  }

  // const handleForgotPasswordSubmit = async (values) => {
  //     try {
  //         const response = await auth.forgotPassword(values)
  //         alert(response.data.message)
  //     } catch (error) {
  //         //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
  //         alert(error.response.data.message)
  //     }
  //     setIsModalVisible(false)
  // }

  const handleToRegister = () => {
    navigate('/register')
  }

  // if (isLoggedIn) {
  //   return <Navigate to={state?.from || "/pet"} />;
  // }

  return (
    <div className='login-container'>
      <div className='login-container__sub'>
        <div className='login-container__sub__content'>
          <Form
            layout='vertical'
            name='login'
            className='login-container__sub__content__form'
            initialValues={{
              remember: true
            }}
            onFinish={handleSubmit}
          >
            <div className='login-container__sub__content__form__header'>
              <h3 className='login-container__sub__content__form__header__title'>
                Đăng nhập
              </h3>
              <hr />
              <div className='login-container__sub__content__form__header__sub-title'>
                Nếu bạn đã có tài khoản, bạn có thể đăng nhập bằng email/tên
                đăng nhập và mật khẩu
              </div>
            </div>

            <Form.Item
              label='Địa chỉ email'
              className='form-item'
              name='email'
              rules={[
                {
                  required: true,
                  message: messages['email_required']
                },
                {
                  type: 'email',
                  message: messages['invalid_email']
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Email'
              />
            </Form.Item>

            <Form.Item
              label='Mật khẩu'
              className='form-item'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
                className='input-password'
              />
            </Form.Item>
            <Form.Item>
              <div className='remember-forgot'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Ghi nhớ tôi</Checkbox>
                </Form.Item>

                <div className='login-form-forgot'>Quên mật khẩu</div>
              </div>
            </Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              onClick={() => handleSubmit()}
            >
              Đăng nhập
            </Button>
          </Form>

          <div className='register'>
            Chưa có tài khoản?
            <span className='register-link' onClick={() => handleToRegister()}>
              Đăng ký tại đây
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
