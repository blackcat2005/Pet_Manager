import React, { useState } from 'react';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Navigate, Link } from 'react-router-dom';
const { Sider} = Layout;
import './siderbar.scss'



function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const customerMenu = [
  getItem('Danh sách thú cưng', '/pet', <PieChartOutlined />),
  getItem('Dịch vụ', 'service', <UserOutlined />, [
    getItem('Đăng ký dịch vụ', '/login'),
    getItem('Lịch sử đăng ký', '4'),
    getItem('Bảng giá dịch vụ', '5'),
  ]),
];

const SiderRender=(props)=>{

  const [collapsed, setCollapsed] = useState(false);

    return (
      <Sider 
        width={200}
        className='sider-wrapper'
        theme={props.theme} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        // style = {{height: 'inherit'}}
      >
        
        <Menu
          className='sider-wrapper__menu-item'
          theme={props.theme} 
          selectedKeys={'/pet'}
          mode="inline" 
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['service']}
          // openKeys = {'service'}
          // items={customerMenu}
        > 
          {customerMenu.map((item) => {
            if (item.children) {
              return (
                <Menu.SubMenu popupOffset={false} key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((subItem) => (
                    <Menu.Item key={subItem.key}>
                      <Link to={subItem.key}>{subItem.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.key}>{item.label}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
        
    )
}

export default SiderRender;