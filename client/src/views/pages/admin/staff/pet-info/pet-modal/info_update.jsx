import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio, Button, Divider } from 'antd';

const UpdateModal = ({ visible, onCancel, selectedPet }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedPet) {
            form.setFieldsValue({
                name: selectedPet.name,
                age: selectedPet.age,
                gender: selectedPet.gender,
                health: selectedPet.health,
                weight: selectedPet.weight,
                types: selectedPet.types,
                description: selectedPet.description,
            });
        }
    }, [selectedPet]);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Modal
            title="Cập nhật thông tin"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={900}
        >
            {selectedPet && (
                <>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: '0 0 150px', textAlign: 'center', marginRight: '20px' }}>
                            <img src={selectedPet.imgUrl} alt={selectedPet.name} style={{ borderRadius: '50%', width: 100, height: 100, marginTop: 20 }} />
                        </div>
                        <div style={{ flex: '1' }}>
                            <Form
                                form={form}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tên thú cưng"
                                    name="name"
                                    rules={[{ required: true, message: 'Give the target a name!' }]}
                                >
                                    <Input placeholder="Give the target a name" />
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
                                    rules={[{ required: true, message: 'Please select the gender!' }]}
                                >
                                    <Radio.Group>
                                        <Radio value="male">Đực</Radio>
                                        <Radio value="female">Cái</Radio>
                                        <Radio value="other">Không xác định</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label="Sức khỏe"
                                    name="health"
                                    rules={[{ required: true, message: 'Please input status of pet\'s health!' }]}
                                >
                                    <Input placeholder="example" />
                                </Form.Item>

                                <Form.Item
                                    label="Cân nặng"
                                    name="weight"
                                >
                                    <Input placeholder="Nhập cân nặng" />
                                </Form.Item>

                                <Form.Item
                                    label="Chủng loại"
                                    name="types"
                                >
                                    <Input placeholder="Nhập chủng loại" />
                                </Form.Item>

                                <Form.Item
                                    label="Mô tả"
                                    name="description"
                                >
                                    <Input.TextArea placeholder="Nhập mô tả" />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                        Lưu
                                    </Button>
                                    <Button onClick={onCancel}>
                                        Hủy
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <Divider />
                </>
            )}
        </Modal>
    );
};

export default UpdateModal;
