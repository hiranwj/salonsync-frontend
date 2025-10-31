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

    // useEffect(() => {
    //   let filtered = allStylists;

    //   if (selectedServices.length > 0) {
    //     filtered = filtered.filter(
    //       (stylist) =>
    //         selectedServices.includes(stylist.specialization) ||
    //         stylist.specialization.toLowerCase() === "All Services"
    //     );
    //   }

    //   if (selectedGender) {
    //     filtered = filtered.filter((stylist) => stylist.gender === selectedGender);
    //   }

    //   setFilteredStylists(filtered);
    // }, [selectedServices, selectedGender, allStylists]);

    useEffect(() => {
  let filtered = Array.isArray(allStylists) ? [...allStylists] : [];

  if (selectedServices.length > 0) {
    filtered = filtered.filter((stylist) => {
      const specialization = String(stylist?.specialization || "").toLowerCase();
      return (
        selectedServices.some(
          (service) =>
            service.toLowerCase() === specialization ||
            specialization === "all"
        )
      );
    });
  }

  if (selectedGender && selectedGender !== "Any") {
    filtered = filtered.filter(
      (stylist) =>
        stylist?.gender &&
        stylist.gender.toLowerCase() === selectedGender.toLowerCase()
    );
  }

  if (selectedServices.length === 0 && (!selectedGender || selectedGender === "Any")) {
    filtered = [...allStylists];
  }

  setFilteredStylists(filtered);
}, [selectedServices, selectedGender, allStylists]);


    // useEffect(() => {
    //   let filtered = allStylists;

    //   // Filter by service specialization first
    //   if (selectedServices.length > 0) {
    //     filtered = filtered.filter(
    //       (stylist) =>
    //         selectedServices.includes(stylist.specialization) ||
    //         stylist.specialization.toLowerCase() === "All Services"
    //     );
    //   }

    //   // Then filter by gender (ignore if "Any")
    //   if (selectedGender && selectedGender !== "Any") {
    //     filtered = filtered.filter((stylist) => stylist.gender === selectedGender);
    //   }

    //   setFilteredStylists(filtered);
    // }, [selectedServices, selectedGender, allStylists]);

    useEffect(() => {
      let filtered = allStylists;

      if (selectedServices.length > 0) {
        filtered = filtered.filter((stylist) => {
          const specialization =
            typeof stylist.specialization === "string"
              ? stylist.specialization.toLowerCase()
              : "";

          // Match selected service OR "All" specialization
          return (
            selectedServices.includes(stylist.specialization) ||
            specialization === "all"
          );
        });
      }

      // Filter by gender (ignore "Any")
      if (selectedGender && selectedGender !== "Any") {
        filtered = filtered.filter((stylist) => stylist.gender === selectedGender);
      }

      setFilteredStylists(filtered);
    }, [selectedServices, selectedGender, allStylists]);


    // ✅ Safe stylist filtering
    useEffect(() => {
      // Always start from full stylist list
      let filtered = Array.isArray(allStylists) ? [...allStylists] : [];

      // Filter by selected services (if any)
      if (selectedServices.length > 0) {
        filtered = filtered.filter((stylist) => {
          const specialization = String(stylist?.specialization || "").toLowerCase();
          // Match any selected service or "All" specialization
          return (
            selectedServices.some(
              (service) =>
                service.toLowerCase() === specialization ||
                specialization === "all"
            )
          );
        });
      }

      // Filter by gender (ignore "Any")
      if (selectedGender && selectedGender !== "Any") {
        filtered = filtered.filter(
          (stylist) =>
            stylist?.gender &&
            stylist.gender.toLowerCase() === selectedGender.toLowerCase()
        );
      }

      // ✅ If no filters, show all stylists
      if (selectedServices.length === 0 && (!selectedGender || selectedGender === "Any")) {
        filtered = [...allStylists];
      }

      setFilteredStylists(filtered);
    }, [selectedServices, selectedGender, allStylists]);



    // useEffect(() => {
    //     const fetchStylists = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8080/api/v1/stylistData");
    //             // setStylists(response.data);
    //             // Access the 'Data' property from the response
    //             setStylists(Array.isArray(response.data.Data) ? response.data.Data : []);
    //         } catch (error) {
    //             console.error("Error fetching stylists:", error);
    //             message.error("Failed to load stylists");
    //         } finally {
    //             setLoadingStylists(false);
    //         }
    //     };
    //     fetchStylists();
    // }, []);

    useEffect(() => {
  const fetchStylists = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/stylistData");
      const stylistsData = Array.isArray(response.data.Data) ? response.data.Data : [];
      
      setAllStylists(stylistsData);
      setFilteredStylists(stylistsData); // initial load shows all
    } catch (error) {
      console.error("Error fetching stylists:", error);
      message.error("Failed to load stylists");
    } finally {
      setLoadingStylists(false);
    }
  };
  fetchStylists();
}, []);


    // useEffect(() => {
    //   const fetchStylists = async () => {
    //     try {
    //       const response = await axios.get("http://localhost:8080/api/v1/stylistData");
    //       const stylistsData = Array.isArray(response.data.Data) ? response.data.Data : [];
    //       setAllStylists(stylistsData);
    //       setFilteredStylists(stylistsData);
    //     } catch (error) {
    //       console.error("Error fetching stylists:", error);
    //       message.error("Failed to load stylists");
    //     } finally {
    //       setLoadingStylists(false);
    //     }
    //   };
    //   fetchStylists();
    // }, []);


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
            // serviceType: values.serviceType,
            serviceType: selectedServices, // <-- now array
            stylistGender: selectedGender, // <-- new field
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
              {/* <Form.Item
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
              </Form.Item> */}
              <Form.Item
                label="Select Services"
                name="serviceType"
                rules={[{ required: true, message: "Please select at least one service" }]}
              >
                <Checkbox.Group
                  style={{ width: "100%" }}
                  value={selectedServices}
                  onChange={(checkedValues) => {
                    const selected = checkedValues as string[];
                    setSelectedServices(selected);

                    // Calculate total price
                    const total = serviceOptions
                      .filter((service) => selected.includes(service.name))
                      .reduce((sum, service) => sum + service.price, 0);
                    setTotalPrice(total);

                    // ✅ Update form field manually to keep sync
                    form.setFieldsValue({ serviceType: selected });
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

// --  last

// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Checkbox,
//   Radio,
//   Select,
//   DatePicker,
//   TimePicker,
//   Button,
//   Card,
//   Row,
//   Col,
//   message,
//   notification,
//   Space,
// } from "antd";
// import {
//   CalendarOutlined,
//   UserOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
// import AppointmentHeader from "../../components/layout/header/appointment-header/AppointmentHeader";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import axios from "axios";
// import { appointment } from "../../service/appointment-management-service";
// import type { AppointmentModel } from "../../models/appointment-model";
// import { displayErrorMessage } from "../../utill/display-error-message";

// const { Option } = Select;

// const BookAppointment: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [allStylists, setAllStylists] = useState<
//     { id: number; name: string; specialization: string; gender: string }[]
//   >([]);
//   const [filteredStylists, setFilteredStylists] = useState<
//     { id: number; name: string; specialization: string; gender: string }[]
//   >([]);
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [selectedGender, setSelectedGender] = useState<string>("Any");
//   const [loadingStylists, setLoadingStylists] = useState(true);
//   const [isPrefilled, setIsPrefilled] = useState(false);
//   const [form] = Form.useForm();

//   // ✅ Fetch and normalize stylists once
//   // useEffect(() => {
//   //   const fetchStylists = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:8080/api/v1/stylistData");
//   //       const stylistsData = Array.isArray(response.data.Data)
//   //         ? response.data.Data
//   //         : [];

//   //       // Normalize stylist data
//   //       const normalized = stylistsData.map((s: any) => ({
//   //         id: s.id,
//   //         name: s.name ?? "Unknown",
//   //         specialization:
//   //           typeof s.specialization === "string" && s.specialization.trim() !== ""
//   //             ? s.specialization
//   //             : "All Services",
//   //         gender: typeof s.gender === "string" ? s.gender : "Any",
//   //       }));

//   //       setAllStylists(normalized);
//   //       setFilteredStylists(normalized);
//   //     } catch (error) {
//   //       console.error("Error fetching stylists:", error);
//   //       message.error("Failed to load stylists");
//   //     } finally {
//   //       setLoadingStylists(false);
//   //     }
//   //   };
//   //   fetchStylists();
//   // }, []);
//   // ✅ Fetch and normalize stylists once
//   useEffect(() => {
//     const fetchStylists = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/v1/stylistData");

//         // handle backend structures like { Data: [...] } or direct array
//         const stylistsData =
//           Array.isArray(response.data.Data) && response.data.Data.length > 0
//             ? response.data.Data
//             : Array.isArray(response.data)
//             ? response.data
//             : [];

//         // Normalize stylist data correctly
//         const normalized = stylistsData.map((s: any) => ({
//           id: s.id,
//           name: s.name?.trim() || "Unknown",
//           specialization:
//             typeof s.specialization === "string" && s.specialization.trim() !== ""
//               ? s.specialization
//               : "All Services",
//           gender: s.gender?.trim() || "Any",
//         }));

//         setAllStylists(normalized);
//         setFilteredStylists(normalized);
//       } catch (error) {
//         console.error("Error fetching stylists:", error);
//         message.error("Failed to load stylists");
//       } finally {
//         setLoadingStylists(false);
//       }
//     };
//     fetchStylists();
//   }, []);


//   // ✅ Filter stylists dynamically
//   // useEffect(() => {
//   //   let filtered = allStylists;

//   //   // Filter by service
//   //   if (selectedServices.length > 0) {
//   //     filtered = filtered.filter((stylist) => {
//   //       const spec =
//   //         typeof stylist.specialization === "string"
//   //           ? stylist.specialization.toLowerCase()
//   //           : "";
//   //       return (
//   //         selectedServices.includes(stylist.specialization) ||
//   //         spec === "all" ||
//   //         spec === "all services"
//   //       );
//   //     });
//   //   }

//   //   // Filter by gender (ignore "Any")
//   //   if (selectedGender && selectedGender !== "Any") {
//   //     filtered = filtered.filter(
//   //       (stylist) => String(stylist.gender) === selectedGender
//   //     );
//   //   }

//   //   setFilteredStylists(filtered);
//   // }, [selectedServices, selectedGender, allStylists]);

//   useEffect(() => {
//     let filtered = allStylists;

//     // Filter by selected service
//     if (selectedServices.length > 0) {
//       filtered = filtered.filter((stylist) => {
//         const spec = stylist.specialization.toLowerCase();
//         return (
//           selectedServices.some((s) =>
//             spec.split(",").some((specItem) =>
//               specItem.trim().includes(s.toLowerCase())
//             )
//           ) ||
//           spec === "all services"
//         );
//       });
//     }

//     // Filter by gender (ignore "Any")
//     if (selectedGender && selectedGender !== "Any") {
//       filtered = filtered.filter(
//         (stylist) => stylist.gender === selectedGender
//       );
//     }

//     setFilteredStylists(filtered);
//   }, [selectedServices, selectedGender, allStylists]);


//   // ✅ Prefill form from localStorage
//   useEffect(() => {
//     const storedName = localStorage.getItem("name");
//     const storedContact = localStorage.getItem("contactNumber");

//     if (storedName || storedContact) {
//       form.setFieldsValue({
//         customerName: storedName || "",
//         contactNumber: storedContact || "",
//       });
//       setIsPrefilled(true);
//     }
//   }, [form]);

//   // ✅ Handle form submit
//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const formattedDate = dayjs(values.appointmentDate).format("YYYY-MM-DD");
//       const formattedTime = dayjs(values.appointmentTime).format("HH:mm");

//       const reqBody: AppointmentModel = {
//         customerName: values.customerName,
//         contactNumber: values.contactNumber,
//         serviceType: selectedServices,
//         stylistGender: selectedGender,
//         appointmentDate: formattedDate,
//         appointmentTime: formattedTime,
//         note: values.notes,
//         stylistId: values.stylistId,
//         createdBy: values.createdBy,
//       };

//       const response = await appointment(reqBody);

//       if (response?.Message?.includes("Appointment booked successfully.")) {
//         notification.success({
//           message: "Appointment Successful",
//           description: "Your appointment has been booked successfully.",
//         });
//         navigate("/book-an-apointment");
//       } else {
//         displayErrorMessage("Appointment Failed", "Invalid data");
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         displayErrorMessage(
//           "Appointment Failed",
//           error.response?.data?.Message || ""
//         );
//       } else {
//         displayErrorMessage("Appointment Failed", "Unexpected error occurred.");
//       }
//       console.error("Appointment error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Cancel button
//   const handleCancel = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("name");
//     localStorage.removeItem("contactNumber");
//     window.location.href = "/homepage";
//   };

//   // ✅ Service options
//   const serviceOptions = [
//     { name: "Hair Cutting", price: 1000 },
//     { name: "Bridal Hair", price: 5000 },
//     { name: "Facial", price: 2500 },
//     { name: "Makeup", price: 4000 },
//     { name: "Pedicure", price: 1500 },
//     { name: "Manicure", price: 1200 },
//     { name: "Dressing", price: 2000 },
//     { name: "Trending", price: 3000 },
//   ];

//   return (
//     <div style={{ padding: "60px 80px", background: "#fafafa", minHeight: "100vh" }}>
//       <AppointmentHeader />
//       <Card
//         title={
//           <div style={{ textAlign: "center" }}>
//             <h3 style={{ color: "#3b3b98" }}>Book Your Appointment</h3>
//             <p style={{ color: "#666" }}>
//               Choose your preferred stylist, service, date, and time
//             </p>
//           </div>
//         }
//         style={{
//           maxWidth: 800,
//           margin: "0 auto",
//           boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//           borderRadius: "12px",
//         }}
//       >
//         <Form
//           layout="vertical"
//           form={form}
//           onFinish={onFinish}
//           autoComplete="off"
//           initialValues={{ serviceType: [] }}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Full Name"
//                 name="customerName"
//                 rules={[{ required: true, message: "Please enter your full name" }]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Enter your name"
//                   disabled={isPrefilled}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Contact Number"
//                 name="contactNumber"
//                 rules={[{ required: true, message: "Please enter your contact number" }]}
//               >
//                 <Input
//                   addonBefore="+94"
//                   inputMode="numeric"
//                   pattern="[0-9]*"
//                   maxLength={9}
//                   onKeyPress={(event) => {
//                     if (!/^[0-9]$/.test(event.key)) event.preventDefault();
//                   }}
//                   disabled={isPrefilled}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Select Services"
//                 name="serviceType"
//                 rules={[{ required: true, message: "Please select at least one service" }]}
//               >
//                 <Checkbox.Group
//                   style={{ width: "100%" }}
//                   value={selectedServices}
//                   onChange={(checkedValues) => {
//                     const selected = checkedValues as string[];
//                     setSelectedServices(selected);

//                     const total = serviceOptions
//                       .filter((service) => selected.includes(service.name))
//                       .reduce((sum, service) => sum + service.price, 0);
//                     setTotalPrice(total);

//                     form.setFieldsValue({ serviceType: selected });
//                   }}
//                 >
//                   <Row gutter={[16, 8]}>
//                     {serviceOptions.map((service, index) => (
//                       <Col span={12} key={index}>
//                         <Checkbox value={service.name}>
//                           {service.name}{" "}
//                           <span style={{ color: "#888" }}>– Rs. {service.price}</span>
//                         </Checkbox>
//                       </Col>
//                     ))}
//                   </Row>
//                 </Checkbox.Group>
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Stylist Gender">
//                 <Radio.Group
//                   onChange={(e) => setSelectedGender(e.target.value)}
//                   defaultValue="Any"
//                 >
//                   <Radio value="Any">Any</Radio>
//                   <Radio value="Male">Male</Radio>
//                   <Radio value="Female">Female</Radio>
//                 </Radio.Group>
//               </Form.Item>

//               {/* <Form.Item
//                 label="Preferred Stylist"
//                 name="stylistId"
//                 rules={[{ required: true, message: "Please select a stylist" }]}
//               >
//                 <Select placeholder="Choose stylist" loading={loadingStylists}>
//                   {filteredStylists.map((stylist) => (
//                     <Option key={stylist.id} value={stylist.id}>
//                       {stylist.name} - {stylist.specialization}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item> */}

//               <Form.Item
//                 label="Preferred Stylist"
//                 name="stylistId"
//                 rules={[{ required: true, message: "Please select a stylist" }]}
//               >
//                 <Select placeholder="Choose stylist" loading={loadingStylists}>
//                   {filteredStylists.map((stylist) => (
//                     <Option key={stylist.id} value={stylist.id}>
//                       {stylist.name} - {stylist.specialization}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Appointment Date"
//                 name="appointmentDate"
//                 rules={[{ required: true, message: "Please select a date" }]}
//               >
//                 <DatePicker
//                   style={{ width: "100%" }}
//                   suffixIcon={<CalendarOutlined />}
//                   disabledDate={(current) => current && current < dayjs().startOf("day")}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Appointment Time"
//                 name="appointmentTime"
//                 rules={[{ required: true, message: "Please select a time" }]}
//               >
//                 <TimePicker
//                   style={{ width: "100%" }}
//                   suffixIcon={<ClockCircleOutlined />}
//                   format="HH:mm"
//                   minuteStep={30}
//                   use12Hours={false}
//                   disabledHours={() => {
//                     const disabled: number[] = [];
//                     for (let i = 0; i < 24; i++) {
//                       if (i < 8 || i > 18) disabled.push(i);
//                     }
//                     return disabled;
//                   }}
//                   disabledMinutes={() => {
//                     const disabled: number[] = [];
//                     for (let i = 0; i < 60; i++) {
//                       if (i !== 0 && i !== 30) disabled.push(i);
//                     }
//                     return disabled;
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item label="Additional Notes" name="notes">
//             <Input.TextArea rows={3} placeholder="Write any special requests..." />
//           </Form.Item>

//           {selectedServices.length > 0 && (
//             <div
//               style={{
//                 textAlign: "right",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 color: "#3b3b98",
//                 marginBottom: "20px",
//               }}
//             >
//               Total Price: Rs. {totalPrice.toLocaleString()}
//             </div>
//           )}

//           <div style={{ textAlign: "center", marginTop: "30px" }}>
//             <Space size="large">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 size="large"
//                 style={{
//                   backgroundColor: "#7e57c2",
//                   borderColor: "#7e57c2",
//                   borderRadius: "8px",
//                   padding: "0 30px",
//                 }}
//               >
//                 Confirm Booking
//               </Button>
//               <Button
//                 size="large"
//                 style={{
//                   borderRadius: "8px",
//                   padding: "0 30px",
//                 }}
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default BookAppointment;

// -- last


// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Checkbox,
//   Radio,
//   Select,
//   DatePicker,
//   TimePicker,
//   Button,
//   Card,
//   Row,
//   Col,
//   message,
//   notification,
//   Space,
// } from "antd";
// import { CalendarOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
// import AppointmentHeader from "../../components/layout/header/appointment-header/AppointmentHeader";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import axios from "axios";
// import { appointment } from "../../service/appointment-management-service";
// import type { AppointmentModel } from "../../models/appointment-model";
// import { displayErrorMessage } from "../../utill/display-error-message";

// const { Option } = Select;

// const BookAppointment: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [allStylists, setAllStylists] = useState<
//     {
//       id: number;
//       name: string;
//       specializationRaw: string; // original DB string
//       displaySpecialization: string; // "Hair Cutting - Makeup", or "All Services"
//       specTokens: string[]; // normalized tokens for filtering (no spaces, lowercased)
//       gender: string;
//     }[]
//   >([]);
//   const [filteredStylists, setFilteredStylists] = useState<typeof allStylists>([]);
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [selectedGender, setSelectedGender] = useState<string>("Any");
//   const [loadingStylists, setLoadingStylists] = useState(true);
//   const [isPrefilled, setIsPrefilled] = useState(false);
//   const [form] = Form.useForm();

//   // helper: normalize a token (remove spaces, toLowerCase)
//   const normalize = (s: string) => s.replace(/\s+/g, "").toLowerCase();

//   // fetch & normalize stylists
//   useEffect(() => {
//     const fetchStylists = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/v1/stylistData");
//         const stylistsData = Array.isArray(response.data.Data) ? response.data.Data : [];

//         const normalized = stylistsData.map((s: any) => {
//           const raw = typeof s.specialization === "string" ? s.specialization.trim() : "All Services";

//           // If DB uses commas to separate => split; else keep as single token.
//           // DB sample uses commas (no spaces) for multiple specializations.
//           const parts = raw.split(",").map((p: string) => p.trim()).filter(Boolean);

//           // displaySpecialization: join with " - " when multiple
//           const displaySpecialization = parts.length > 1 ? parts.join(" - ") : parts[0] || "All Services";

//           // specTokens: normalized tokens for robust matching (remove spaces + lowercase)
//           const specTokens = parts.map((p: string) => normalize(p));

//           return {
//             id: s.id,
//             name: s.name ?? "Unknown",
//             specializationRaw: raw,
//             displaySpecialization,
//             specTokens,
//             gender: typeof s.gender === "string" ? s.gender : "Any",
//           };
//         });

//         setAllStylists(normalized);
//         setFilteredStylists(normalized);
//       } catch (error) {
//         console.error("Error fetching stylists:", error);
//         message.error("Failed to load stylists");
//       } finally {
//         setLoadingStylists(false);
//       }
//     };

//     fetchStylists();
//   }, []);

//   // filter stylists by selected services & gender
//   useEffect(() => {
//     let filtered = allStylists;

//     if (selectedServices.length > 0) {
//       filtered = filtered.filter((stylist) => {
//         const raw = stylist.specializationRaw || "";
//         const rawLower = String(raw).toLowerCase();

//         // wildcard: All Services should match any selected service
//         if (rawLower === "all services" || rawLower === "all") return true;

//         // normalized selected services for comparison (remove spaces + lowercase)
//         const selectedNorm = selectedServices.map((s) => normalize(s));

//         // match if any selected service matches any of the stylist tokens
//         return selectedNorm.some((sel) =>
//           stylist.specTokens.some((tok) => tok.includes(sel) || sel.includes(tok))
//         );
//       });
//     }

//     if (selectedGender && selectedGender !== "Any") {
//       filtered = filtered.filter((stylist) => String(stylist.gender) === selectedGender);
//     }

//     setFilteredStylists(filtered);
//   }, [selectedServices, selectedGender, allStylists]);

//   // prefill name/contact if in localStorage
//   useEffect(() => {
//     const storedName = localStorage.getItem("name");
//     const storedContact = localStorage.getItem("contactNumber");

//     if (storedName || storedContact) {
//       form.setFieldsValue({
//         customerName: storedName || "",
//         contactNumber: storedContact || "",
//       });
//       setIsPrefilled(true);
//     }
//   }, [form]);

//   // submit handler
//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const formattedDate = dayjs(values.appointmentDate).format("YYYY-MM-DD");
//       const formattedTime = dayjs(values.appointmentTime).format("HH:mm");

//       const reqBody: AppointmentModel = {
//         customerName: values.customerName,
//         contactNumber: values.contactNumber,
//         serviceType: selectedServices,
//         stylistGender: selectedGender,
//         appointmentDate: formattedDate,
//         appointmentTime: formattedTime,
//         note: values.notes,
//         stylistId: values.stylistId,
//         createdBy: values.createdBy,
//       };

//       const response = await appointment(reqBody);

//       if (response?.Message?.includes("Appointment booked successfully.")) {
//         notification.success({
//           message: "Appointment Successful",
//           description: "Your appointment has been booked successfully.",
//         });
//         navigate("/book-an-apointment");
//       } else {
//         displayErrorMessage("Appointment Failed", "Invalid data");
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         displayErrorMessage("Appointment Failed", error.response?.data?.Message || "");
//       } else {
//         displayErrorMessage("Appointment Failed", "Unexpected error occurred.");
//       }
//       console.error("Appointment error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("name");
//     localStorage.removeItem("contactNumber");
//     window.location.href = "/homepage";
//   };

//   const serviceOptions = [
//     { name: "Hair Cutting", price: 1000 },
//     { name: "Bridal Hair", price: 5000 },
//     { name: "Facial", price: 2500 },
//     { name: "Makeup", price: 4000 },
//     { name: "Pedicure", price: 1500 },
//     { name: "Manicure", price: 1200 },
//     { name: "Dressing", price: 2000 },
//     { name: "Trending", price: 3000 },
//     // If DB uses "Haircut" vs "Hair Cutting" you can add alternate names here if you want exact matches
//   ];

//   return (
//     <div style={{ padding: "60px 80px", background: "#fafafa", minHeight: "100vh" }}>
//       <AppointmentHeader />
//       <Card
//         title={
//           <div style={{ textAlign: "center" }}>
//             <h3 style={{ color: "#3b3b98" }}>Book Your Appointment</h3>
//             <p style={{ color: "#666" }}>Choose your preferred stylist, service, date, and time</p>
//           </div>
//         }
//         style={{
//           maxWidth: 800,
//           margin: "0 auto",
//           boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//           borderRadius: "12px",
//         }}
//       >
//         <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off" initialValues={{ serviceType: [] }}>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Full Name" name="customerName" rules={[{ required: true, message: "Please enter your full name" }]}>
//                 <Input prefix={<UserOutlined />} placeholder="Enter your name" disabled={isPrefilled} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true, message: "Please enter your contact number" }]}>
//                 <Input
//                   addonBefore="+94"
//                   inputMode="numeric"
//                   pattern="[0-9]*"
//                   maxLength={9}
//                   onKeyPress={(event) => {
//                     if (!/^[0-9]$/.test(event.key)) event.preventDefault();
//                   }}
//                   disabled={isPrefilled}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Select Services" name="serviceType" rules={[{ required: true, message: "Please select at least one service" }]}>
//                 <Checkbox.Group
//                   style={{ width: "100%" }}
//                   value={selectedServices}
//                   onChange={(checkedValues) => {
//                     const selected = checkedValues as string[];
//                     setSelectedServices(selected);

//                     const total = serviceOptions
//                       .filter((service) => selected.includes(service.name))
//                       .reduce((sum, service) => sum + service.price, 0);
//                     setTotalPrice(total);

//                     form.setFieldsValue({ serviceType: selected });
//                   }}
//                 >
//                   <Row gutter={[16, 8]}>
//                     {serviceOptions.map((service, index) => (
//                       <Col span={12} key={index}>
//                         <Checkbox value={service.name}>
//                           {service.name} <span style={{ color: "#888" }}>– Rs. {service.price}</span>
//                         </Checkbox>
//                       </Col>
//                     ))}
//                   </Row>
//                 </Checkbox.Group>
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item label="Stylist Gender">
//                 <Radio.Group onChange={(e) => setSelectedGender(e.target.value)} defaultValue="Any">
//                   <Radio value="Any">Any</Radio>
//                   <Radio value="Male">Male</Radio>
//                   <Radio value="Female">Female</Radio>
//                 </Radio.Group>
//               </Form.Item>

//               <Form.Item label="Preferred Stylist" name="stylistId" rules={[{ required: true, message: "Please select a stylist" }]}>
//                 <Select placeholder="Choose stylist" loading={loadingStylists}>
//                   {filteredStylists.map((stylist) => (
//                     <Option key={stylist.id} value={stylist.id}>
//                       {stylist.name}
//                       {stylist.displaySpecialization ? ` - ${stylist.displaySpecialization}` : ""}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Appointment Date" name="appointmentDate" rules={[{ required: true, message: "Please select a date" }]}>
//                 <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} disabledDate={(current) => current && current < dayjs().startOf("day")} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Appointment Time" name="appointmentTime" rules={[{ required: true, message: "Please select a time" }]}>
//                 <TimePicker
//                   style={{ width: "100%" }}
//                   suffixIcon={<ClockCircleOutlined />}
//                   format="HH:mm"
//                   minuteStep={30}
//                   use12Hours={false}
//                   disabledHours={() => {
//                     const disabled: number[] = [];
//                     for (let i = 0; i < 24; i++) {
//                       if (i < 8 || i > 18) disabled.push(i);
//                     }
//                     return disabled;
//                   }}
//                   disabledMinutes={() => {
//                     const disabled: number[] = [];
//                     for (let i = 0; i < 60; i++) {
//                       if (i !== 0 && i !== 30) disabled.push(i);
//                     }
//                     return disabled;
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item label="Additional Notes" name="notes">
//             <Input.TextArea rows={3} placeholder="Write any special requests..." />
//           </Form.Item>

//           {selectedServices.length > 0 && (
//             <div style={{ textAlign: "right", fontSize: "16px", fontWeight: "bold", color: "#3b3b98", marginBottom: "20px" }}>
//               Total Price: Rs. {totalPrice.toLocaleString()}
//             </div>
//           )}

//           <div style={{ textAlign: "center", marginTop: "30px" }}>
//             <Space size="large">
//               <Button type="primary" htmlType="submit" loading={loading} size="large" style={{ backgroundColor: "#7e57c2", borderColor: "#7e57c2", borderRadius: "8px", padding: "0 30px" }}>
//                 Confirm Booking
//               </Button>
//               <Button size="large" style={{ borderRadius: "8px", padding: "0 30px" }} onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default BookAppointment;
