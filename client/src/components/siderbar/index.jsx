import React, { useEffect, useState } from 'react'
import { TableOutlined, FormOutlined, AreaChartOutlined } from '@ant-design/icons'
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
  getItem('Quản lý khách hàng', '/manage-customer', <FormOutlined />),
  getItem('Quản lý nhân viên', '/1', <FormOutlined />),
  getItem('Quản lý thú cưng', '/1', <FormOutlined />),
  getItem('Khám bệnh', '/1', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/1'),
    getItem('Thông tin dịch vụ', '/2'),
  ]),
  getItem('Dịch vụ vệ sinh', '/manage-pet', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/1'),
    getItem('Thông tin dịch vụ', '/2'),
  ]),
  getItem('Dịch vụ lưu trữ', '/manage-pet', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/1'),
    getItem('Thông tin dịch vụ', '/2'),
  ]),
]

const adminMenu = [
  getItem('Thống kê báo cáo', '/report', <AreaChartOutlined />),
  getItem('Quản lý khách hàng', '/manage-customer', <FormOutlined />),
  getItem('Quản lý nhân viên', '/1', <FormOutlined />),
  getItem('Quản lý thú cưng', '/1', <FormOutlined />),
  getItem('Khám bệnh', '/1', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/1'),
    getItem('Thông tin dịch vụ', '/2'),
  ]),
  getItem('Dịch vụ vệ sinh', '/manage-pet', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/1'),
    getItem('Thông tin dịch vụ', '/2'),
  ]),
  getItem('Dịch vụ lưu trữ', '/manage-pet', <FormOutlined />, [
    getItem('Sử dụng dịch vụ', '/1'),
    getItem('Thông tin dịch vụ', '/2'),
  ]),
]


const SiderRender = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [role, setRole] = useState(localStorage.getItem("role"))
  const location = useLocation();

  const menuItems = () => {
    if (role === "admin") return adminMenu;
    if (role === "staff") return staffMenu;
    if (role === "customer") return customerMenu;
    return [];
  };

  useEffect(() => {
    setRole(localStorage.getItem("role", role));
  }, [role])

  return (
    <Sider
      width={200}
      className="sider-wrapper"
      theme={props.theme}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    // style = {{height: 'inherit'}}
    >
      <Menu
        className="sider-wrapper__menu-item"
        theme={props.theme}
        selectedKeys={location.pathname}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['service']}
      // openKeys = {'service'}
      // items={customerMenu}
      >
        {
          menuItems().map((item) => {
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
          })
        }
      </Menu>
    </Sider>
  )
}

export default SiderRender
