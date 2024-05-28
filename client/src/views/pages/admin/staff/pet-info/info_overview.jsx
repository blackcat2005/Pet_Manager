import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Input, Form, Modal, Popconfirm } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import InfoModal from './pet-modal/info_detail';
import UpdateModal from './pet-modal/info_update';
import pet from 'api/pet'; 
import '../index.css';
import moment from 'moment';

const { Option } = Select;
const { confirm } = Modal;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <Input /> : (
    inputType === 'select' ? (
      <Select>
        <Option value="Đực">Đực</Option>
        <Option value="Cái">Cái</Option>
      </Select>
    ) : (
      inputType === 'date' ? <DatePicker format="YYYY-MM-DD" /> : <Input />
    )
  );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{
            required: true,
            message: `Please Input ${title}!`,
          }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const PetInfoOverview = () => {
  const [form] = Form.useForm();
  const [sortOrder, setSortOrder] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [visibleInfoModal, setVisibleInfoModal] = useState(false);
  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [editingKey, setEditingKey] = useState('');
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await pet.getPetList();
        setPets(response.data);
        setSortedData(response.data);
      } catch (error) {
        message.error('Không thể tải danh sách thú cưng');
      }
    };
    fetchPets();
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...pets];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setPets(newData);
        setSortedData(newData);
        setEditingKey('');
        message.success('Cập nhật thú cưng thành công!');
      } else {
        newData.push(row);
        setPets(newData);
        setSortedData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = async (id) => {
    try {
      const newPets = pets.filter(item => item.id !== id);
      setPets(newPets);
      setSortedData(newPets);
      message.success('Xóa thú cưng thành công!');
    } catch (error) {
      message.error('Lỗi khi xóa thú cưng');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchName(value);

    const filteredData = pets.filter(pet => {
      return pet.name.toLowerCase().includes(value);
    });
    setSortedData(filteredData);
  };

  useEffect(() => {
    if (!sortOrder.field || !sortOrder.order) {
      setSortedData(pets);
      return;
    }

    const sorted = [...pets].sort((a, b) => {
      let fieldA = a[sortOrder.field];
      let fieldB = b[sortOrder.field];
      if (fieldA < fieldB) return sortOrder.order === 'ascend' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder.order === 'ascend' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  }, [sortOrder, pets]);

  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    setSortOrder({ field, order });
  };

  const showDetails = (record) => {
    setSelectedPet(record);
    setVisibleInfoModal(true);
  };

  const updateInfos = (record) => {
    setSelectedPet(record);
    setVisibleUpdateModal(true);
  };

  const handleCancel = () => {
    setVisibleInfoModal(false);
    setVisibleUpdateModal(false);
    cancel();
  };

  const addNewRow = () => {
    const newRow = {
      id: `${pets.length + 1}`,
      name: '',
      types: '',
      age: '',
      gender: 'Đực',
      weight: '',
      customerId: '',
    };
    setPets([newRow, ...pets]);
    setSortedData([newRow, ...pets]);
    setEditingKey(newRow.id);
    form.setFieldsValue(newRow);
  };

  const showConfirm = (id) => {
    confirm({
      title: 'Bạn có chắc muốn xóa thú cưng?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn sẽ không thể hoàn tác và xem lại được thông tin của thú cưng.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSave = (updatedPet) => {
    const newData = pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet));
    setPets(newData);
    setSortedData(newData);
    message.success('Cập nhật thú cưng thành công!');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', editable: false },
    { title: 'Tên thú cưng', dataIndex: 'name', key: 'name', editable: true },
    { title: 'Chủng loại', dataIndex: 'types', key: 'types', editable: true },
    { title: 'Tuổi', dataIndex: 'age', key: 'age', editable: true },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender', editable: true, inputType: 'select' },
    { title: 'Cân nặng', dataIndex: 'weight', key: 'weight', editable: true },
    { title: 'ID khách hàng', dataIndex: 'customerId', key: 'customerId', editable: true },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </a>
            <Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <a className="action-link" onClick={() => showDetails(record)}>
              Xem chi tiết
            </a>
            <a className="action-link" onClick={() => updateInfos(record)}>
              Cập nhật
            </a>
            <a className="action-link" onClick={() => showConfirm(record.id)}>Xóa</a>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Typography.Title level={1}>Danh sách thú cưng</Typography.Title>
        <br /><br />
      </Space>
      <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginLeft: 50, width: '100%' }}>
        <Form layout="inline" style={{ border: '1px solid #d9d9d9', padding: '10px', borderRadius: '4px' }}>
          <Form.Item label="Tên thú cưng">
            <Input placeholder="Please enter" style={{ width: 200 }}
              onChange={handleSearchChange}
              onPressEnter={handleSearchChange}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSearchChange} style={{ marginLeft: 8, marginRight: 10 }}>Tìm kiếm</Button>
        </Form>
      </Space>
      <Space style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 16, width: '100%' }}>
        <Select placeholder="Sắp xếp theo" style={{ width: 180 }} onChange={handleSortChange}>
          <Option value="name-ascend">Tên (A-Z)</Option>
          <Option value="name-descend">Tên (Z-A)</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} style={{ margin: '0 15px' }} onClick={addNewRow}>Add New</Button>
      </Space>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={sortedData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 5 }}
        />
      </Form>

      <InfoModal
        visible={visibleInfoModal}
        onCancel={handleCancel}
        selectedPet={selectedPet}
      />

      <UpdateModal
        visible={visibleUpdateModal}
        onCancel={handleCancel}
        selectedPet={selectedPet}
        key={selectedPet ? selectedPet.id : 'default'}
        onSave={handleSave}
      />
    </div>
  );
};

export default PetInfoOverview;
