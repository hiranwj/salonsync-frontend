import React from 'react'
import AdminHeader from '../../components/layout/header/admin-header/AdminHeader'
import { Card, Col, Row } from 'antd'
import AdminLabels from './components/AdminLabels'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Hair Cutting', value: 6 },
    { name: 'Bridal Hair', value: 2 },
    { name: 'Facial', value: 5 },
    { name: 'Makeup', value: 4 },
    { name: 'Pedicure', value: 3 },
    { name: 'Manicure', value: 8 },
    { name: 'Dressing', value: 1 },
    { name: 'Other', value: 15 },
];

const COLORS = ['#8884d8', '#82ca9d', '#8dd1e1', '#a4de6c', '#d0ed57'];

const AdminDashboard = () => {
    return (
        <div style={{padding:"0 80px 0 80px",marginTop:"70px"}}>
            <AdminHeader />
            <Row gutter={16}>
                <Col span={10}>
                    <Card title="Summary of bookings" style={{
                        width: 550,
                        // marginLeft: '0px',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                    }}>
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={14}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <AdminLabels name='Registered Customers' count={20} />
                        </Col>
                        <Col span={8}>
                            <AdminLabels name='Hair Cutting' count={6} />
                        </Col>
                        <Col span={8}>
                            <AdminLabels name='Bridal Hair' count={2} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <AdminLabels name='Facial' count={5} />
                        </Col>
                        <Col span={8}>
                            <AdminLabels name='Makeup' count={4} />
                        </Col>
                        <Col span={8}>
                            <AdminLabels name='Pedicure' count={3} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <AdminLabels name='Manicure' count={8} />
                        </Col>
                        <Col span={8}>
                            <AdminLabels name='Dressing' count={1} />
                        </Col>
                        <Col span={8}>
                            <AdminLabels name='Other' count={15} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <h3>Ratings and Reviews</h3>
            <Row gutter={[16, 16]}>

                <Col span={4}>
                    <AdminLabels name='Total Reviews' count={30} />
                </Col>
                <Col span={4}>
                    <AdminLabels name='Total Ratings' count={20} />
                </Col>
                <Col span={4}>
                    <AdminLabels name='5 start Ratings' count={13} />
                </Col>
                <Col span={4}>
                    <AdminLabels name='4 Star Ratings' count={8} />
                </Col>
                <Col span={4}>
                    <AdminLabels name='3 Star Ratings' count={4} />
                </Col>
                <Col span={4}>
                    <AdminLabels name='2 start Ratings' count={5} />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>

                <Col span={4}>
                    <AdminLabels name='1 start Ratings' count={1} />
                </Col>

            </Row>
        </div>




    )
}

export default AdminDashboard