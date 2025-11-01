import React from 'react';
import { Layout, Menu, Avatar, Typography, Dropdown, Button } from 'antd';
import {Link} from 'react-router-dom';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import Logo from '../../../../assets/salonsync-logo.png'
import './style/StylistHeader.css';
import SubMenu from 'antd/es/menu/SubMenu';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const StylistHeader: React.FC = () => {
    // Define the dropdown menu for user actions
    const menu = (
        <Menu>
            <SubMenu key="settings" title="Settings">
                <a href='/setting'><Menu.Item key="profile">Manage Master Data</Menu.Item></a> 
            </SubMenu>
            <Menu.Divider />
            <a href='/login'><Menu.Item key="3">Logout</Menu.Item></a> 
        </Menu>
    );

    // const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("role");
    //     localStorage.removeItem("name");
    //     localStorage.removeItem("contactNumber");

    //     // Optionally clear everything (uncomment if needed)
    //     // localStorage.clear();

    //     window.location.href = '/login';
    // };

    return (
        <div className="admin-header">
            <div className="logo">
                <a href='/admin-dashboard'><img src={Logo} alt="Logo" className="logo-text" /></a>
            </div>
            {/* <div className="logout-btn">
                <Button
                    type="primary"
                    size="large"
                    onClick={handleLogout}
                    className="logout-btn"
                    
                    >
                    Logout
                </Button>
            </div> */}
            <div className="header-nav">
                {/* <a href="/" className="nav-link"><Link to={'/'}>Home</Link></a> */}
                <a href="/admin-dashboard" className="nav-link active" style={{ marginLeft: '30px', marginRight: '30px', padding: '5px' }}><Link to={'/admin-dashboard'}>Admin Dashboard</Link></a>
                {/* <a href="/about" className="nav-link"><Link to={'/about'}>About</Link></a> */}
            </div>

            <div className="user-profile">
                <Avatar size="large" icon={<UserOutlined />} />
                <Dropdown overlay={menu} trigger={['click']}>
                    <Text className="username" onClick={(e) => e.preventDefault()}>
                        Administrator <DownOutlined />
                    </Text>
                </Dropdown>
            </div>
        </div>
    );
};

export default StylistHeader;
