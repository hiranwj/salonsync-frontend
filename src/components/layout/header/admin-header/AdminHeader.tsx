import React from 'react';
import { Layout, Menu, Avatar, Typography, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import Logo from '../../../../assets/salonsync-logo.png'
import './style/AdminHeader.css';
import SubMenu from 'antd/es/menu/SubMenu';

const { Header } = Layout;
const { Text } = Typography;

const AdminHeader: React.FC = () => {
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

    return (
        <div className="admin-header">
            <div className="logo">
                <a href='/admin-dashboard'><img src={Logo} alt="Logo" className="logo-text" /></a>
            </div>

            <Menu theme="light" mode="horizontal"  className="header-menu">
                <a href='/admin-dashboard'  key="1">Dashboard</a>
                <a href='/laborer-manegemnt' key="2" style={{ marginLeft: '30px', marginRight: '30px' }}> Stylist Management</a>
                <a href='/report'>Reports</a>
            </Menu>

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

export default AdminHeader;
