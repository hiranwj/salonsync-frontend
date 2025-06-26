import React, { useState } from 'react';
import { Row, Col, Typography, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Header.css';
import girlImage from '../../../assets/woman-sitting-barbers.png';
import ImageLeft from "../../../assets/left-machine.png"
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const searchLaborer = async () => {
        navigate("/find-stylist", { state: { search: searchValue } }
        );
    }

    return (
        <section className="header-section">
            <div className="header-background-ring"></div>
            <Row justify="center" align="middle" className="header-row">
                {/* Text Section */}
                <Col span={3} className="left-image-container">
                    <img src={ImageLeft} alt="leftImage" />
                </Col>
                <Col span={10} className="header-content">
                    <Title  className="header-title">
                        Find Your Perfect Look <br />
                        <span>and<span className="highlighted"> Get-It-Booked</span></span>
                    </Title>
                    <Text className="header-subtitle">
                        Any Style – Any Time – Any Chair
                    </Text>
                    <div className="search-bar-container">
                        <Input
                            placeholder="Search"
                            //prefix={}
                            className="search-bar"
                            onChange={(e) => setSearchValue(e.target.value||"")} // Update state
                            onPressEnter={searchLaborer}
                        />
                        <Button onClick={searchLaborer} className="search-button">
                            <SearchOutlined />
                        </Button>
                    </div>
                </Col>

                {/* Girl Image Section */}
                <Col span={11} className="header-image-container">
                    <img src={girlImage} alt="Hero" className="girl-image" />
                    {/* <div className="service-callout">
                        <Text className="callout-text">Need a person for repair work at home?</Text>
                        <Button type="primary" className="callout-button">Obtain Service</Button>
                    </div> */}
                </Col>
            </Row>
        </section>
    );
};

export default Header;
