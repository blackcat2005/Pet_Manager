import React, { useState, useEffect } from 'react';
import { Modal, Card, Avatar, Table, Button, Typography, Divider, Input, Select } from 'antd';
import pet from 'api/pet';

const { Meta } = Card;
const { Option } = Select;

const EditableField = ({
  value,
  isEditing,
  onDoubleClick,
  onChange,
  onBlur,
  onKeyDown,
}) =>
  isEditing ? (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />
  ) : (
    <div
      onDoubleClick={onDoubleClick}
      style={{ display: 'inline-block', marginLeft: 8 }}
    >
      {value}
    </div>
  );

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const DietPlanModal = ({ visible, onCancel, selectedPet, onSave }) => {
  const [isEditing, setIsEditing] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [initialFields, setInitialFields] = useState({});
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [editingColumn, setEditingColumn] = useState('');
  const [plan, setPlan] = useState({});
  const [food, setFood] = useState([]);

  useEffect(() => {
    if (selectedPet && selectedPet.pet_id) {
      pet.getDietFood(selectedPet.pet_id).then((res) => {
        setFood(res.data);
        console.log(food);
        const petData = res.data.map((item, index) => ({
          ...item,
          key: index, // Add unique key for each row
        }));
        setData(petData);
        setInitialData(petData);
      });

      pet.getDietPlan(selectedPet.pet_id).then((res) => {
        setPlan(res.data[0]);
        const fields = {
          dietName: res.data[0]?.description || 'Giảm cân',
          applicationTime:
            `${formatDate(res.data[0]?.date_start)} - ${formatDate(res.data[0]?.date_end)}` ||
            '12/01/2024 - 12/03/2024',
        };
        setEditableFields(fields);
        setInitialFields(fields);
      });
    }
  }, [selectedPet]);

  const handleDoubleClick = (field) => setIsEditing({ [field]: true });
  const handleChange = (field, value) =>
    setEditableFields({ ...editableFields, [field]: value });
  const handleBlur = (field) => setIsEditing({ [field]: false });
  const handleKeyDown = (field, e) => e.key === 'Enter' && handleBlur(field);

  const isEditingCell = (record, column) =>
    record.key === editingKey && column === editingColumn;
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
    if (index > -1) {
      newData[index][column] = e.target.value;
      setData(newData);
    }
  };

  const columns = [
    { title: 'STT', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'Tên thực phẩm', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Đơn vị tính', dataIndex: 'unit', key: 'unit', width: '15%' },
    { title: 'Số lượng', dataIndex: 'amount', key: 'amount', width: '15%' },
  ].map((col) => ({
    ...col,
    render: (text, record) =>
      isEditingCell(record, col.dataIndex) ? (
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
      title={
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Chế độ ăn</span>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <Divider />
      <div style={{ padding: 24, minHeight: 360 }}>
        {selectedPet && (
          <div
            className="items-center"
            style={{ display: 'flex', marginBottom: 24 }}
          >
            <Avatar
              src={selectedPet.imgUrl || '/image.png'}
              size={150}
              style={{ marginRight: 24 }}
            />
            <Card style={{ flex: 1 }}>
              <Meta
                title={<p className="uppercase text-xl font-bold">{plan.name}</p>}
                description={
                  <div className="Diet-title">
                    <p>
                      <strong className="w-[250px] ">Chế độ ăn:</strong>
                      <EditableField
                        value={editableFields['dietName']}
                        isEditing={isEditing['dietName']}
                        onDoubleClick={() => handleDoubleClick('dietName')}
                        onChange={(e) => handleChange('dietName', e.target.value)}
                        onBlur={() => handleBlur('dietName')}
                        onKeyDown={(e) => handleKeyDown('dietName', e)}
                      />
                    </p>
                    <p>
                      <strong className="w-[250px]">Thời gian áp dụng:</strong>
                      <EditableField
                        value={editableFields.applicationTime}
                        isEditing={isEditing['applicationTime']}
                        onDoubleClick={() =>
                          handleDoubleClick('applicationTime')
                        }
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
        <Select
          defaultValue={food[0].time}
          style={{ width: 200, marginBottom: 16 }}
        >
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
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={handleSave}
          >
            Lưu
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DietPlanModal;
