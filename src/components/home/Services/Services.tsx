import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { UserOutlined, ToolOutlined, CarOutlined, HomeOutlined, LaptopOutlined, BookOutlined } from '@ant-design/icons';
import './Services.css';
import { FaGraduationCap } from "react-icons/fa6";
import { GiSpanner, GiLaptop } from "react-icons/gi";
import { FaCar, FaHome } from "react-icons/fa";

const { Title } = Typography;

const Services: React.FC = () => {
    const services = [
        { icon: <UserOutlined className="service-icon" />, label: 'Beauty' },
        { icon: <GiSpanner className="service-icon" />, label: 'Technician' },
        { icon: <FaCar className="service-icon" />, label: 'Vehicle' },
        { icon: <FaGraduationCap className="service-icon" />, label: 'Educational' },
        { icon: <GiLaptop className="service-icon" />, label: 'Technology' },
        { icon: <FaHome className="service-icon" />, label: 'Construction' },
    ];

    return (
        <section className="services-section">

            <Row gutter={[16, 16]} justify="center">
                <div className="services-header">
                    <Title level={3} className="services-title">Services</Title>
                    <div className="services-underline"></div>
                </div>
                {services.map((service, index) => (
                    <Col key={index} span={3}>
                        <Card className="service-card" hoverable>
                            {service.icon}
                            <div className="service-label">{service.label}</div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default Services;
