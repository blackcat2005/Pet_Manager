import React from 'react';
import { Table, Space, Typography } from 'antd';

const ServiceCost = () => {
  const dataSource = [
    { key: '1', serviceName: 'Khám bệnh', price: '400.000', unit: 'vnd' },
    { key: '2', serviceName: 'Lưu trú', price: '400.000', unit: 'vnd' },
    { key: '3', serviceName: 'Vệ sinh', price: '400.000', unit: 'vnd' },
  ];

  const columns = [
    { title: 'Tên dịch vụ', dataIndex: 'serviceName', key: 'serviceName' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Đơn vị', dataIndex: 'unit', key: 'unit' },
  ];
  return (
    <div>
        <Space>
            <Typography.Title level={1}>Bảng giá dịch vụ</Typography.Title>
        </Space>
        <br />
        <Table dataSource={dataSource} columns={columns} pagination={false} />;
    </div> 
  )
};

export default ServiceCost;
