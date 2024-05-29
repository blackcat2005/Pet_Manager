import React, { useState } from 'react';
import { Table, Space, Typography, Tabs } from 'antd';
import useService from 'hooks/useService';
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Form, Row, Popconfirm, Modal, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import '../../index.css';
import beautyService from 'api/service/beauty-service'; // Sử dụng beautyService

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
    title: 'Thời gian',
    dataIndex: 'time',
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

const CleaningInfo = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    beautyService.getAllPrice()
      .then(response => {
        const services = response.data.beauty.map(item => ({
          id: item.id,
          performer: item.time,
          price: item.price + ' ' + item.unit
        }));
        setData(services);
      })
      .catch(error => {
        console.error('Failed to fetch beauty services:', error);
        message.error('Failed to fetch beauty services.');
      });
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      performer: '',
      price: '',
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
    const sorted = [...data].sort((a, b) => {
      if (a[field] < b[field]) return order === 'ascend' ? -1 : 1;
      if (a[field] > b[field]) return order === 'ascend' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  const addNewRow = () => {
    const newRow = {
      id: `TradeCode ${data.length + 1}`,
      performer: '',
      price: '',
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
    { title: 'Ca thực hiện', dataIndex: 'performer', key: 'performer', editable: true },
    { title: 'Thành tiền', dataIndex: 'price', key: 'price', editable: true },
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
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
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
    <div className='beauty-info'>
      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Typography.Title level={2}>Bảng giá dịch vụ vệ sinh</Typography.Title>
        <br /><br />
      </Space>
      <Table
        dataSource={serviceBeauty}
        columns={columns}
        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
      />;
    </div>
  )
};

export default CleaningInfo;


