import React, { useState } from 'react'
import { TableOutlined, FormOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Navigate, Link, useLocation } from 'react-router-dom'
const { Sider } = Layout
import './siderbar.scss'
import useAuth from 'hooks/useAuth'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const customerMenu = [
  getItem('Danh sách thú cưng', '/pet', <TableOutlined />),
  getItem('Dịch vụ', 'service', <FormOutlined />, [
    getItem('Đăng ký dịch vụ', '/service-register'),
    getItem('Lịch sử đăng ký', '/service-history'),
    getItem('Bảng giá dịch vụ', '/service-cost'),
  ]),
]

const staffMenu = [
  getItem('Quản lí khách hàng', '/customer-manager', <TableOutlined />),
  getItem('Quản lí thú cưng', '/pet-manager', <TableOutlined />),
  getItem('Dịch vụ vệ sinh', 'sanitation-service', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/sanitation-used'),
    getItem('Thông tin dịch vụ', '/sanitation-info'),
  ]),
  getItem('Quản lý dịch vụ lưu trữ', 'storage-service', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/storage-used'),
    getItem('Thông tin dịch vụ', '/storage-info'),
  ]),
  getItem('Quản lý khám bệnh', 'medical-service', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/medical-used'),
    getItem('Thông tin dịch vụ', '/medical-info'),
  ]),
]

const adminMenu = [
  getItem('Quản lí khách hàng', '/pet', <TableOutlined />),
  getItem('Dịch vụ vệ sinh', 'sanitation-service', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/sanitation-used'),
    getItem('Thông tin dịch vụ', '/sanitation-info'),
  ]),
]

const takeMenu = (roles) => {
  switch (roles) {
    case 'customer':
      return customerMenu
    case 'staff':
      return staffMenu
    case 'admin':
      return adminMenu

    default:
      break
  }
}

const SiderRender = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { userData } = useAuth()
  // const [menu, setMenu] = useState(takeMenu(userData.roles))

  
  return (
    <Sider
      width={200}
      className="sider-wrapper"
      theme={props.theme}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {userData && userData.roles === 'customer'}
      <Menu
        className="sider-wrapper__menu-item"
        theme={props.theme}
        selectedKeys={location.pathname}
        mode="inline"
        // defaultSelectedKeys={1}
        // defaultOpenKeys={['service']}
      >
        {userData && takeMenu(userData.roles).map((item) => {
          if (item.children) {
            return (
              <Menu.SubMenu
                popupOffset={false}
                key={item.key}
                icon={item.icon}
                title={item.label}
              >
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={subItem.key}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            )
          }
        })}
      </Menu>
    </Sider>
  )
}

export default SiderRender
