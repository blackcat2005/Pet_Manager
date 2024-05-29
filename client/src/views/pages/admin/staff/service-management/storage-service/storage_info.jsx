import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Form, Row, Popconfirm, Modal, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import '../../index.css';
import service from 'api/service/storage-service';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.id - b.id,
    fixed: 'left',
    width: '70px',
  },
  {
    title: 'Loại phòng',
    dataIndex: 'type',
  },
  {
    title: 'Số lượng tối đa',
    dataIndex: 'max_slot',
  },
  {
    title: 'Số lượng hiện tại',
    dataIndex: 'current_slot',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
  },
];

const StorageInfo = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    service.getAllPrice()
      .then(response => {
        const storageData = response.data.storage.map(item => ({
          ...item,
        }));
        setData(storageData);
      })
      .catch(error => {
        console.error('Failed to fetch storage services:', error);
        message.error('Failed to fetch storage services.');
      });
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      type: '',
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
    const newServices = data.filter(item => item.id !== id);
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
      type: '',
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
    { title: 'Loại phòng', dataIndex: 'type', key: 'type', editable: true },
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
    <div className='storage-info'>
      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Typography.Title level={2}>Bảng giá dịch vụ lưu trữ</Typography.Title>
        <br /><br />
      </Space>
      <Table
        dataSource={serviceStorage}
        columns={columns}
        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
      />;
    </div>
  )
};

export default StorageInfo;
