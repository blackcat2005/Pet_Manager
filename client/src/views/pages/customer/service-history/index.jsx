import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Button, Typography, Space, Tag, Select, Modal, Form, Input } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, SyncOutlined, MinusCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import ServiceHistoryAPI from 'api/service/service-history';

const { Option } = Select;
const { confirm } = Modal;

function ServiceHistory() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [isBankFormVisible, setBankFormVisible] = useState(false);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const storageResponse = await ServiceHistoryAPI.getStorageServicebyUser_ID();
        const beautyResponse = await ServiceHistoryAPI.getAllBeautyService();
        const appointmentResponse = await ServiceHistoryAPI.getAllAppointmentbyUserSession();

        console.log("Storage Services:", storageResponse.data.getStorageServicebyUser_ID);
        console.log("Beauty Services:", beautyResponse.data.allBeauty);
        console.log("Appointment Services:", appointmentResponse.data.allAppointment);

        const allServices = [
          ...storageResponse.data.getStorageServicebyUser_ID,
          ...beautyResponse.data.allBeauty,
          ...appointmentResponse.data.allAppointment
        ];

        setRows(allServices);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAllServices();
  }, []);

  const canCancelService = () => {
    const selectedRows = rows.filter(row => selected.includes(row.id));
    if (selectedRows.some(row => row.status === 'canceled')) {
      return false;
    }
    return true;
  };

  const handleCancelService = () => {
    if (canCancelService()) {
      const servicesToDelete = rows.filter(row => selected.includes(row.id));
      const deletePromises = servicesToDelete.map(service =>
        ServiceHistoryAPI.deleteStorageService({ id: service.id })
      );

      Promise.all(deletePromises)
        .then(responses => {
          responses.forEach(response => {
            if (response.data.status === 'success') {
              console.log(`Service with ID ${response.data.id} deleted successfully.`);
            }
          });
          // Cập nhật danh sách dịch vụ sau khi xóa
          setRows(prevRows => prevRows.filter(row => !selected.includes(row.id)));
          setSelected([]);
        })
        .catch(error => {
          console.error("Error deleting services: ", error);
        });
    } else {
      Modal.error({
        title: 'Không thể hủy',
        content: 'Dịch vụ đã được hủy.',
      });
    }
  };

  const handleStatusFilter = (value) => {
    setSortType(value);
    const fetchFilteredServices = async () => {
      try {
        const storageResponse = await ServiceHistoryAPI.getStorageServicebyUser_ID();
        const beautyResponse = await ServiceHistoryAPI.getAllBeautyService();
        const appointmentResponse = await ServiceHistoryAPI.getAllAppointmentbyUserSession();

        const allServices = [
          ...storageResponse.data.getStorageServicebyUser_ID,
          ...beautyResponse.data.allBeauty,
          ...appointmentResponse.data.allAppointment
        ];

        const filteredRows = value === 'all' ? allServices : allServices.filter(row => row.status === value);
        setRows(filteredRows);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchFilteredServices();
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
      case 'created':
        icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
        color = 'green';
        break;
      case 'canceled':
        icon = <MinusCircleFilled style={{ color: 'grey' }} />;
        color = 'grey';
        break;
      case 'completed':
        icon = <CheckCircleFilled style={{ color: '#1890ff' }} />;
        color = 'blue';
        break;
      case 'processing':
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
    { title: 'Service ID', dataIndex: 'id', key: 'id' },
    { title: 'Room ID', dataIndex: 'room_id', key: 'room_id' },
    { 
      title: 'Thời gian tạo', 
      dataIndex: 'create_at', 
      key: 'create_at',
      render: (text) => moment(text).format('YYYY-MM-DD') 
    },
    { 
      title: 'Ngày bắt đầu', 
      dataIndex: 'date_start', 
      key: 'date_start',
      render: (text) => moment(text).format('YYYY-MM-DD') 
    },
    { 
      title: 'Ngày kết thúc', 
      dataIndex: 'date_end', 
      key: 'date_end',
      render: (text) => moment(text).format('YYYY-MM-DD') 
    },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
    { title: 'Tổng cộng', dataIndex: 'total', key: 'total' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: getStatusIcon },
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Space style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={1}>Lịch sử đăng ký</Typography.Title>
        <Space>
          <Select value={sortType} onChange={handleStatusFilter} style={{ width: 120 }} placeholder="Lọc">
            <Option value="all">all</Option>
            <Option value="created">created</Option>
            <Option value="processing">processing</Option>
            <Option value="completed">completed</Option>
            <Option value="canceled">canceled</Option>
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
