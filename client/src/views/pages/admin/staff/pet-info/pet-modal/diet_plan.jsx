import React, { useState, useEffect } from 'react';
import { Modal, Card, Avatar, Table, Button, Typography, Divider, Input, Select} from 'antd';

const { Meta } = Card;
const { Option } = Select;

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
        <div onDoubleClick={onDoubleClick} style={{ display: 'inline-block', marginLeft: 8 }}>{value}</div>
    )
);

const DietPlanModal = ({ visible, onCancel, selectedPet, onSave }) => {
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
                dietName: 'Giảm cân',
                applicationTime: '12/01/2024 - 12/03/2024',
            };
            setEditableFields(fields);
            setInitialFields(fields);
            const petData = [
                {
                    key: '1',
                    index: '1',
                    name: 'Cơm',
                    description: 'Ngày 3 bữa',
                    unit: 'Bát',
                    quantity: '3',
                },
                {
                    key: '2',
                    index: '2',
                    name: 'Cơm',
                    description: 'Sáng 2 viên, tối 2 viên sau ăn',
                    unit: 'Viên',
                    quantity: '30',
                },
                {
                    key: '3',
                    index: '3',
                    name: 'Rau',
                    description: 'Sáng 2 viên, tối 2 viên sau ăn',
                    unit: 'Viên',
                    quantity: '30',
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
        { title: 'Tên thực phẩm', dataIndex: 'name', key: 'name' },
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
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Chế độ ăn</span>}
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
                                title="Chế độ ăn"
                                description={
                                    <div>
                                        <p>
                                            <strong>Chế độ ăn:</strong> 
                                            <EditableField
                                                value={editableFields.dietName}
                                                isEditing={isEditing['dietName']}
                                                onDoubleClick={() => handleDoubleClick('dietName')}
                                                onChange={(e) => handleChange('dietName', e.target.value)}
                                                onBlur={() => handleBlur('dietName')}
                                                onKeyDown={(e) => handleKeyDown('dietName', e)}
                                            />
                                        </p>
                                        <p>
                                            <strong>Thời gian áp dụng:</strong> 
                                            <EditableField
                                                value={editableFields.applicationTime}
                                                isEditing={isEditing['applicationTime']}
                                                onDoubleClick={() => handleDoubleClick('applicationTime')}
                                                onChange={(e) => handleChange('applicationTime', e.target.value)}
                                                onBlur={() => handleBlur('applicationTime')}
                                                onKeyDown={(e) => handleKeyDown('applicationTime', e)}
                                            />
                                        </p>
                                    </div>
                                }
                            />
                        </Card>
                    </div>
                )}
                <Select defaultValue="Bữa sáng" style={{ width: 200, marginBottom: 16 }}>
                    <Option value="breakfast">Bữa sáng</Option>
                    <Option value="lunch">Bữa trưa</Option>
                    <Option value="dinner">Bữa tối</Option>
                </Select>
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

export default DietPlanModal;
