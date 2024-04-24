import { useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import messages from 'assets/lang/messages'
import auth from 'api/auth'
// import useAuth from 'hooks/useAuth'
import background from 'assets/images/background.png'
import avatar from 'assets/images/avatar.svg'
import './login.scss'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    // const { setToken } = useAuth()
    const handleSubmit = async (values) => {
        try {
            const response = await auth.login(values)
            console.log(response.data);
            if (response.status === 200) {
                // setToken(response.data.token)
                alert('Đăng nhập thành công')
                navigate('/pet')
               
            }
        } catch (error) {
            //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
            alert('đăng nhập thất bại')
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

    return (
        <div className="login-container">
            <div className="login-container__sub">
                <img
                    className="login-container__sub__image"
                    src={background}
                    alt={'backgound'}
                />
                <div className="login-container__sub__content">
                    <Form
                        name="login"
                        className="login-container__sub__content__form"
                        onFinish={handleSubmit}
                    >
                        <img
                            className="image-avatar"
                            src={avatar}
                            alt={'avatar'}
                        />
                        <h2>Welcome</h2>
                        <div className="login-container__sub__content__form__item">
                            <i>
                                <UserOutlined />
                            </i>
                            <Form.Item
                                className="form-item"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['email_required'],
                                    },
                                    {
                                        type: 'email',
                                        message: messages['invalid_email'],
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    className="input email"
                                />
                            </Form.Item>
                        </div>

                        <div className="login-container__sub__content__form__item">
                            <i>
                                <UnlockOutlined />
                            </i>
                            <Form.Item
                                className="form-item"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: messages['password_required'],
                                    },
                                    {
                                        type: 'string',
                                        min: 6,
                                        max: 24,
                                        message:
                                            messages['invalid_password_length'],
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Password"
                                    className="input password"
                                />
                            </Form.Item>
                        </div>
                        <label className="forgot-password" onClick={showModal}>
                            Forgot Password
                        </label>
                        <Modal
                            className="forgot-password-modal"
                            title="Quên mật khẩu"
                            visible={isModalVisible}
                            onOk={form.submit}
                            onCancel={handleCancel}
                        >
                            <Form
                                form={form}
                                // onFinish={handleForgotPasswordSubmit}
                            >
                                <h3>Email</h3>
                                <div className="forgot-password-modal__email">
                                    <i className="forgot-password-modal__email__icon">
                                        <UserOutlined className="icon" />
                                    </i>
                                    <Form.Item
                                        className="forgot-password-modal__email__item"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    messages['email_required'],
                                            },
                                            {
                                                type: 'email',
                                                message:
                                                    messages['invalid_email'],
                                            },
                                        ]}
                                    >
                                        <Input
                                            name="forgot-password-email"
                                            type="email"
                                            placeholder="Email"
                                            size="large"
                                            className="forgot-password-modal__email__item__input"
                                        />
                                    </Form.Item>
                                </div>
                            </Form>
                        </Modal>

                        <Button
                            className="button-submit"
                            type="primary"
                            htmlType="submit"
                        >
                            LOGIN
                        </Button>
                        <a className="create-account" href="/register">
                            Create new account{' '}
                        </a>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;
