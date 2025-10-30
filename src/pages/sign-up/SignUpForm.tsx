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
    const [selectedRole, setSelectedRole] = useState<string>(""); // track role selection

    const signupUser = async (userData: any) => {
        try {
            const response = await axios.post(
            "http://localhost:8080/api/v1/userData",
            userData,
            {
                headers: {
                "Content-Type": "application/json",
                },
            }
            );

            return response.data;
        } catch (error: any) {
            throw error;
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);

        if (values.password !== values.confirmPassword) {
            notification.error({
            message: "Signup Failed",
            description: "Passwords do not match.",
            });
            setLoading(false);
            return;
        }

        const reqBody = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
            gender: values.gender,
            contactNumber: values.contactNumber,
        };

        try {
            const response = await signupUser(reqBody);
            console.log("Signup response:", response);

            notification.success({
            message: "Signup Successful",
            description: "User signed up successfully.",
            });

            navigate("/login");
        } catch (error: any) {
            const errorMsg =
            error.response?.data || "Unexpected error occurred. Please try again.";
            notification.error({
            message: "Signup Failed",
            description: errorMsg,
            });
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };


    // Gender options based on role
    const genderOptions = selectedRole === "STAFF"
        ? ["Male", "Female"]
        : ["Male", "Female", "Other"];

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
                autoComplete="off" 
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
                                maxLength={9}
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
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Role</span>}
                            name="role"
                            rules={[{ required: true, message: 'Please select your role' }]}
                        >
                            <Select onChange={(value) => setSelectedRole(value)}>
                                <Select.Option value="CUSTOMER">Customer</Select.Option>
                                <Select.Option value="STAFF">Staff</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={<span className='label'>Gender</span>}
                            name="gender"
                            rules={[{ required: true, message: 'Please select your gender' }]}
                        >
                            <Select>
                                {genderOptions.map((gender) => (
                                    <Select.Option key={gender} value={gender}>
                                        {gender}
                                    </Select.Option>
                                ))}
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
