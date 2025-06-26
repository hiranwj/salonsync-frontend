import React from 'react';
import { Row, Col, Typography } from 'antd';
import { UserOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons';
import './Benifits.css';
import { MdDraw } from "react-icons/md";
import gearImage from '../../../assets/right-brush.png';

const { Title, Text } = Typography;

const Benefits: React.FC = () => {
    return (
        <section className="benefitsSection">
            
            <Row gutter={[16, 16]} justify="center" className="benefitsRow">
                <Col span={5} className='benifitsName'>
                    <Title level={3} className="benefitsTitle">
                        Be Smart to Use 
                    </Title>
                    <span className="benefitsTitle">with SalonSync</span>
                    <div className="services-underline"></div>
                </Col>
                <Col span={18}>
                    <Row className="benefitItem">
                        <MdDraw className="benefitIcon" />
                        <div>
                            <Title level={4}>Easy Appointment Scheduling</Title>
                            <Text className="benefitText">Manage bookings with a user-friendly calendar system.</Text>
                        </div>
                    </Row>
                    <Row className="benefitItem">
                        <SolutionOutlined className="benefitIcon"/>
                        <div>
                            <Title level={4}>Smart Staff Management</Title>
                            <Text className="benefitText">Assign tasks, track performance, and optimize schedules for your stylists.</Text>
                        </div>
                    </Row>
                    <Row className="benefitItem">
                        <TeamOutlined className="benefitIcon" />
                        <div>
                            <Title level={4}>Client Profiles & History</Title>
                            <Text className="benefitText">Store and access client preferences and visit history to provide personalized services.</Text>
                        </div>
                    </Row>
                </Col>
                <Col span={1}>
                    <img src={gearImage} alt="Brush" className="machine-img" />
                </Col>
            </Row>
        </section>
    );
};

export default Benefits;
