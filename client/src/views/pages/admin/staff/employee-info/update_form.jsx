import React from 'react';
import { Form, Input, Button, Radio, Select, Space, Typography } from 'antd';
const { Option } = Select;

const UpdateCustomerForm = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <Space>
                <Typography.Title level={2}>Cập nhật thông tin nhân viên</Typography.Title>
            </Space>
            <br /><br /><br /><br />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên nhân viên"
                    name="name"
                    rules={[{ required: true, message: 'Please input the customer\'s name!' }]}
                >
                    <Input placeholder="Enter the customer's name" />
                </Form.Item>

                <Form.Item
                    label="Tuổi"
                    name="age"
                >
                    <Input placeholder="Enter age" />
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    name="gender"
                >
                    <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                        <Radio value="other">Không xác định</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Please input a password!' }]}
                >
                    <Input.Password placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Re-enter new password" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                >
                    <Input placeholder="Enter address" />
                </Form.Item>

                <Form.Item
                    label="Thành phố"
                    name="city"
                >
                    <Select placeholder="Please Select">
                        <Option value="hanoi">Hanoi</Option>
                        <Option value="saigon">Ho Chi Minh City</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Quốc gia"
                    name="country"
                >
                    <Input placeholder="Enter country" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 4, span: 14 }}
                >
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => Form.resetFields()}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateCustomerForm;
