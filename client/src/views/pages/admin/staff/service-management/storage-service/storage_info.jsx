import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Form, Row, Popconfirm, Modal, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
  const inputNode = inputType === 'number' ? <Input /> : <Input />;
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

const StorageInfo = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const [services, setServices] = useState([
    { id: '1', roomType: 'VIP', price: '100k', unit: 'Ngày' },
    { id: '2', roomType: 'Standard', price: '80k', unit: 'Ngày' },
    { id: '3', roomType: 'Deluxe', price: '120k', unit: 'Ngày' },
    { id: '4', roomType: 'Economy', price: '60k', unit: 'Ngày' },
  ]);

  useEffect(() => {
    setData(services);
  }, [services]);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      roomType: '',
      price: '',
      unit: '',
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
      roomType: '',
      price: '',
      unit: 'Ngày',
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
    { title: 'Loại phòng', dataIndex: 'roomType', key: 'roomType', editable: true },
    { title: 'Đơn giá ', dataIndex: 'price', key: 'price', editable: true },
    { title: 'Đơn vị', dataIndex: 'unit', key: 'unit', editable: false },
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
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              Cập nhật
            </a>
            <a onClick={() => showConfirm(record.id)}>Xóa</a>
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
      <Typography.Title level={2} style={{ textAlign: 'center' }}>Dịch vụ lưu trữ</Typography.Title>
      <Row style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={3} style={{ marginBottom: 0 }}>Bảng giá</Typography.Title>
        <Space>
          <Select placeholder="Sắp xếp theo" style={{ width: 200 }} onChange={handleSortChange}>
            <Option value="price-ascend">Giá tiền (Tăng dần)</Option>
            <Option value="price-descend">Giá tiền (Giảm dần)</Option>
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

export default StorageInfo;
