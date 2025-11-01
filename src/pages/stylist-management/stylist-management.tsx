import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Radio, Row, Col, Typography, Space, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StylistHeader from "../../components/layout/header/stylist-header/StylistHeader";

const { Title } = Typography;

const StylistForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

//   const handleSubmit = async (values: any) => {
//     try {
//       setLoading(true);

//       // Prepare data for API
//       const stylistData = {
//         name: values.name,
//         specialization: values.specialization, // Array of strings
//         contactNumber: values.contactNumber,
//         email: values.email,
//         gender: values.gender,
//       };

//       const response = await axios.post("http://localhost:8080/api/v1/stylistData", stylistData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//     //   if (response.status === 200 || response.status === 201) {
//     //     message.success("Stylist added successfully!");
//     //     form.resetFields();
//     //   } else {
//     //     message.error("Failed to save stylist. Please try again.");
//     //   }

//     if (response.status === 200 || response.status === 201) {
//         message.success("Stylist added successfully!");
//         form.resetFields();

//         // ✅ Redirect to admin dashboard after success
//         setTimeout(() => {
//             navigate("/admin-dashboard");
//         }, 1000);
//     } else {
//         message.error("Failed to save stylist. Please try again.");
//     }

//     } catch (error: any) {
//       console.error("Error saving stylist:", error);
//       message.error("Something went wrong. Please check the console.");
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (values: any) => {
  try {
    setLoading(true);

    const stylistData = {
      name: values.name,
      specialization: values.specialization,
      contactNumber: values.contactNumber,
      email: values.email,
      gender: values.gender,
    };

    const response = await axios.post("http://localhost:8080/api/v1/stylistData", stylistData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200 || response.status === 201) {
      message.success("Stylist added successfully!");
      form.resetFields();

      // redirect
      setTimeout(() => navigate("/admin-dashboard"), 1000);
    } else {
      message.error("Failed to save stylist. Please try again.");
    }
  } catch (error: any) {
    console.error("Error saving stylist:", error);

    if (error.response && error.response.status === 409) {
      message.error("A stylist with this email or contact number already exists!");
    } else {
      message.error("Something went wrong. Please check the console.");
    }
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0.5px 30px 30px 30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      {/* <div style={{ padding: "60px 80px", background: "#fafafa", minHeight: "100vh" }}> */}
    <StylistHeader />
      <Title level={4} style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6eff" }}>
        Add New Stylist
      </Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter stylist name" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[{ required: true, message: "Please enter your contact number" }]}
        >
          <Input
            addonBefore="+94"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={9}
            onKeyPress={(event) => {
              if (!/^[0-9]$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Specializations"
          name="specialization"
          rules={[{ required: true, message: "Please select at least one specialization" }]}
        >
          <Checkbox.Group>
            <Row>
              <Col span={12}>
                <Checkbox value="All Services">All Services</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Hair Cutting">Hair Cutting</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Hair Coloring">Hair Coloring</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Makeup">Makeup</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Facial">Facial</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Pedicure">Pedicure</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Manicure">Manicure</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Dressing">Dressing</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Trending">Trending</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
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
              Save Stylist
            </Button>
            <Button
              size="large"
              style={{
                borderRadius: "8px",
                padding: "0 30px",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default StylistForm;
