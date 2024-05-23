import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Input, Form, Row, Popconfirm, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import '../../index.css';

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
  const inputNode = inputType === 'number' ? <Input /> : 
    (inputType === 'select' ? (
      <Select>
        <Option value="Created">Created</Option>
        <Option value="Processing">Processing</Option>
        <Option value="Completed">Completed</Option>
        <Option value="Canceled">Canceled</Option>
      </Select>
    ) : <Input />);
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

const StorageServiceUsage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const [services, setServices] = useState([
    { id: '1', petName: 'Mèo', roomType: 'VIP', startDate: '2023-05-01', endDate: '2023-05-03', registrationDate: '2023-04-01', status: 'Created' },
    { id: '2', petName: 'Chó', roomType: 'Standard', startDate: '2023-05-02', endDate: '2023-05-04', registrationDate: '2023-04-02', status: 'Processing' },
    { id: '3', petName: 'Bò', roomType: 'Deluxe', startDate: '2023-05-03', endDate: '2023-05-05', registrationDate: '2023-04-03', status: 'Completed' },
    { id: '4', petName: 'Cá', roomType: 'Standard', startDate: '2023-05-04', endDate: '2023-05-06', registrationDate: '2023-04-04', status: 'Canceled' },
    { id: '5', petName: 'Chó', roomType: 'VIP', startDate: '2023-05-05', endDate: '2023-05-07', registrationDate: '2023-04-05', status: 'Created' },
    { id: '6', petName: 'Lợn', roomType: 'Deluxe', startDate: '2023-05-06', endDate: '2023-05-08', registrationDate: '2023-04-06', status: 'Processing' },
  ]);

  useEffect(() => {
    setData(services);
  }, [services]);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      petName: '',
      roomType: '',
      startDate: '',
      endDate: '',
      registrationDate: '',
      status: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
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
        setServices(newData);
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

  const handleDelete = (id) => {
    const newServices = services.filter(item => item.id !== id);
    setServices(newServices);
    setData(newServices);
    message.success('Xóa dịch vụ thành công!');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredData = services.filter(service => {
      return service.petName.toLowerCase().includes(value);
    });
    setData(filteredData);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    const sorted = [...services].sort((a, b) => {
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
      roomType: '',
      startDate: '',
      endDate: '',
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
    { title: 'Loại phòng', dataIndex: 'roomType', key: 'roomType', editable: true },
    { title: 'Ngày bắt đầu', dataIndex: 'startDate', key: 'startDate', editable: true },
    { title: 'Ngày kết thúc', dataIndex: 'endDate', key: 'endDate', editable: true },
    { title: 'Ngày đăng ký', dataIndex: 'registrationDate', key: 'registrationDate', editable: true },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', editable: true, inputType: 'select',
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

export default StorageServiceUsage;
