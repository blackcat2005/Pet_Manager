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
        const detailPetResponse = await ServiceHistoryAPI.getDetailPet();
        console.log("Detail Pet Services:", detailPetResponse.data);

        const allServices = detailPetResponse.data.flatMap(pet =>
          pet.services.map(service => ({
            ...service,
            pet_name: pet.pet_name,
            species: pet.species,
            age: pet.age,
            weight: pet.weight,
            sex: pet.sex,
            health: pet.health,
            describe: pet.describe
          }))
        );

        setRows(allServices);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAllServices();
  }, []);

  const canCancelService = () => {
    const selectedRows = rows.filter(row => selected.includes(row.order_id));
    if (selectedRows.some(row => row.status === 'canceled')) {
      return false;
    }
    return true;
  };

  const handleCancelService = () => {
    if (canCancelService()) {
      const servicesToDelete = rows.filter(row => selected.includes(row.order_id));
      const deletePromises = servicesToDelete.map(service =>
        ServiceHistoryAPI.deleteStorageService({ id: service.order_id })
      );

      Promise.all(deletePromises)
        .then(responses => {
          responses.forEach(response => {
            if (response.data.status === 'success') {
              console.log(`Service with ID ${response.data.id} deleted successfully.`);
            }
          });
          // Cập nhật danh sách dịch vụ sau khi xóa
          setRows(prevRows => prevRows.filter(row => !selected.includes(row.order_id)));
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
        const detailPetResponse = await ServiceHistoryAPI.getDetailPet();
        const allServices = detailPetResponse.data.flatMap(pet =>
          pet.services.map(service => ({
            ...service,
            pet_name: pet.pet_name,
            species: pet.species,
            age: pet.age,
            weight: pet.weight,
            sex: pet.sex,
            health: pet.health,
            describe: pet.describe
          }))
        );

        const filteredRows = value === 'all' ? allServices : allServices.filter(row => row.status === value);
        setRows(filteredRows);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchFilteredServices();
  };

  const handleSelect = (record) => {
    const selectedIndex = selected.indexOf(record.order_id);
    let newSelected = selectedIndex === -1 ? selected.concat(record.order_id) : selected.filter(item => item !== record.order_id);
    setSelected(newSelected);
  };

  const isSelected = (order_id) => selected.includes(order_id);

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
      dataIndex: 'order_id',
      key: 'checkbox',
      render: (text, record) => (
        <Checkbox checked={isSelected(record.order_id)} onChange={() => handleSelect(record)} />
      )
    },
    { title: 'ID dịch vụ', dataIndex: 'order_id', key: 'order_id' },
    { title: 'Tên thú cưng', dataIndex: 'pet_name', key: 'pet_name' },
    { title: 'Loại dịch vụ', dataIndex: 'service_type', key: 'service_type' },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'service_date',
      key: 'service_date',
      render: (text) => moment(text).format('YYYY-MM-DD')
    },
    { title: 'Tổng cộng', dataIndex: 'total', key: 'total' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: getStatusIcon },
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Space style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={2}>Lịch sử đăng ký</Typography.Title>
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
      <Table dataSource={rows} columns={columns} rowKey="order_id" pagination={{ pageSize: 5 }} />
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
