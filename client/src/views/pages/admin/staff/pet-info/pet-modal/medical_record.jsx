import React, { useState, useEffect } from 'react';
import { Modal, Card, Avatar, Table, Button, Typography, Divider, Input } from 'antd';

const { Meta } = Card;
const { Title } = Typography;

const EditableField = ({ value, isEditing, onDoubleClick, onChange, onBlur, onKeyDown }) => (
    isEditing ? (
        <Input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            autoFocus
        />
    ) : (
        <div onDoubleClick={onDoubleClick}>{value}</div>
    )
);

const MedicalRecordModal = ({ visible, onCancel, selectedPet, onSave }) => {
    const [isEditing, setIsEditing] = useState({});
    const [editableFields, setEditableFields] = useState({});
    const [initialFields, setInitialFields] = useState({});
    const [data, setData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [editingColumn, setEditingColumn] = useState('');

    useEffect(() => {
        if (selectedPet) {
            const fields = {
                symptom: selectedPet.symptom || '',
                diagnosis: selectedPet.diagnosis || '',
                medicalHistory: selectedPet.medicalHistory || '',
            };
            setEditableFields(fields);
            setInitialFields(fields);
            const petData = selectedPet.prescription || [
                {
                    key: '1',
                    index: '1',
                    name: 'Thuốc đau bụng',
                    description: 'Sáng 2 viên, tối 2 viên sau ăn',
                    unit: 'Viên',
                    quantity: '30',
                },
                {
                    key: '2',
                    index: '2',
                    name: 'Thuốc giảm đau',
                    description: 'Sáng 1 viên, tối 1 viên sau ăn',
                    unit: 'Viên',
                    quantity: '20',
                },
                {
                    key: '3',
                    index: '3',
                    name: 'Thuốc cảm',
                    description: 'Sáng 1 viên, trưa 1 viên, tối 1 viên sau ăn',
                    unit: 'Viên',
                    quantity: '60',
                },
            ];
            setData(petData);
            setInitialData(petData);
        }
    }, [selectedPet]);

    const handleDoubleClick = (field) => setIsEditing({ [field]: true });
    const handleChange = (field, value) => setEditableFields({ ...editableFields, [field]: value });
    const handleBlur = (field) => setIsEditing({ [field]: false });
    const handleKeyDown = (field, e) => e.key === 'Enter' && handleBlur(field);

    const isEditingCell = (record, column) => record.key === editingKey && column === editingColumn;
    const editCell = (record, column) => {
        setEditingKey(record.key);
        setEditingColumn(column);
    };
    const saveCell = () => {
        setEditingKey('');
        setEditingColumn('');
    };

    const handleCellChange = (e, key, column) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        newData[index][column] = e.target.value;
        setData(newData);
    };

    const columns = [
        { title: 'STT', dataIndex: 'index', key: 'index' },
        { title: 'Tên thuốc', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Đơn vị tính', dataIndex: 'unit', key: 'unit' },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    ].map(col => ({
        ...col,
        render: (text, record) => isEditingCell(record, col.dataIndex) ? (
            <Input
                value={text}
                onChange={(e) => handleCellChange(e, record.key, col.dataIndex)}
                onBlur={saveCell}
                onKeyDown={(e) => e.key === 'Enter' && saveCell()}
                autoFocus
            />
        ) : (
            <div onDoubleClick={() => editCell(record, col.dataIndex)}>{text}</div>
        ),
    }));

    const handleSave = () => {
        setInitialFields(editableFields);
        setInitialData(data);
        onSave && onSave(editableFields, data);
        onCancel();
    };

    return (
        <Modal
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>HỒ SƠ BỆNH ÁN</span>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={900}
        >
            <Divider />
            <div style={{ padding: 24, minHeight: 360 }}>
                {selectedPet && (
                    <div style={{ display: 'flex', marginBottom: 24 }}>
                        <Avatar src={selectedPet.imgUrl} size={150} style={{ marginRight: 24 }} />
                        <Card style={{ flex: 1 }}>
                            <Meta
                                title="HỒ SƠ BỆNH ÁN"
                                description={
                                    <div>
                                        <p><strong>NGÀY KHÁM:</strong> 25/02/2024</p>
                                        {['triệu chứng', 'chuẩn đoán', 'tiền sử bệnh lý'].map(field => (
                                            <p key={field} onDoubleClick={() => handleDoubleClick(field)}>
                                                <strong>{field.toUpperCase()}:</strong>
                                                <EditableField
                                                    value={editableFields[field]}
                                                    isEditing={isEditing[field]}
                                                    onDoubleClick={() => handleDoubleClick(field)}
                                                    onChange={(e) => handleChange(field, e.target.value)}
                                                    onBlur={() => handleBlur(field)}
                                                    onKeyDown={(e) => handleKeyDown(field, e)}
                                                />
                                            </p>
                                        ))}
                                    </div>
                                }
                            />
                        </Card>
                    </div>
                )}
                <Title level={4}>ĐƠN THUỐC</Title>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 3 }}
                    style={{ marginBottom: 16 }}
                />
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={handleSave}>Lưu</Button>
                    <Button onClick={onCancel}>Hủy</Button>
                </div>
            </div>
        </Modal>
    );
};

export default MedicalRecordModal;
