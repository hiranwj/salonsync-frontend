import React from 'react';
import {Link} from 'react-router-dom';
import './style/UserHeader.css';
import Logo from '../../../../assets/salonsync-logo.png';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const UserHeader: React.FC = () => {
    return (
        <div className="header-container">
            <div className="header-logo">
                <img src={Logo} alt="salonsync Logo" />
            </div>

            <div className="header-nav">
                <a href="/" className="nav-link"><Link to={'/'}>Home</Link></a>
                <a href="/book-an-apointment" className="nav-link active" style={{ marginLeft: '30px', marginRight: '30px' }}><Link to={'/book-an-apointment'}>Book an appointment</Link></a>
                <a href="/about" className="nav-link"><Link to={'/about'}>About</Link></a>
            </div>

            <div className="header-search">
            <a href="/login" className="nav-link active admin-log"><Link className='admin-log-link' to={'/login'}>Log In</Link></a>
                {/* <Input 
                    placeholder="Search here" 
                    suffix={<SearchOutlined />} 
                    className="search-input"
                /> */}
            </div>
        </div>
    );
};

export default UserHeader;
