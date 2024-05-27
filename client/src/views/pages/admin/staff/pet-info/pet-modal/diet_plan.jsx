import React, { useState, useEffect } from 'react'
import {
  Modal,
  Card,
  Avatar,
  Table,
  Button,
  Typography,
  Divider,
  Input,
  Select,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import pet from 'api/pet'
import diet from 'api/diet'
import { formatDateIsoString, formatDateToYYYYMMDD } from 'helpers/formartdate'
import { toast } from 'react-toastify'
const { Meta } = Card
const { Option } = Select

const EditableField = ({
  value,
  isEditing,
  onDoubleClick,
  onChange,
  onBlur,
  onKeyDown,
}) =>
  isEditing ? (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />
  ) : (
    <div
      onDoubleClick={onDoubleClick}
      style={{ display: 'inline-block', marginLeft: 8 }}
    >
      {value}
    </div>
  )

const DietPlanModal = ({ visible, onCancel, selectedPet, onSave }) => {
  const [isEditing, setIsEditing] = useState({})
  const [editableFields, setEditableFields] = useState({})
  const [initialFields, setInitialFields] = useState({})
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const [editingColumn, setEditingColumn] = useState('')
  const [plan, setPlan] = useState({})
  const [food, setFood] = useState([])
  const [error, setError] = useState(false)


  useEffect(() => {
    setError(false)
    if (selectedPet && selectedPet.pet_id) {
      diet
        .getDietFood(selectedPet.pet_id)
        .then((res) => {
          setFood(res.data)
          if (res.data && res.data.length > 0) {
            const petData = res.data.map((item, index) => ({
              ...item,
              key: index + 1,
            }))
            setData(petData)
            setInitialData(petData)
          } else {
            setData([])
          }
        })
        .catch(() => {
          setData([])
          setInitialData([])
          setInitialFields({})
          setEditableFields({})
          setInitialData({})
        })

      diet
        .getDietPlan(selectedPet.pet_id)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPlan(res.data[0])
            const fields = {
              dietName: res.data[0]?.name,
              dietDescription: res.data[0]?.description,
              date_start: `${formatDateIsoString(res.data[0]?.date_start)}`,
              date_end: `${formatDateIsoString(res.data[0]?.date_end)}`,
              applicationTime: `${formatDateIsoString(res.data[0]?.date_start)} - ${formatDateIsoString(res.data[0]?.date_end)}`,
            }
            setEditableFields(fields)
            setInitialFields(fields)
          } else {
            setError(true)
            setPlan({})
            const fields = {
              dietName: 'không có dữ liệu',
              applicationTime: 'không có dữ liệu',
            }
            setEditableFields(fields)
            setInitialFields(fields)
          }
        })
        .catch(() => {
          setError(true)
          setInitialFields({})
          setEditableFields({})
          setInitialData({})
        })
    }
  }, [selectedPet])

  
  if (error) {
    return (
      <Modal
        style={{ top: 0 }}
        title={
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            HỒ SƠ BỆNH ÁN
          </span>
        }
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={1000}
      >
        <Divider />
        <div className="flex flex-col justify-between min-h-[60vh]">
          <div>
            <Button icon={<PlusOutlined />} type="primary">
              Thêm kế hoạch ăn uống{' '}
            </Button>
          </div>
          <div className="flex justify-center items-center flex-1 text-red-500 text-xl w-full">
            Thú cưng hiện không có chế độ ăn nào
          </div>
        </div>
      </Modal>
    )
  }


  const handleDoubleClick = (field) => setIsEditing({ [field]: true })
  const handleChange = (field, value) =>
    setEditableFields({ ...editableFields, [field]: value })
  const handleBlur = (field) => setIsEditing({ [field]: false })
  const handleKeyDown = (field, e) => e.key === 'Enter' && handleBlur(field)

  const isEditingCell = (record, column) =>
    record.key === editingKey && column === editingColumn
  const editCell = (record, column) => {
    setEditingKey(record.key)
    setEditingColumn(column)
  }
  const saveCell = () => {
    setEditingKey('')
    setEditingColumn('')
  }

  const handleCellChange = (e, key, column) => {
    const newData = [...data]
    const index = newData.findIndex((item) => key === item.key)
    if (index > -1) {
      newData[index][column] = e.target.value
      setData(newData)
    }
  }

  const columns = [
    { title: 'STT', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'Tên thực phẩm', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Số lượng', dataIndex: 'amount', key: 'amount', width: '15%' },
    { title: 'Đơn vị tính', dataIndex: 'unit', key: 'unit', width: '15%' },
  ].map((col) => ({
    ...col,
    render: (text, record) =>
      isEditingCell(record, col.dataIndex) ? (
        <Input
          value={text}
          onChange={(e) => handleCellChange(e, record.key, col.dataIndex)}
          onBlur={saveCell}
          onKeyDown={(e) => e.key === 'Enter' && saveCell()}
          autoFocus
        />
      ) : (
        <div onDoubleClick={() => editCell(record, col.dataIndex)}>{text}</div>
      ),
  }))

  const handleSave = () => {
    const dietPlanNe = {
      name: editableFields.dietName,
      description: editableFields.dietDescription,
      date_start: formatDateToYYYYMMDD(editableFields.date_start),
      date_end: formatDateToYYYYMMDD(editableFields.date_end),
    }

    diet.updateDietPlan(selectedPet.pet_id, dietPlanNe).then((res) => {
      console.log(res)
      toast.success('cập nhật thành công')
    })
    // console.log('Editable Fields:', dietPlanNe)
    // console.log('Table Data:', data)
    data.map((row) => {
      const foodNe = {
        name: row.name,
        amount: row.amount,
        unit: row.unit,
        description: row.description,
        time: row.time,
      }
      diet
        .updateDietFood(selectedPet.pet_id, row.food_id, foodNe)
        .then((res) => {
          console.log(res)
        })
    })

    setInitialFields(editableFields)
    setInitialData(data)
    onSave && onSave(editableFields, data)
    // onCancel()
  }

  return (
    <Modal
      style={{ top: 0 }}
      title={
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Chế độ ăn</span>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <Divider />
      <div style={{ padding: 24, minHeight: 360 }}>
        {selectedPet && (
          <div
            className="items-center"
            style={{ display: 'flex', marginBottom: 24 }}
          >
            <Avatar
              src={selectedPet.imgUrl || '/image.png'}
              size={150}
              style={{ marginRight: 24 }}
            />
            <Card style={{ flex: 1 }}>
              <Meta
                title={
                  <p className="uppercase text-xl font-bold">
                    <EditableField
                      value={editableFields['dietName']}
                      isEditing={isEditing['dietName']}
                      onDoubleClick={() => handleDoubleClick('dietName')}
                      onChange={(e) => handleChange('dietName', e.target.value)}
                      onBlur={() => handleBlur('dietName')}
                      onKeyDown={(e) => handleKeyDown('dietName', e)}
                    />
                  </p>
                }
                description={
                  <div className="Diet-title">
                    <p>
                      <strong className="w-[250px] ">Chế độ ăn:</strong>
                      <EditableField
                        value={editableFields['dietDescription']}
                        isEditing={isEditing['dietDescription']}
                        onDoubleClick={() =>
                          handleDoubleClick('dietDescription')
                        }
                        onChange={(e) =>
                          handleChange('dietDescription', e.target.value)
                        }
                        onBlur={() => handleBlur('dietDescription')}
                        onKeyDown={(e) => handleKeyDown('dietDescription', e)}
                      />
                    </p>
                    <p className="">
                      <strong className="w-[250px] flex flex-row gap-3">
                        Thời gian áp dụng:
                      </strong>
                      <EditableField
                        value={editableFields.date_start}
                        isEditing={isEditing['date_start']}
                        onDoubleClick={() => handleDoubleClick('date_start')}
                        onChange={(e) =>
                          handleChange('date_start', e.target.value)
                        }
                        onBlur={() => handleBlur('date_start')}
                        onKeyDown={(e) => handleKeyDown('date_start', e)}
                      />
                      <span>-</span>
                      <EditableField
                        value={editableFields.date_end}
                        isEditing={isEditing['date_end']}
                        onDoubleClick={() => handleDoubleClick('date_end')}
                        onChange={(e) =>
                          handleChange('date_end', e.target.value)
                        }
                        onBlur={() => handleBlur('date_end')}
                        onKeyDown={(e) => handleKeyDown('date_end', e)}
                      />
                    </p>
                  </div>
                }
              />
            </Card>
          </div>
        )}
        <Select
          defaultValue={food && food[0]?.time}
          style={{ width: 200, marginBottom: 16 }}
        >
          <Option value="breakfast">Bữa sáng</Option>
          <Option value="lunch">Bữa trưa</Option>
          <Option value="dinner">Bữa tối</Option>
        </Select>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 3 }}
          style={{ marginBottom: 16 }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={handleSave}
          >
            Lưu
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DietPlanModal
