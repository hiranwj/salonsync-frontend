import React from 'react';
import { Form, Input, Checkbox, Button, Typography, Row, Col, Select, Space } from 'antd';
import Logo from '../../assets/salonsync-logo.png'
import Machine from '../../assets/left-machine.png'
import './style/SignUpForm.css'

const { Title, Text } = Typography;

interface FormValues {
    name: string;
    contactNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC = () => {
    const onFinish = (values: FormValues) => {
        console.log('Form Values:', values);
    };

    return (
        <div className='container'>
            <img src={Logo} alt="Logo" className='logo-img' />
            <img src={Machine} alt="Settings" className='machine-img' />

            <Title level={3} className='title'>
                Sign Up
            </Title>

            <Form
                className='signup-form'
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                initialValues={{
                    agreement: false,
                }}
            >

                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Name</span>}
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input className="responsive-input" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Phone Number</span>}
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please enter your phone number' }]}
                        >
                            <Input className="responsive-input"
                                addonBefore="+94"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                onKeyPress={(event) => {
                                    if (!/^[0-9]$/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>

                </Row>

                <Row >
                    <Col span={24}>
                        <Form.Item
                            label={<span className='label'>Email</span>}
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter your email' }]}
                        >
                            <Input className="responsive-input" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please enter password' }]}
                        >
                            <Input className="responsive-input" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Confirm Password </span>}
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please enter confirm password' }]}
                        >
                            <Input className="responsive-input" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={<span className='label'>Role</span>}
                            name="typeOfWork"
                            rules={[{ required: true, message: 'Please enter your role' }]}
                        >
                            <Select>
                                <Select.Option value="1">Customer</Select.Option>
                                <Select.Option value="2">Staff</Select.Option>

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <div className='btn-div'>
                        <Space>
                            <label className='login-text'>Already have an account? <a>Login</a></label>
                            <Button
                                className='signup-btn'
                                htmlType="submit"
                            >
                                SignUp
                            </Button>
                        </Space>

                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignupForm;
