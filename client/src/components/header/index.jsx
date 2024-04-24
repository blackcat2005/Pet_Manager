import { Layout } from "antd";

const { Header} = Layout;
import { Avatar } from 'antd';
import { Link } from "react-router-dom";
import {
  UserOutlined
} from '@ant-design/icons';
import './header.scss'


const HeaderRender = () => {
    return (
      <>
        <div >
        <Header className="header-wrapper" 
        style={{
                display: 'flex',
                justifyContent: 'space-between',    
                alignItems: 'center',
                alignContent: 'center',
                paddingLeft: '25px'
              }}>
          <div className="header-wrapper__logo">
            <img src="./logo.png" alt="logo" />
          </div>
          <div className="header-wrapper__avatar">
            <Link to={'/personal-info'}><Avatar size={40} icon={<UserOutlined/>} /></Link>
          </div>
        </Header>
        </div>
        </>
    )
}

export default HeaderRender;