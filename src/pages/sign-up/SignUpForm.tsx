import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Typography, Row, Col, Select, Space, notification, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Logo from '../../assets/salonsync-logo.png'
import Machine from '../../assets/left-machine.png'
import './style/SignUpForm.css'

import { signinAdmin } from "../../service/signin-management-service";
import type { SigninModel } from "../../models/signin-model";
import { displayErrorMessage } from "../../utill/display-error-message";

const { Title, Text } = Typography;

    const SignupForm: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigation hook
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { name: string; email: string; password: string; role: string; contactNumber: string; }) => {
        setLoading(true);
        try {
        const reqBody: SigninModel = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
            contactNumber: values.contactNumber,
        };

        const response = await signinAdmin(reqBody);

        console.log("Signup response:", response);

        const successMessage = response?.Message || "";
        if (successMessage.includes("saved successfully")) {
        notification.success({
            message: "Signup Successful",
            description: "Admin signed up successfully.",
        });
        navigate("/login");
        } else {
            displayErrorMessage("Signup Failed", "Invalid data");
        }

        } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage =
            (error.response?.data && (error.response.data as any).message) || undefined;
            displayErrorMessage("Signup Failed", "Invalid data 3");
        } else {
            displayErrorMessage("Signup Failed", "Unexpected error occurred.");
        }
        console.error("Signup error:", error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className='container'>
            <a href="/"><img src={Logo} alt="Logo" className="logo-img" /></a>
            <img src={Machine} alt="Settings" className='hair-machine-img' />

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
                            name="contactNumber"
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
                            name="email"
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
                            <Input.Password className="responsive-input" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Confirm Password </span>}
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please enter confirm password' }]}
                        >
                            <Input.Password className="responsive-input" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={<span className='label'>Role</span>}
                            name="role"
                            rules={[{ required: true, message: 'Please enter your role' }]}
                        >
                            <Select>
                                <Select.Option value="CUSTOMER">Customer</Select.Option>
                                <Select.Option value="STAFF">Staff</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <div className='btn-div'>
                        <Space>
                            <Button
                                className='signup-btn'
                                htmlType="submit"
                            >
                                SignUp
                            </Button>
                        </Space>

                    </div>
                </Form.Item>
                <Row>
                    <Col span={24} className='text-center'>
                        <Text className='text'>
                            Already have an account? <a className='login-link' href="/login">Log In</a>
                        </Text>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default SignupForm;
