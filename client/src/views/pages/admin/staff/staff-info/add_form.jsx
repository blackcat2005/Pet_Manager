import React from 'react';
import { Form, Input, Button, Radio, Select, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddStaffForm = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        navigate('/admin/staff-manage');
    };

    const handleCancel = () => {
        navigate('/admin/staff-manage');
    };

    return (
        <div>
            <Space>
                <Typography.Title level={2}>Thêm nhân viên</Typography.Title>
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
                    rules={[{ required: true, message: 'Hãy nhập vào tên nhân viên!' }]}
                >
                    <Input placeholder="Nhập tên" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Hãy nhập vào email hợp lệ!' }]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    label="Tuổi"
                    name="age"
                >
                    <Input placeholder="Nhập tuổi" />
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[{ required: true, message: 'Hãy chọn giới tính!' }]}
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
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Hãy xác nhận lại mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                >
                    <Input placeholder="Nhập địa chỉ" />
                </Form.Item>

                <Form.Item
                    label="Thành phố"
                    name="city"
                >
                    <Select placeholder="Chọn thành phố">
                        <Option value="hanoi">Hanoi</Option>
                        <Option value="saigon">Ho Chi Minh City</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Quốc gia"
                    name="country"
                >
                    <Input placeholder="Nhập quốc gia" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 4, span: 14 }}
                >
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddStaffForm;
