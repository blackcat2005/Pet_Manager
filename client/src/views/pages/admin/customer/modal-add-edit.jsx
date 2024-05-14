import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import auth from 'api/auth';


const ModalCustomer = (props) => {

    const { form, data, setData, isModalOpen, setIsModalOpen, handleOk, handleCancel,
        action, dataModal, setDataModal } = props;

    const onFinish = async (values) => {
        if (action === "CREATE") {
            // api create
            console.log(values);
            const response = await auth.register(values);
            console.log(response);
            handleOk();
        }

    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };


    useEffect(() => {
        form.setFieldsValue({
            fullname: dataModal.fullname,
            username: dataModal.username,
            email: dataModal.email,
            gender: dataModal.gender,
            phone_numbers: dataModal.phone_numbers,
            address: dataModal.address,
            city: dataModal.city,
            country: dataModal.country,
        });
    }, [dataModal])

    return (
        <>
            <Modal
                title={action === "CREATE" ? "Thêm mới khách hàng" : "Cập nhật thông tin khách hàng"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                width={630}
                footer={<></>}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addNewCustomer"
                    onFinish={onFinish}
                    style={{ maxWidth: 700, margin: '0 auto' }}
                    scrollToFirstError
                    initialValues={
                        {
                            fullname: dataModal.fullname,
                            username: dataModal.username,
                            email: dataModal.email,
                            gender: dataModal.gender,
                            phone_numbers: dataModal.phone_numbers,
                            address: dataModal.address,
                            city: dataModal.city,
                            country: dataModal.country,
                        }
                    }
                >
                    <Form.Item
                        name="fullname"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Hãy nhập họ và tên khách hàng!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                            <Radio value="other">Khác</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
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
                        label="Địa chỉ"
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
                        label="Đất nước"
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
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mật khẩu!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="password2"
                        label="Xác nhận mật khẩu"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy xác nhận lại mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error('Mật khẩu của bạn không trùng khớp!'),
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 14,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit"
                            style={{ marginRight: "10px" }}
                        >
                            {action === "CREATE" ? "Thêm" : "Lưu"}
                        </Button>
                        <Button onClick={() => handleCancel()}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}

export default ModalCustomer;