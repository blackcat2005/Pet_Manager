import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Select, message, Input, Form, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import InfoModal from './pet-modal/info_detail';
import UpdateModal from './pet-modal/info_update';

const { Option } = Select;
const { confirm } = Modal;

const PetInfoOverview = () => {
    const [sortOrder, setSortOrder] = useState({});
    const [sortedData, setSortedData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [visibleInfoModal, setVisibleInfoModal] = useState(false);
    const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    const [pets, setPets] = useState([
        { id: '1', name: 'Mimi', types: 'Mèo', age: '2', gender: 'Cái', weight: '5kg', customerId: 'C123', health: 'Tốt', description: 'Thú cưng khỏe mạnh', imgUrl: require('../../assets/image/anhh4.jpg') },
        { id: '2', name: 'Buddy', types: 'Chó', age: '4', gender: 'Đực', weight: '15kg', customerId: 'C456', health: 'Khỏe', description: 'Thú cưng rất khỏe mạnh', imgUrl: require('../../assets/image/anhh10.jpg') },
        { id: '3', name: 'Jack', types: 'Thỏ', age: '1', gender: 'Đực', weight: '2kg', customerId: 'C789', health: 'Yếu', description: 'Cần chăm sóc đặc biệt', imgUrl: require('../../assets/image/anhh7.jpg') },
        { id: '4', name: 'Lucy', types: 'Mèo', age: '3', gender: 'Cái', weight: '4kg', customerId: 'C012', health: 'Tốt', description: 'Thú cưng khỏe mạnh', imgUrl: require('../../assets/image/anhh6.jpg') },
        { id: '5', name: 'Max', types: 'Chó', age: '5', gender: 'Đực', weight: '20kg', customerId: 'C345', health: 'Tốt', description: 'Thú cưng khỏe mạnh', imgUrl: require('../../assets/image/anhh5.jpg') }
    ]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên thú cưng', dataIndex: 'name', key: 'name' },
        { title: 'Chủng loại', dataIndex: 'types', key: 'types' },
        { title: 'Tuổi', dataIndex: 'age', key: 'age' },
        { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
        { title: 'Cân nặng', dataIndex: 'weight', key: 'weight' },
        { title: 'ID khách hàng', dataIndex: 'customerId', key: 'customerId' },
        { title: 'x', dataIndex: 'x', key: 'x' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showDetails(record)}>Xem chi tiết</a>
                    <a onClick={() => updateInfos(record)}>Cập nhật</a>
                    <a onClick={() => showConfirm(record.id)}>Xóa</a>
                </Space>
            ),
        },
    ];

    const showDetails = (record) => {
        setSelectedPet(record);
        setVisibleInfoModal(true);
    };

    const updateInfos = (record) => {
        setSelectedPet(record);
        setVisibleUpdateModal(true);
    }

    const handleCancel = () => {
        setVisibleInfoModal(false);
        setVisibleUpdateModal(false);
    };

    const handleDelete = (id) => {
        const newPets = pets.filter(item => item.id !== id);
        setPets(newPets);
        setSortedData(newPets);
        message.success('Xóa thú cưng thành công!');
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchName(value);

        const filteredData = pets.filter(pet => {
            return pet.name.toLowerCase().includes(value);
        });
        setSortedData(filteredData);
    };

    useEffect(() => {
        if (!sortOrder.field || !sortOrder.order) {
            setSortedData(pets);
            return;
        }

        const sorted = [...pets].sort((a, b) => {
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
    }, [sortOrder, pets]);

    const handleSortChange = (value) => {
        const [field, order] = value.split('-');
        setSortOrder({ field, order });
    };

    const showConfirm = (id) => {
        confirm({
            title: 'Bạn có chắc muốn xóa thú cưng?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn sẽ không thể hoàn tác và xem lại được thông tin của thú cưng.',
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

    return (
        <div>
            <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Typography.Title level={1}>Danh sách thú cưng</Typography.Title>
                <br /><br />
            </Space>
            <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginLeft: 50, width: '100%' }}>
                <Form layout="inline" style={{ border: '1px solid #d9d9d9', padding: '10px', borderRadius: '4px' }}>
                    <Form.Item label="Tên thú cưng">
                        <Input placeholder="Please enter" style={{ width: 200 }} 
                            onChange={handleSearchChange} 
                            onPressEnter={handleSearchChange}
                        />
                    </Form.Item>
                    <Button type="primary" onClick={handleSearchChange} style={{ marginLeft: 8, marginRight: 10 }}>Tìm kiếm</Button>
                </Form>
            </Space>
            <Space style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 16, width: '100%' }}>
                <Select placeholder="Sắp xếp theo" style={{ width: 180 }} onChange={handleSortChange}>
                    <Option value="name-ascend">Tên (A-Z)</Option>
                    <Option value="name-descend">Tên (Z-A)</Option>
                </Select>
                <Button type="primary" icon={<PlusOutlined />} style={{ margin: '0 15px' }}>Add New</Button>
            </Space>
            <Table columns={columns} dataSource={sortedData} pagination={{ pageSize: 5}} />

            <InfoModal
                visible={visibleInfoModal}
                onCancel={handleCancel}
                selectedPet={selectedPet}
            />

            <UpdateModal
                visible={visibleUpdateModal}
                onCancel={handleCancel}
                selectedPet={selectedPet}
                key={selectedPet ? selectedPet.id : 'default'}
            />
        </div>
    );
};

export default PetInfoOverview;
