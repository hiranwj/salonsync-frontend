import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Radio, Select, DatePicker, TimePicker, Button, Card, Row, Col, message } from "antd";
import { CalendarOutlined, ScissorOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
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

    const [allStylists, setAllStylists] = useState<{ id: number; name: string; specialization: string }[]>([]);
    const [filteredStylists, setFilteredStylists] = useState<{ id: number; name: string; specialization: string }[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const [form] = Form.useForm();
    const [isPrefilled, setIsPrefilled] = useState(false);

    useEffect(() => {
      let filtered = allStylists;

      if (selectedServices.length > 0) {
        filtered = filtered.filter(
          (stylist) =>
            selectedServices.includes(stylist.specialization) ||
            stylist.specialization.toLowerCase() === "all"
        );
      }

      if (selectedGender) {
        filtered = filtered.filter((stylist) => stylist.gender === selectedGender);
      }

      setFilteredStylists(filtered);
    }, [selectedServices, selectedGender, allStylists]);

    useEffect(() => {
      let filtered = allStylists;

      // Filter by service specialization first
      if (selectedServices.length > 0) {
        filtered = filtered.filter(
          (stylist) =>
            selectedServices.includes(stylist.specialization) ||
            stylist.specialization.toLowerCase() === "all"
        );
      }

      // Then filter by gender (ignore if "Any")
      if (selectedGender && selectedGender !== "Any") {
        filtered = filtered.filter((stylist) => stylist.gender === selectedGender);
      }

      setFilteredStylists(filtered);
    }, [selectedServices, selectedGender, allStylists]);


    // Fetch stylists
    useEffect(() => {
      const fetchStylists = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/v1/stylistData");
          const stylistsData = Array.isArray(response.data.Data) ? response.data.Data : [];
          setAllStylists(stylistsData);
          setFilteredStylists(stylistsData); // default all
        } catch (error) {
          console.error("Error fetching stylists:", error);
          message.error("Failed to load stylists");
        } finally {
          setLoadingStylists(false);
        }
      };
      fetchStylists();
    }, []);

    // Watch selected services and filter stylists accordingly
    useEffect(() => {
      if (selectedServices.length === 0) {
        // If no service selected → show all stylists
        setFilteredStylists(allStylists);
      } else {
        // Filter stylists matching any selected service or "All"
        const filtered = allStylists.filter((stylist) =>
          selectedServices.includes(stylist.specialization) ||
          stylist.specialization.toLowerCase() === "all"
        );
        setFilteredStylists(filtered);
      }
    }, [selectedServices, allStylists]);

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

    useEffect(() => {
      const storedName = localStorage.getItem("name");
      const storedContact = localStorage.getItem("contactNumber");

      if (storedName || storedContact) {
        form.setFieldsValue({
          customerName: storedName || "",
          contactNumber: storedContact || "",
        });
        setIsPrefilled(true); // mark as autofilled
      }
    }, [form]);


    const onFinish = async (values: any) => {   
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

  // const serviceOptions = [
  //   "Hair Cutting",
  //   "Bridal Hair",
  //   "Facial",
  //   "Makeup",
  //   "Pedicure",
  //   "Manicure",
  //   "Dressing",
  //   "Trending",
  // ];

  const serviceOptions = [
    { name: "Hair Cutting", price: 1000 },
    { name: "Bridal Hair", price: 5000 },
    { name: "Facial", price: 2500 },
    { name: "Makeup", price: 4000 },
    { name: "Pedicure", price: 1500 },
    { name: "Manicure", price: 1200 },
    { name: "Dressing", price: 2000 },
    { name: "Trending", price: 3000 },
  ];

  const handleCancel = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("contactNumber");

        // Optionally clear everything (uncomment if needed)
        // localStorage.clear();

        window.location.href = '/homepage';
    };

  return (
    <div style={{ padding: "60px 80px", background: "#fafafa", minHeight: "100vh" }}>
    <AppointmentHeader />
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#3b3b98" }}>Book Your Appointment</h3>
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
        <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="customerName"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Enter your name" 
                  disabled={isPrefilled} // disable if prefilled
                />
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
                            disabled={isPrefilled} // disable if prefilled
                        />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Select Services"
                name="serviceType"
                rules={[{ required: true, message: "Please select at least one service" }]}
              >
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(checkedValues) => {
                    setSelectedServices(checkedValues as string[]);
                    
                    // Calculate total price
                    const selected = checkedValues as string[];
                    const total = serviceOptions
                      .filter((service) => selected.includes(service.name))
                      .reduce((sum, service) => sum + service.price, 0);
                    setTotalPrice(total);
                  }}
                >
                  <Row gutter={[16, 8]}>
                    {serviceOptions.map((service, index) => (
                      <Col span={12} key={index}>
                        <Checkbox value={service.name}>
                          {service.name} <span style={{ color: "#888" }}>– Rs. {service.price}</span>
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
            {/* 👇 Add Stylist Gender Filter here */}
            <Form.Item label="Stylist Gender">
              <Radio.Group
                onChange={(e) => setSelectedGender(e.target.value)}
                defaultValue="Any"
              >
                <Radio value="Any">Any</Radio>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Existing stylist dropdown */}
            <Form.Item
              label="Preferred Stylist"
              name="stylistId"
              rules={[{ required: true, message: "Please select a stylist" }]}
            >
              <Select placeholder="Choose stylist" loading={loadingStylists}>
                {filteredStylists.map((stylist) => (
                  <Option key={stylist.id} value={stylist.id}>
                    {stylist.name} - {stylist.specialization}
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

          {selectedServices.length > 0 && (
            <div
              style={{
                textAlign: "right",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#3b3b98",
                marginBottom: "20px",
              }}
            >
              Total Price: Rs. {totalPrice.toLocaleString()}
            </div>
          )}

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
                    // onClick={() => {
                    // window.location.href = "/homepage";
                    // }}
                    onClick={handleCancel}
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
