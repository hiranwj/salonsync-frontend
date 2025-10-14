import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, TimePicker, Button, Card, Row, Col, message } from "antd";
import { CalendarOutlined, ScissorOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
// import AdminHeader from '../../components/layout/header/admin-header/AdminHeader';
import AppointmentHeader from "../../components/layout/header/appointment-header/AppointmentHeader";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import "dayjs/locale/en";
import { Space } from "antd";

const { Option } = Select;
import axios from "axios";
import { notification } from "antd";
import { appointment } from "../../service/appointment-management-service";
import type { AppointmentModel } from "../../models/appointment-model";
import { displayErrorMessage } from "../../utill/display-error-message";

const BookAppointment: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [stylists, setStylists] = useState<{ id: number; name: string }[]>([]);
    const [loadingStylists, setLoadingStylists] = useState(true);

    useEffect(() => {
        const fetchStylists = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/stylistData");
                // setStylists(response.data);
                // Access the 'Data' property from the response
                setStylists(Array.isArray(response.data.Data) ? response.data.Data : []);
            } catch (error) {
                console.error("Error fetching stylists:", error);
                message.error("Failed to load stylists");
            } finally {
                setLoadingStylists(false);
            }
        };
        fetchStylists();
    }, []);


    const onFinish = async (values: any) => {
        // values: { customerName: string; contactNumber: string; serviceType: string; appointmentDate: string; appointmentTime: string; note: string; stylistId: number; createdBy: number; }) => {
    
    setLoading(true);
    try {
        const formattedDate = dayjs(values.appointmentDate).format("YYYY-MM-DD");
        const formattedTime = dayjs(values.appointmentTime).format("HH:mm");

        const reqBody: AppointmentModel = {
            customerName: values.customerName,
            contactNumber: values.contactNumber,
            serviceType: values.serviceType,
            appointmentDate: formattedDate,
            appointmentTime: formattedTime,
            note: values.notes,
            stylistId: values.stylistId,
            createdBy: values.createdBy
        };

        const response = await appointment(reqBody);

        console.log("Appointment response:", response);

        const successMessage = response?.Message || "";
        if (successMessage.includes("Appointment booked successfully.")) {
        notification.success({
            message: "Appointment Successful",
            description: "Appointment successfully.",
        });
        navigate("/book-an-apointment");
        } else {
            displayErrorMessage("Appointment Failed", "Invalid data");
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage =
            (error.response?.data && (error.response.data as any).message) || undefined;
            displayErrorMessage("Appointment Failed", error.response?.data?.Message || "");
        } else {
            displayErrorMessage("Appointment Failed", "Unexpected error occurred.");
        }
        console.error("Appointment error:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ padding: "60px 80px", background: "#fafafa", minHeight: "100vh" }}>
    <AppointmentHeader />
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: "#3b3b98", marginBottom: "10px" }}>Book Your Appointment</h2>
            <p style={{ color: "#666" }}>Choose your preferred stylist, service, date, and time</p>
          </div>
        }
        style={{
          maxWidth: 800,
          margin: "0 auto",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "12px",
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="customerName"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Contact Number"
                name="contactNumber"
                rules={[{ required: true, message: "Please enter your contact number" }]}
              >
                {/* <Input prefix={<UserOutlined />} placeholder="Enter your phone number" /> */}
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Select Service"
                name="serviceType"
                rules={[{ required: true, message: "Please select a service" }]}
              >
                <Select
                  prefix={<ScissorOutlined />}
                  placeholder="Select a service"
                  style={{ width: "100%" }}
                >
                  <Option value="Hair Cutting">Hair Cutting</Option>
                  <Option value="Bridal Hair">Bridal Hair</Option>
                  <Option value="Facial">Facial</Option>
                  <Option value="Makeup">Makeup</Option>
                  <Option value="Pedicure">Pedicure</Option>
                  <Option value="Manicure">Manicure</Option>
                  <Option value="Dressing">Dressing</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* <Form.Item
                label="Preferred Stylist"
                name="stylistId"
                rules={[{ required: true, message: "Please select a stylist" }]}
              >
                <Select placeholder="Choose stylist">
                  <Option value="1">Janith</Option>
                  <Option value="2">Sanduni</Option>
                  <Option value="3">Lahiru</Option>
                  <Option value="4">Kasun</Option>
                </Select>
              </Form.Item> */}
              {/* <Form.Item
                label="Preferred Stylist"
                name="stylistId"
                rules={[{ required: true, message: "Please select a stylist" }]}
              >
                <Select placeholder="Choose stylist" loading={!stylists.length}>
                  {stylists.map((stylist) => (
                    <Option key={stylist.id} value={stylist.id}>
                      {stylist.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}

              <Form.Item
                label="Preferred Stylist"
                name="stylistId"
                rules={[{ required: true, message: "Please select a stylist" }]}
            >
                <Select placeholder="Choose stylist" loading={loadingStylists}>
                    {Array.isArray(stylists) && stylists.map(stylist => (
                        <Option key={stylist.id} value={stylist.id}>
                            {stylist.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Appointment Date"
                name="appointmentDate"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  suffixIcon={<CalendarOutlined />}
                  disabledDate={(current) => current && current < dayjs().startOf("day")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Appointment Time"
                name="appointmentTime"
                rules={[{ required: true, message: "Please select a time" }]}
              >
                <TimePicker
                    style={{ width: "100%" }}
                    suffixIcon={<ClockCircleOutlined />}
                    format="HH:mm"
                    minuteStep={30}
                    use12Hours={false}
                    disabledHours={() => {
                        // Disable hours outside 08:00–18:00
                        const disabled: number[] = [];
                        for (let i = 0; i < 24; i++) {
                        if (i < 8 || i > 18) disabled.push(i);
                        }
                        return disabled;
                    }}
                    disabledMinutes={() => {
                        // Only allow 00 and 30 minutes
                        const disabled: number[] = [];
                        for (let i = 0; i < 60; i++) {
                        if (i !== 0 && i !== 30) disabled.push(i);
                        }
                        return disabled;
                    }}
                />


              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Additional Notes" name="notes">
            <Input.TextArea rows={3} placeholder="Write any special requests..." />
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Space size="large">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    style={{
                        backgroundColor: "#7e57c2",
                        borderColor: "#7e57c2",
                        borderRadius: "8px",
                        padding: "0 30px",
                    }}
                    >
                    Confirm Booking
                </Button>
                <Button
                    size="large"
                    style={{
                    borderRadius: "8px",
                    padding: "0 30px",
                    }}
                    onClick={() => {
                    window.location.href = "/homepage";
                    }}
                    >
                    Cancel
                </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default BookAppointment;
