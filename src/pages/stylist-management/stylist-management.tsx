// import React, { useState } from "react";
// import { Form, Input, Button, Checkbox, Radio, Row, Col, Typography, Space, message } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import StylistHeader from "../../components/layout/header/stylist-header/StylistHeader";

// const { Title } = Typography;

// const StylistForm: React.FC = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

// //   const handleSubmit = async (values: any) => {
// //     try {
// //       setLoading(true);

// //       // Prepare data for API
// //       const stylistData = {
// //         name: values.name,
// //         specialization: values.specialization, // Array of strings
// //         contactNumber: values.contactNumber,
// //         email: values.email,
// //         gender: values.gender,
// //       };

// //       const response = await axios.post("http://localhost:8080/api/v1/stylistData", stylistData, {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //     //   if (response.status === 200 || response.status === 201) {
// //     //     message.success("Stylist added successfully!");
// //     //     form.resetFields();
// //     //   } else {
// //     //     message.error("Failed to save stylist. Please try again.");
// //     //   }

// //     if (response.status === 200 || response.status === 201) {
// //         message.success("Stylist added successfully!");
// //         form.resetFields();

// //         // ✅ Redirect to admin dashboard after success
// //         setTimeout(() => {
// //             navigate("/admin-dashboard");
// //         }, 1000);
// //     } else {
// //         message.error("Failed to save stylist. Please try again.");
// //     }

// //     } catch (error: any) {
// //       console.error("Error saving stylist:", error);
// //       message.error("Something went wrong. Please check the console.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const handleSubmit = async (values: any) => {
//   try {
//     setLoading(true);

//     const stylistData = {
//       name: values.name,
//       specialization: values.specialization,
//       contactNumber: values.contactNumber,
//       email: values.email,
//       gender: values.gender,
//     };

//     const response = await axios.post("http://localhost:8080/api/v1/stylistData", stylistData, {
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.status === 200 || response.status === 201) {
//       message.success("Stylist added successfully!");
//       form.resetFields();

//       // redirect
//       setTimeout(() => navigate("/admin-dashboard"), 1000);
//     } else {
//       message.error("Failed to save stylist. Please try again.");
//     }
//   } catch (error: any) {
//     console.error("Error saving stylist:", error);

//     if (error.response && error.response.status === 409) {
//       message.error("A stylist with this email or contact number already exists!");
//     } else {
//       message.error("Something went wrong. Please check the console.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleCancel = () => {
//     form.resetFields();
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "40px auto",
//         padding: "0.5px 30px 30px 30px",
//         borderRadius: "12px",
//         boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
//       }}
//     >
//       {/* <div style={{ padding: "60px 80px", background: "#fafafa", minHeight: "100vh" }}> */}
//     <StylistHeader />
//       <Title level={4} style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6eff" }}>
//         Add New Stylist
//       </Title>

//       <Form form={form} layout="vertical" onFinish={handleSubmit}>
//         <Form.Item label="Name" name="name" rules={[{ required: true }]}>
//           <Input placeholder="Enter stylist name" />
//         </Form.Item>

//         <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
//           <Input placeholder="Enter email" />
//         </Form.Item>

//         <Form.Item
//           label="Contact Number"
//           name="contactNumber"
//           rules={[{ required: true, message: "Please enter your contact number" }]}
//         >
//           <Input
//             addonBefore="+94"
//             inputMode="numeric"
//             pattern="[0-9]*"
//             maxLength={9}
//             onKeyPress={(event) => {
//               if (!/^[0-9]$/.test(event.key)) {
//                 event.preventDefault();
//               }
//             }}
//             placeholder="Enter phone number"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Gender"
//           name="gender"
//           rules={[{ required: true, message: "Please select gender" }]}
//         >
//           <Radio.Group>
//             <Radio value="Male">Male</Radio>
//             <Radio value="Female">Female</Radio>
//           </Radio.Group>
//         </Form.Item>

//         <Form.Item
//           label="Specializations"
//           name="specialization"
//           rules={[{ required: true, message: "Please select at least one specialization" }]}
//         >
//           <Checkbox.Group>
//             <Row>
//               <Col span={12}>
//                 <Checkbox value="All Services">All Services</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Hair Cutting">Hair Cutting</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Hair Coloring">Hair Coloring</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Makeup">Makeup</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Facial">Facial</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Pedicure">Pedicure</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Manicure">Manicure</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Dressing">Dressing</Checkbox>
//               </Col>
//               <Col span={12}>
//                 <Checkbox value="Trending">Trending</Checkbox>
//               </Col>
//             </Row>
//           </Checkbox.Group>
//         </Form.Item>

//         <div style={{ textAlign: "center", marginTop: "30px" }}>
//           <Space size="large">
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               size="large"
//               style={{
//                 backgroundColor: "#7e57c2",
//                 borderColor: "#7e57c2",
//                 borderRadius: "8px",
//                 padding: "0 30px",
//               }}
//             >
//               Save Stylist
//             </Button>
//             <Button
//               size="large"
//               style={{
//                 borderRadius: "8px",
//                 padding: "0 30px",
//               }}
//               onClick={handleCancel}
//             >
//               Cancel
//             </Button>
//           </Space>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default StylistForm;

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Row,
  Col,
  Typography,
  Space,
  message,
  Table,
  Popconfirm,
  Tooltip,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import StylistHeader from "../../components/layout/header/stylist-header/StylistHeader";

const { Title } = Typography;

const StylistForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [stylists, setStylists] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch stylists for table
  const fetchStylists = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get("http://localhost:8080/api/v1/stylistData");
      const data = Array.isArray(response.data.Data) ? response.data.Data : response.data;
      setStylists(data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      message.error("Failed to load stylist data.");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  // ✅ Delete stylist
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/stylistData?id=${id}`);
      message.success("Stylist deleted successfully!");
      fetchStylists(); // refresh table
    } catch (error) {
      console.error("Error deleting stylist:", error);
      message.error("Failed to delete stylist.");
    }
  };

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
        fetchStylists(); // ✅ refresh table immediately
        // setTimeout(() => navigate("stylist-management"), 2000);
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

  // ✅ Columns for stylist table (with sorting + delete)
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) =>
        (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) =>
        (a.email || "").toLowerCase().localeCompare((b.email || "").toLowerCase()),
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
      sorter: (a: any, b: any) =>
        (a.contactNumber || "").toString().localeCompare((b.contactNumber || "").toString()),
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      sorter: (a: any, b: any) =>
        (a.specialization || "").toLowerCase().localeCompare((b.specialization || "").toLowerCase()),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: any, b: any) =>
        (a.gender || "").toLowerCase().localeCompare((b.gender || "").toLowerCase()),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Are you sure you want to delete this stylist?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record.id)}
        >
          <Tooltip title="Delete Stylist">
            <DeleteOutlined style={{ color: "red", fontSize: 18, cursor: "pointer" }} />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <StylistHeader />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "40px",
          padding: "40px 80px",
        }}
      >
        {/* ✅ Left side - Add Stylist Form */}
        <div
          style={{
            flex: 1,
            maxWidth: "500px",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Title
            level={4}
            style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6eff" }}
          >
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
                  <Col span={12}><Checkbox value="All Services">All Services</Checkbox></Col>
                  <Col span={12}><Checkbox value="Hair Cutting">Hair Cutting</Checkbox></Col>
                  <Col span={12}><Checkbox value="Hair Coloring">Hair Coloring</Checkbox></Col>
                  <Col span={12}><Checkbox value="Makeup">Makeup</Checkbox></Col>
                  <Col span={12}><Checkbox value="Facial">Facial</Checkbox></Col>
                  <Col span={12}><Checkbox value="Pedicure">Pedicure</Checkbox></Col>
                  <Col span={12}><Checkbox value="Manicure">Manicure</Checkbox></Col>
                  <Col span={12}><Checkbox value="Dressing">Dressing</Checkbox></Col>
                  <Col span={12}><Checkbox value="Trending">Trending</Checkbox></Col>
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

        {/* ✅ Right side - Stylist Table */}
        <div style={{ flex: 1.5 }}>
          <Title level={4} style={{ marginBottom: "20px" }}>
            Stylist List
          </Title>

          <Table
            columns={columns}
            dataSource={stylists}
            rowKey="id"
            loading={tableLoading}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
};

export default StylistForm;

