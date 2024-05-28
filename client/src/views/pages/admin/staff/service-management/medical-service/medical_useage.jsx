import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Input, Form, Row, Popconfirm, Modal, DatePicker } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import '../../index.css';
import pet from 'api/pet';  
import moment from 'moment';

const { Option } = Select;

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
        <Option value="Created">Created</Option>
        <Option value="Processing">Processing</Option>
        <Option value="Completed">Completed</Option>
        <Option value="Canceled">Canceled</Option>
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

const MedicalServiceUsage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pet.getPetList();
        setData(response.data);
      } catch (error) {
        message.error('Lỗi khi tải danh sách dịch vụ');
      }
    };

    fetchData();
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      petName: '',
      examination: '',
      description: '',
      registrationDate: '',
      status: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setData(prevData => prevData.filter(item => item.id !== editingKey));
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        // Cập nhật dịch vụ thông qua API
        await pet.updatePetInfo(id, row);
        message.success('Cập nhật dịch vụ thành công!');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = async (id) => {
    try {
      await pet.deletePet(id); // Xóa dịch vụ thông qua API
      const newServices = data.filter(item => item.id !== id);
      setData(newServices);
      message.success('Xóa dịch vụ thành công!');
    } catch (error) {
      message.error('Lỗi khi xóa dịch vụ');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredData = data.filter(service => {
      return service.petName.toLowerCase().includes(value);
    });
    setData(filteredData);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    const sorted = [...data].sort((a, b) => {
      if (a[field] < b[field]) return order === 'ascend' ? -1 : 1;
      if (a[field] > b[field]) return order === 'ascend' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  const addNewRow = () => {
    const newRow = {
      id: `${data.length + 1}`,
      petName: '',
      examination: '',
      description: '',
      registrationDate: '',
      status: 'Created',
    };
    setData([newRow, ...data]);
    setEditingKey(newRow.id);
    form.setFieldsValue(newRow);
  };

  const showConfirm = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa dịch vụ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn sẽ không thể hoàn tác và xem lại được thông tin của dịch vụ.',
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

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', editable: false },
    { title: 'Tên thú cưng', dataIndex: 'petName', key: 'petName', editable: true },
    { title: 'Ca khám', dataIndex: 'examination', key: 'examination', editable: true },
    { title: 'Mô tả triệu chứng', dataIndex: 'description', key: 'description', editable: true },
    { title: 'Ngày đăng ký', dataIndex: 'registrationDate', key: 'registrationDate', editable: true, inputType: 'date', 
      render: (text) => moment(text).format('YYYY-MM-DD') 
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status', 
      editable: true, 
      inputType: 'select', 
      render: (status) => (
        <span className={`status-tag ${status.toLowerCase()}`}>
          {status}
        </span>
    ),
  },
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
            <a className="action-link" disabled={editingKey !== ''} onClick={() => edit(record)}>
              Cập nhật
            </a>
            {record.status === 'Created' ? (
              <a className="action-link" onClick={() => message.info('Tạo hồ sơ bệnh án')}>Tạo hồ sơ bệnh án</a>
            ) : (
              <a className="action-link" onClick={() => message.info('Xem chi tiết hồ sơ bệnh án')}>Xem chi tiết hồ sơ bệnh án</a>
            )}
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
      <Typography.Title level={2} style={{ textAlign: 'center' }}>Sử dụng dịch vụ</Typography.Title>
      <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginLeft: 50, width: '100%' }}>
        <Form layout="inline" style={{ border: '1px solid #d9d9d9', padding: '10px', borderRadius: '4px' }}>
          <Form.Item label="Tên thú cưng">
            <Input placeholder="Nhập tên" style={{ width: 200 }} 
              onChange={handleSearchChange} 
              onPressEnter={handleSearchChange}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSearchChange} style={{ marginLeft: 8, marginRight: 10 }}>Tìm kiếm</Button>
        </Form>
      </Space>
      <Row style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={3} style={{ marginBottom: 0 }}>Search Table</Typography.Title>
        <Space>
          <Select placeholder="Sắp xếp theo" style={{ width: 200 }} onChange={handleSortChange}>
            <Option value="petName-ascend">Tên thú cưng (A-Z)</Option>
            <Option value="petName-descend">Tên thú cưng (Z-A)</Option>
            <Option value="registrationDate-ascend">Ngày đăng ký (Tăng dần)</Option>
            <Option value="registrationDate-descend">Ngày đăng ký (Giảm dần)</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={addNewRow}>Thêm mới</Button>
        </Space>
      </Row>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 5 }}
        />
      </Form>
    </div>
  );
};

export default MedicalServiceUsage;
