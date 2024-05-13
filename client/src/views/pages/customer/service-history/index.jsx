import React, { useState } from 'react';
import { Table, Checkbox, Button, Typography, Space, Tag, Select, Modal, Form, Input } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, SyncOutlined, MinusCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

const initialRows = [
  { id: 'AH2928', name: 'Dịch vụ lưu trú', price: 440000, status: 'Kích hoạt', date: '2021-02-05 08:28:36' },
  { id: 'AH2929', name: 'Dịch vụ lưu trú', price: 440000, status: 'Kích hoạt', date: '2021-02-05 08:28:36' },
  { id: 'EF8392', name: 'Dịch vụ vệ sinh', price: 320000, status: 'Đang thực hiện', date: '2020-11-17 15:42:21' },
  { id: 'JK1038', name: 'Dịch vụ chăm sóc sức khỏe', price: 700000, status: 'Kích hoạt', date: '2023-09-28 10:15:47' },
  { id: 'LM7162', name: 'Dịch vụ lưu trú', price: 480000, status: 'Hoàn thành', date: '2022-05-09 09:57:03' }
];

function ServiceHistory() {
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [isBankFormVisible, setBankFormVisible] = useState(false);

  const canCancelService = () => {
    const selectedRows = rows.filter(row => selected.includes(row.id));
    if (selectedRows.some(row => row.status == 'Hủy')) {
      return false;
    }
    return true;
  };

  const handleCancelService = () => {
    if (canCancelService()) {
      const newRows = rows.map(row => (
        selected.includes(row.id) ? { ...row, status: 'Hủy' } : row
      ));
      setRows(newRows);
      setSelected([]);
    } else {
      Modal.error({
        title: 'Không thể hủy',
        content: 'Dịch vụ đã được hủy.',
      });
    }
  };

  const handleStatusFilter = (value) => {
    setSortType(value); 
    if (value === 'all') {
      setRows(initialRows); 
    } else {
      const filteredRows = initialRows.filter(row => row.status === value);
      setRows(filteredRows);
    }
  };

  const handleSelect = (record) => {
    const selectedIndex = selected.indexOf(record.id);
    let newSelected = selectedIndex === -1 ? selected.concat(record.id) : selected.filter(item => item !== record.id);
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.includes(id);

  const getStatusIcon = (status) => {
    let icon;
    let color;
    switch (status) {
      case 'Kích hoạt':
        icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
        color = 'green';
        break;
      case 'Hủy':
        icon = <MinusCircleFilled style={{ color: 'grey' }} />;
        color = 'grey';
        break;
      case 'Hoàn thành':
        icon = <CheckCircleFilled style={{ color: '#1890ff' }} />;
        color = 'blue';
        break;
      case 'Đang thực hiện':
        icon = <SyncOutlined spin style={{ color: 'red' }} />;
        color = 'red';
        break;
      default:
        icon = <CloseCircleFilled style={{ color: 'pink' }} />;
        color = 'pink';
    }
    return (
      <Space>
        {icon}
        <Tag color={color}>{status}</Tag>
      </Space>
    );
  };

  const showConfirm = () => {
    if (canCancelService()) {
      confirm({
        title: 'Bạn có chắc chắn muốn hủy dịch vụ?',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn sẽ được hoàn trả tiền nếu hủy dịch vụ',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          setBankFormVisible(true);
        },
        onCancel() {
          
        },
      });
    } else {
      Modal.error({
        title: 'Không thể hủy',
        content: 'Dịch vụ đã được hủy.'
      })
    }
  };

  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'checkbox',
      render: (text, record) => (
        <Checkbox checked={isSelected(record.id)} onChange={() => handleSelect(record)} />
      )
    },
    { title: 'Mã dịch vụ', dataIndex: 'id', key: 'id' },
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
    { title: 'Giá dịch vụ', dataIndex: 'price', key: 'price', render: price => `${price.toLocaleString()} VND` },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: getStatusIcon },
    { title: 'Thời gian đăng ký', dataIndex: 'date', key: 'date' }
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Space style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={4}>Lịch sử đăng ký</Typography.Title>
        <Space>
          <Select value={sortType} onChange={handleStatusFilter} style={{ width: 120 }} placeholder="Lọc">
            <Option value="all">Tất cả</Option>
            <Option value="Kích hoạt">Kích hoạt</Option>
            <Option value="Hủy">Hủy</Option>
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Đang thực hiện">Đang thực hiện</Option>
          </Select>
          <Button type="primary" danger onClick={showConfirm}>
            Hủy dịch vụ
          </Button>
        </Space>
      </Space>
      <Table dataSource={rows} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      <Modal
        title="Thông tin ngân hàng"
        visible={isBankFormVisible}
        onCancel={() => setBankFormVisible(false)}
        footer={null}
      >
        <Form onFinish={(values) => setBankFormVisible(false)} layout="vertical" style={{ maxWidth: 400, margin: 'auto' }}>
          <Form.Item
            name="accountNumber"
            label="Số tài khoản"
            rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
            style={{ display: 'flex', marginBottom: 16 }}
          >
            <Input placeholder="example" />
          </Form.Item>
          <Form.Item
            name="bankName"
            label="Ngân hàng"
            rules={[{ required: true, message: 'Vui lòng chọn ngân hàng!' }]}
            style={{ display: 'flex', marginBottom: 16 }}
          >
            <Select placeholder="Chọn ngân hàng">
              <Option value="AgriBank">AgriBank</Option>
              <Option value="VietinBank">VietinBank</Option>
              <Option value="MB Bank">MB Bank</Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" onClick={handleCancelService}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ServiceHistory;
