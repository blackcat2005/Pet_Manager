import React, { useState, useEffect } from 'react';
import { Modal, Card, Avatar, Table, Button, Typography, Divider, Input } from 'antd';
import service from 'api/service';
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
        
        const body = { pet_id: selectedPet.pet_id } 
        console.log("id ",selectedPet.pet_id );
        console.log(selectedPet)

        service.getMedicalRecordsbyPetId(body)
        .then((res) => {
            console.log(res);
        })

        if (selectedPet) {

            const fields = {
                date: '25/02/2024',
                symptom: selectedPet.symptom || 'default',
                diagnosis: selectedPet.diagnosis || 'default',
                medicalHistory: selectedPet.medicalHistory || 'default',
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
        { title: 'Tên thuốc', dataIndex: 'name', key: 'name', width: '20%' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Đơn vị tính', dataIndex: 'unit', key: 'unit', width: '15%'  },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', width: '15%' },
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
            style={{ top: 0 }}
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>HỒ SƠ BỆNH ÁN</span>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={1000}
        >
            <Divider />
            <div style={{ padding: 24, minHeight: 360 }}>
                {selectedPet && (
                    <div className='gap-20 items-center' style={{ display: 'flex', marginBottom: 24 }}>
                        <Avatar src={'/image.png'} size={150} style={{ marginRight: 24 }} />
                        <Card style={{ flex: 1 }}>
                            <Meta
                                title={<div className='flex flex-row items-center gap-2'><p className='text-xl font-bold'>HỒ SƠ BỆNH ÁN</p> <p className='flex flex-row items-center text-xs font-thin'>NGÀY KHÁM: 
                                <EditableField
                                    value={editableFields['date']}
                                    isEditing={isEditing['date']}
                                    onDoubleClick={() => handleDoubleClick('date')}
                                    onChange={(e) => handleChange('date', e.target.value)}
                                    onBlur={() => handleBlur('date')}
                                    onKeyDown={(e) => handleKeyDown('date', e)}
                                /></p></div>}
                                description={
                                    <div className='flex flex-col gap-5'>
                                        {[{ label: 'triệu chứng', name: 'symptom' }, { label: 'chuẩn đoán', name: 'diagnosis' }, { label: 'tiền sử bệnh lý', name: 'medicalHistory' }].map(field => (
                                            <p className='flex flex-row h-10 items-center' key={field.name} onDoubleClick={() => handleDoubleClick(field.name)}>
                                                <strong className='min-w-[200px]'>{field.label.toUpperCase()}:</strong>
                                                <EditableField
                                                    value={editableFields[field.name]}
                                                    isEditing={isEditing[field.name]}
                                                    onDoubleClick={() => handleDoubleClick(field.name)}
                                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                                    onBlur={() => handleBlur(field.name)}
                                                    onKeyDown={(e) => handleKeyDown(field.name, e)}
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
