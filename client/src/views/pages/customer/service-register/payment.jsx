import React from 'react';
import { DatePicker } from 'antd';
import {
    Button,
    Form,
    Input,
} from 'antd';

export const Payment = (props) => {
    const { form, stepCurrent, setStepCurrent, formItemLayout } = props;

    const onFinishPayment = (values) => {
        setStepCurrent(stepCurrent + 1);
        form.resetFields();
    };

    return (
        <div className="service-register__content__form-payment">
            <Form
                {...formItemLayout}
                form={form}
                name="payment"
                onFinish={onFinishPayment}
                style={{ maxWidth: 700, margin: '0 auto' }}
                scrollToFirstError
            >
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
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
                    name="creditNumber"
                    label="Credit Number"
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
                    name="expDate"
                    label="Exp Date"
                    rules={[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select time!'
                        }
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="cvv"
                    label="CVV"
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
                    name="zipCode"
                    label="Zip Code"
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