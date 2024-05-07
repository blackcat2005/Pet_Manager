import React from 'react';
import { DatePicker } from 'antd';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

export const Register = (props) => {
    const { form, stepCurrent, setStepCurrent, formItemLayout,
        serviceCurrent, setServiceCurrent, dataRegister, setDataRegister } = props;

    const onFinishRegister = (values) => {
        setStepCurrent(stepCurrent + 1);
        setDataRegister(values)
        form.resetFields();
    };

    const handleSelect = (value) => {
        setServiceCurrent(value);
    }
    return (
        <div className="service-register__content__form-register">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinishRegister}
                style={{ maxWidth: 700, margin: '0 auto' }}
                scrollToFirstError
            >
                <Form.Item
                    name="service"
                    label="Tên dịch vụ"
                    rules={[{ required: true, message: 'Please select service!' }]}
                >
                    <Select placeholder="Lựa chọn dịch vụ"
                        onChange={(e) => handleSelect(e)}
                    >
                        <Option value="service_01">Dịch vụ khám chữa bệnh</Option>
                        <Option value="service_02">Dịch vụ lưu trữ</Option>
                        <Option value="service_03">Dịch vụ vệ sinh</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name_pet"
                    label="Tên thú cưng"
                    rules={[{ required: true, message: 'Please select name pet!' }]}
                >
                    <Select placeholder="Lựa chọn tên thú cưng">
                        <Option value="name-01">Pet 1</Option>
                        <Option value="name-02">Pet 2</Option>
                    </Select>
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
                {
                    serviceCurrent !== 'service_02' ? null :
                        <Form.Item
                            label="Chọn loại phòng"
                            name="room"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                }


                <Form.Item
                    name="date"
                    label="Thời gian"
                    rules={[
                        {
                            // type: 'object',
                            required: true,
                            message: 'Please select time!'
                        }
                    ]}
                >
                    {serviceCurrent === 'service_02' ? <RangePicker /> : <DatePicker />}
                </Form.Item>

                {
                    serviceCurrent === 'service_02' ? null :
                        <Form.Item
                            name="shifts"
                            label="Ca thực hiện"
                            // tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select placeholder="Lựa chọn ca">
                                <Option value="shifts-01">Ca 1</Option>
                                <Option value="shifts-02">Ca 2</Option>
                            </Select>
                        </Form.Item>
                }

                {
                    serviceCurrent !== 'service_01' ? null :
                        <Form.Item
                            name="checkbox"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 6,
                                span: 16,
                            }}
                        >
                            <Checkbox >Đã phẫu thuật triệt sản</Checkbox>
                        </Form.Item>
                }


                <Form.Item
                    name="description"
                    label={serviceCurrent === 'service_01' ? "Mô tả triệu chứng" : "Lời nhắn"}
                    rules={[{ required: false, message: 'Please input description' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item
                    // name="total"
                    label="Thành tiền"
                >
                    400.000đ
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
