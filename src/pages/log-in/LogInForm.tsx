import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, notification } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from "axios";

import Logo from '../../assets/salonsync-logo.png';
import Machine from '../../assets/right-brush.png'
import './style/LogInForm.css';

import { loginAdmin } from "../../service/login-management-service";
import type { LoginModel } from "../../models/login-model";
import { displayErrorMessage } from "../../utill/display-error-message";

const { Title } = Typography;

const LoginForm: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigation hook
    const [loading, setLoading] = useState(false);

    // const onFinish = async (values: { email: string; password: string }) => {
    //     setLoading(true);
    //     try {
    //     const reqBody: LoginModel = {
    //         email: values.email,
    //         password: values.password,
    //     };

    //     const response = await loginAdmin(reqBody);

    //     const token = response.Data?.token;


    //     if (token) {
    //         localStorage.setItem("token", token);
    //         notification.success({
    //         message: "Login Successful",
    //         description: "Admin logged in successfully.",
    //         });
    //         navigate("/admin-dashboard");
    //     } else {
    //         displayErrorMessage("Login Failed", "Invalid email or password");
    //     }
    //     } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //         const serverMessage =
    //         (error.response?.data && (error.response.data as any).message) || undefined;
    //         displayErrorMessage("Login Failed", "Invalid email or password");
    //     } else {
    //         displayErrorMessage("Login Failed", "Unexpected error occurred.");
    //     }
    //     console.error("Login error:", error);
    //     } finally {
    //     setLoading(false);
    //     }
    // };

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const reqBody: LoginModel = {
            email: values.email,
            password: values.password,
            };

            const response = await loginAdmin(reqBody);

            const token = response.Data?.token;
            const role = response.Data?.role;
            const name = response?.Data?.name || "";
            const contactNumber = response?.Data?.contactNumber || "";

            if (token && role) {
            // Save token + role in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("name", name);
            localStorage.setItem("contactNumber", contactNumber);

            notification.success({
                message: "Login Successful",
                description: `${role} logged in successfully.`,
            });

            // Navigate based on role
            if (role === "CUSTOMER") {
                navigate("/book-an-apointment");
            } else if (role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/"); // fallback
            }
            } else {
            displayErrorMessage("Login Failed", "Invalid email or password");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
            const serverMessage =
                (error.response?.data && (error.response.data as any).message) ||
                undefined;
            displayErrorMessage("Login Failed", serverMessage || "Invalid credentials");
            } else {
            displayErrorMessage("Login Failed", "Unexpected error occurred.");
            }
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <a href="/homepage"><img src={Logo} alt="Logo" className="logo-img" /></a>
            <img src={Machine} alt="Settings" className='right-brush-img' />
            <Title level={3} className="title">
                Log In
            </Title>

            <Form
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                autoComplete="off" 
                className="fields"
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<span className="label">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter a valid email' },
                                { type: 'email', message: 'Invalid email format' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<span className="label">Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <div className="btn-div">
                        <Button
                            className="btn"
                            htmlType="submit"
                            loading={loading}
                        >
                            Log In
                        </Button>
                    </div>
                </Form.Item>
                <Row>
                    <Col span={24} className="text-center">
                        <p className="text">
                            Don't have an account? <a className='signup-link' href="/signup">Sign Up</a>
                        </p>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default LoginForm;