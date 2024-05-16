import React, { useState, useEffect} from 'react';
import { Table, Button, Space, Typography, Select, message, Input, Modal} from 'antd';
import { PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

const CustomerListPage = () => {
    const [sortOrder, setSortOrder] = useState({});
    const [sortedData, setSortedData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');

    const [customers, setCustomers] = useState([
        { key: '1', name: 'TradeCode 99', email: 'abc123@mail.com', phone: '0123456789', address: '1', city: 'Hà Nội', country: 'Việt Nam', lastDispatch: '2021-02-05 08:28:36' },
        { key: '2', name: 'AradeCode 12', email: 'abc123@mail.com', phone: '0123456789', address: '1', city: 'Hà Nội', country: 'Việt Nam', lastDispatch: '2021-02-05 08:28:36' },
        { key: '3', name: 'QradeCode 34', email: 'xyz456@mail.com', phone: '0987654321', address: '2', city: 'Hồ Chí Minh', country: 'Việt Nam', lastDispatch: '2023-07-15 10:45:21' },
        { key: '4', name: 'CradeCode 56', email: 'uvw789@mail.com', phone: '0369852147', address: '3', city: 'Đà Nẵng', country: 'Việt Nam', lastDispatch: '2022-11-30 14:20:10' },
        { key: '8', name: 'BradeCode 78', email: 'mno012@mail.com', phone: '0789546213', address: '4', city: 'Hải Phòng', country: 'Việt Nam', lastDispatch: '2024-01-18 16:55:42' }
    ]);

    const columns = [
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'SDT', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Thành phố', dataIndex: 'city', key: 'city' },
        { title: 'Đất nước', dataIndex: 'country', key: 'country' },
        { title: 'Last Dispatch Time', dataIndex: 'lastDispatch', key: 'lastDispatch' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Update</a>
                    <a onClick={() => handleDelete(record.key)}>Delete</a>
                </Space>
            ),
        },
    ];

    const handleDelete = (key) => {
        const newCustomers = customers.filter(item => item.key !== key);
        setCustomers(newCustomers); 
        setSortedData(newCustomers);
        message.success('Xóa khách hàng thành công!');
    };

    const handleSearch = () => {
        const filteredData = customers.filter(customer => {
            return (customer.name.toLowerCase().includes(searchName.toLowerCase()) || !searchName) &&
                   (customer.phone.includes(searchPhone) || !searchPhone);
        });
        setSortedData(filteredData);
    };

    useEffect(() => {
        if (!sortOrder.field || !sortOrder.order) {
            setSortedData(customers);
            return;
        }
        
        const sorted = [...customers].sort((a, b) => {
            let fieldA = a[sortOrder.field];
            let fieldB = b[sortOrder.field];
            if (sortOrder.field === 'lastDispatch') {
                fieldA = new Date(fieldA);
                fieldB = new Date(fieldB);
            }
            if (fieldA < fieldB) return sortOrder.order === 'ascend' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder.order === 'ascend' ? 1 : -1;
            return 0;
        });
        setSortedData(sorted);
    }, [sortOrder, customers]);

    const handleSortChange = (value) => {
        const [field, order] = value.split('-');
        setSortOrder({ field, order });
    };

    const showConfirm = () => {
        confirm({
            title: 'Bạn có chắc muốn xóa khách hàng ?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn sẽ không thể hoàn tác và xem lại được thông tin của khách hàng.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk () {
                handleDelete();
            },
            onCancel () {

            },
        });
    }

    return (
        <div>
            <Space>
                <Typography.Title level={1}>Danh sách khách hàng</Typography.Title>
            </Space>
            <br /><br /><br /><br />
            <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, width: '100%' }}>
                <Typography.Title level={3}>Search Table</Typography.Title>
                <div>
                    <Input placeholder="Tên nhân viên" style={{ width: 200 }} onChange={e => setSearchName(e.target.value)} />
                    <Input placeholder="SDT" style={{ width: 200, marginLeft: 8 }} onChange={e => setSearchPhone(e.target.value)} />
                    <Button type="primary" onClick={handleSearch} style={{ marginLeft: 8, marginRight: 10}}>Tìm kiếm</Button>
                    <Select placeholder="Sắp xếp" style={{ width: 180 }} onChange={handleSortChange}>
                        <Option value="name-ascend">Tên (A-Z)</Option>
                        <Option value="name-descend">Tên (Z-A)</Option>
                        <Option value="email-ascend">Email (A-Z)</Option>
                        <Option value="email-descend">Email (Z-A)</Option>
                        <Option value="phone-ascend">SĐT (tăng)</Option>
                        <Option value="phone-descend">SĐT (giảm)</Option>
                        <Option value="lastDispatch-ascend">Ngày (tăng)</Option>
                        <Option value="lastDispatch-descend">Ngày (giảm)</Option>
                    </Select>
                    <Button type="primary" icon={<PlusOutlined />} style={{ margin: '0 15px' }}>Add New</Button>
                </div>
            </Space>
            <Table columns={columns} dataSource={sortedData} pagination={{ pageSize: 10 }} />
        </div>
    );
};

export default CustomerListPage;
