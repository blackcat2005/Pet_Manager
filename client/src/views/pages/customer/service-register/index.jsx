import React, { useState } from 'react';
import { Steps } from 'antd';
import './index.scss';
import {
    Form,
} from 'antd';
import { Payment } from './payment';
import { Register } from './register';
import { Ticket } from './ticket';

const ServiceRegisterPet = () => {
    const [formRegister, formPayment] = Form.useForm();

    const [stepCurrent, setStepCurrent] = useState(0);
    const [serviceCurrent, setServiceCurrent] = useState('service_01');

    const [dataRegister, setDataRegister] = useState({});

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

    return (
        <div className="service-register__container">
            <h1>Đăng ký dịch vụ</h1>

            <div className="service-register__content">
                <div className="service-register__content__step">
                    <Steps
                        current={stepCurrent}
                        items={[
                            {
                                title: 'Đăng ký dịch vụ',
                            },
                            {
                                title: 'Thanh toán',
                            },
                            {
                                title: 'Phiếu dịch vụ',
                            },
                        ]}
                    />
                </div>
                {
                    (
                        stepCurrent === 0 &&
                        <Register
                            form={formRegister}
                            stepCurrent={stepCurrent}
                            setStepCurrent={setStepCurrent}
                            formItemLayout={formItemLayout}
                            serviceCurrent={serviceCurrent}
                            setServiceCurrent={setServiceCurrent}
                            dataRegister={dataRegister}
                            setDataRegister={setDataRegister}
                        />
                    )
                    ||
                    (
                        stepCurrent === 1 &&
                        <Payment
                            form={formPayment}
                            stepCurrent={stepCurrent}
                            setStepCurrent={setStepCurrent}
                            formItemLayout={formItemLayout}
                        />
                    )
                    ||
                    (
                        stepCurrent === 2 &&
                        <Ticket
                            stepCurrent={stepCurrent}
                            setStepCurrent={setStepCurrent}
                            formItemLayout={formItemLayout}
                            serviceCurrent={serviceCurrent}
                            setServiceCurrent={setServiceCurrent}
                            dataRegister={dataRegister}
                            setDataRegister={setDataRegister}
                        />
                    )
                }
            </div>
        </div >
    )
}

export default ServiceRegisterPet;