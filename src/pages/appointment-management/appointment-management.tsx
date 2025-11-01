// import React, { useEffect, useState } from "react";
// import { Table, Tag, Button, Select, message, Typography, Space, Card } from "antd";
// import axios from "axios";
// import AppointmentHeader from "../../components/layout/header/appointment-header/AppointmentHeader";
// import StylistHeader from "../../components/layout/header/stylist-header/StylistHeader";

// const { Title } = Typography;
// const { Option } = Select;

// interface Appointment {
//   id: number;
//   appointment_date: string;
//   appointment_time: string;
//   contact_number: string;
//   customer_name: string;
//   service_type: string;
//   status: string | null;
//   stylist_id: number;
//   stylist_gender: string | null;
//   note: string | null;
// }

// const AppointmentManagement: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all appointments
//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/api/v1/appointmentData");
//       const data = Array.isArray(response.data.Data)
//         ? response.data.Data
//         : response.data;
//       setAppointments(data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//       message.error("Failed to load appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   // Update appointment status
//   const handleStatusChange = async (id: number, newStatus: string) => {
//     try {
//     //   await axios.put(`http://localhost:8080/api/v1/appointment?id=${id}`, {
//         await axios.put(`http://localhost:8080/api/v1/appointment?id=1`, {
//         status: newStatus,
//       });

//       message.success(`Status updated to "${newStatus}"`);
//       setAppointments((prev) =>
//         prev.map((appt) =>
//           appt.id === id ? { ...appt, status: newStatus } : appt
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//       message.error("Failed to update status.");
//     }
//   };

//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "appointment_date",
//       key: "date",
//     },
//     {
//       title: "Time",
//       dataIndex: "appointment_time",
//       key: "time",
//     },
//     {
//       title: "Customer",
//       dataIndex: "customer_name",
//       key: "customer_name",
//     },
//     {
//       title: "Contact",
//       dataIndex: "contact_number",
//       key: "contact_number",
//     },
//     {
//       title: "Service Type",
//       dataIndex: "service_type",
//       key: "service_type",
//     },
//     {
//       title: "Stylist ID",
//       dataIndex: "stylist_id",
//       key: "stylist_id",
//     },
//     {
//       title: "Gender",
//       dataIndex: "stylist_gender",
//       key: "stylist_gender",
//       render: (gender: string | null) => gender || "-",
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (_: any, record: Appointment) => (
//         <Select
//           value={record.status || "pending"}
//           onChange={(value) => handleStatusChange(record.id, value)}
//           style={{ width: 130 }}
//         >
//           <Option value="pending">Pending</Option>
//           <Option value="confirmed">Confirmed</Option>
//           <Option value="completed">Completed</Option>
//           <Option value="cancelled">Cancelled</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Note",
//       dataIndex: "note",
//       key: "note",
//       render: (note: string | null) => note || "-",
//     },
//   ];

//   return (
//     <div
//       style={{
//         padding: "30px",
//         backgroundColor: "#fafafa",
//         minHeight: "100vh",
//       }}
//     >
//       <StylistHeader/>
//       <Card
//         style={{
//           maxWidth: "1100px",
//           margin: "40px auto",
//           borderRadius: "12px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Title level={4} style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6e" }}>
//           Appointment Management
//         </Title>

//         <Table
//           dataSource={appointments}
//           columns={columns}
//           rowKey="id"
//           bordered
//           loading={loading}
//           pagination={{ pageSize: 8 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default AppointmentManagement;

// --

// import React, { useEffect, useState } from "react";
// import { Table, Select, message, Typography, Card } from "antd";
// import axios from "axios";
// import StylistHeader from "../../components/layout/header/stylist-header/StylistHeader";

// const { Title } = Typography;
// const { Option } = Select;

// interface Appointment {
//   id: number;
//   customerName: string;
//   contactNumber: string;
//   serviceType: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   stylistId: number;
//   createdBy: number | null;
//   createdAt: number;
//   status?: string | null; // optional if not coming from backend yet
// }

// const AppointmentManagement: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch appointments from your provided API
//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/api/v1/appointments");

//       if (response.data && Array.isArray(response.data.Data)) {
//         setAppointments(response.data.Data);
//       } else {
//         message.warning("No appointment data found.");
//       }
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//       message.error("Failed to load appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   // ✅ Update status
//   const handleStatusChange = async (id: number, newStatus: string) => {
//     try {
//       await axios.put(`http://localhost:8080/api/v1/appointment?id=${id}`, {
//         status: newStatus,
//       });

//       message.success(`Status updated to "${newStatus}"`);

//       // Update table locally
//       setAppointments((prev) =>
//         prev.map((a) =>
//           a.id === id ? { ...a, status: newStatus } : a
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//       message.error("Failed to update status.");
//     }
//   };

//   // ✅ Define columns
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       width: 70,
//     },
//     {
//       title: "Customer",
//       dataIndex: "customerName",
//       key: "customerName",
//     },
//     {
//       title: "Contact",
//       dataIndex: "contactNumber",
//       key: "contactNumber",
//     },
//     {
//       title: "Service Type",
//       dataIndex: "serviceType",
//       key: "serviceType",
//     },
//     {
//       title: "Date",
//       dataIndex: "appointmentDate",
//       key: "appointmentDate",
//     },
//     {
//       title: "Time",
//       dataIndex: "appointmentTime",
//       key: "appointmentTime",
//     },
//     {
//       title: "Stylist ID",
//       dataIndex: "stylistId",
//       key: "stylistId",
//       width: 100,
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (_: any, record: Appointment) => (
//         <Select
//           defaultValue={record.status || "pending"}
//           onChange={(value) => handleStatusChange(record.id, value)}
//           style={{ width: 130 }}
//         >
//           <Option value="pending">Pending</Option>
//           <Option value="confirmed">Confirmed</Option>
//           <Option value="completed">Completed</Option>
//           <Option value="cancelled">Cancelled</Option>
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "30px", backgroundColor: "#fafafa", minHeight: "100vh" }}>
//       <StylistHeader />
//       <Card
//         style={{
//           maxWidth: "1100px",
//           margin: "40px auto",
//           borderRadius: "12px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Title level={4} style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6e" }}>
//           Appointment Management
//         </Title>

//         <Table
//           dataSource={appointments}
//           columns={columns}
//           rowKey="id"
//           bordered
//           loading={loading}
//           pagination={{ pageSize: 8 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default AppointmentManagement;

// --
// 2nd attempt

// import React, { useEffect, useState } from "react";
// import { Table, Select, message, Typography, Card } from "antd";
// import axios from "axios";
// import AppointmentHeader from "../../components/layout/header/appointment-header/AppointmentHeader";

// const { Title } = Typography;
// const { Option } = Select;

// interface Appointment {
//   id: number;
//   customerName: string;
//   contactNumber: string;
//   serviceType: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   stylistId: number;
//   status?: string | null;
//   note?: string | null;
// }

// interface Stylist {
//   id: number;
//   name: string;
//   specialization: string;
// }

// const AppointmentManagement: React.FC = () => {
//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch appointments and stylists and merge
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       // Fetch both datasets in parallel
//       const [appointmentRes, stylistRes] = await Promise.all([
//         axios.get("http://localhost:8080/api/v1/appointments"),
//         axios.get("http://localhost:8080/api/v1/stylistData"),
//       ]);

//       const appointmentData: Appointment[] = Array.isArray(appointmentRes.data.Data)
//         ? appointmentRes.data.Data
//         : appointmentRes.data;

//       const stylistData: Stylist[] = Array.isArray(stylistRes.data.Data)
//         ? stylistRes.data.Data
//         : stylistRes.data;

//       // Create a lookup map of stylistId → stylist info
//       const stylistMap = new Map<number, Stylist>();
//       stylistData.forEach((s) => stylistMap.set(s.id, s));

//       // Merge stylist details into appointment list
//       const merged = appointmentData.map((a) => ({
//         ...a,
//         stylistName: stylistMap.get(a.stylistId)?.name || "Unknown",
//         stylistSpecialization:
//           stylistMap.get(a.stylistId)?.specialization || "Not Assigned",
//       }));

//       setAppointments(merged);
//     } catch (error) {
//       console.error("Error loading data:", error);
//       message.error("Failed to load appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ✅ Handle status update
//   const handleStatusChange = async (id: number, newStatus: string) => {
//     try {
//       await axios.put(`http://localhost:8080/api/v1/appointment?id=${id}`, {
//         status: newStatus,
//       });
//       message.success(`Status updated to "${newStatus}"`);

//       // update locally
//       setAppointments((prev) =>
//         prev.map((a) =>
//           a.id === id ? { ...a, status: newStatus } : a
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//       message.error("Failed to update status.");
//     }
//   };

//   // ✅ Define table columns
//   const columns = [
//     { title: "ID", dataIndex: "id", key: "id", width: 60 },
//     { title: "Customer", dataIndex: "customerName", key: "customerName" },
//     { title: "Contact", dataIndex: "contactNumber", key: "contactNumber" },
//     { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
//     { title: "Date", dataIndex: "appointmentDate", key: "appointmentDate" },
//     { title: "Time", dataIndex: "appointmentTime", key: "appointmentTime" },
//     {
//       title: "Stylist",
//       dataIndex: "stylistName",
//       key: "stylistName",
//       render: (text: string) => <b>{text}</b>,
//     },
//     {
//       title: "Specialization",
//       dataIndex: "stylistSpecialization",
//       key: "stylistSpecialization",
//       render: (text: string) => <span style={{ color: "#7e57c2" }}>{text}</span>,
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (_: any, record: any) => (
//         <Select
//           defaultValue={record.status || "pending"}
//           onChange={(value) => handleStatusChange(record.id, value)}
//           style={{ width: 130 }}
//         >
//           <Option value="pending">Pending</Option>
//           <Option value="confirmed">Confirmed</Option>
//           <Option value="completed">Completed</Option>
//           <Option value="cancelled">Cancelled</Option>
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "30px", backgroundColor: "#fafafa", minHeight: "100vh" }}>
//       <AppointmentHeader />
//       <Card
//         style={{
//           maxWidth: "1100px",
//           margin: "40px auto",
//           borderRadius: "12px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Title
//           level={4}
//           style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6e" }}
//         >
//           Appointment Management
//         </Title>

//         <Table
//           dataSource={appointments}
//           columns={columns}
//           rowKey="id"
//           bordered
//           loading={loading}
//           pagination={{ pageSize: 8 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default AppointmentManagement;

// --
// 3rd attempt

import React, { useEffect, useState } from "react";
import { Table, Select, message, Typography, Card, Popconfirm, Tooltip } from "antd";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import AppointmentHeader from "../../components/layout/header/stylist-header/StylistHeader";

const { Title } = Typography;
const { Option } = Select;

interface Appointment {
  id: number;
  customerName: string;
  contactNumber: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  stylistId: number;
  status?: string | null;
  note?: string | null;
}

interface Stylist {
  id: number;
  name: string;
  specialization: string;
}

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch appointments + stylists
  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentRes, stylistRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/appointments"),
        axios.get("http://localhost:8080/api/v1/stylistData"),
      ]);

      const appointmentData: Appointment[] = Array.isArray(appointmentRes.data.Data)
        ? appointmentRes.data.Data
        : appointmentRes.data;
      const stylistData: Stylist[] = Array.isArray(stylistRes.data.Data)
        ? stylistRes.data.Data
        : stylistRes.data;

      const stylistMap = new Map<number, Stylist>();
      stylistData.forEach((s) => stylistMap.set(s.id, s));

      const merged = appointmentData.map((a) => ({
        ...a,
        stylistName: stylistMap.get(a.stylistId)?.name || "Unknown",
        stylistSpecialization: stylistMap.get(a.stylistId)?.specialization || "Not Assigned",
      }));

      setAppointments(merged);
    } catch (error) {
      console.error("Error loading data:", error);
      message.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handle status change
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/appointment?id=${id}`, {
        status: newStatus,
      });
      message.success(`Status updated to "${newStatus}"`);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status.");
    }
  };

  // ✅ Handle delete appointment
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/appointment?id=${id}`);
      message.success("Appointment deleted successfully.");
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      message.error("Failed to delete appointment.");
    }
  };

  // ✅ Table columns
//   const columns = [
//     { title: "ID", dataIndex: "id", key: "id", width: 60 },
//     { title: "Customer", dataIndex: "customerName", key: "customerName" },
//     { title: "Contact", dataIndex: "contactNumber", key: "contactNumber" },
//     { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
//     { title: "Date", dataIndex: "appointmentDate", key: "appointmentDate" },
//     { title: "Time", dataIndex: "appointmentTime", key: "appointmentTime" },
//     {
//       title: "Stylist",
//       dataIndex: "stylistName",
//       key: "stylistName",
//       render: (text: string) => <b>{text}</b>,
//     },
//     {
//       title: "Specialization",
//       dataIndex: "stylistSpecialization",
//       key: "stylistSpecialization",
//       render: (text: string) => <span style={{ color: "#7e57c2" }}>{text}</span>,
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (_: any, record: any) => (
//         <Select
//           defaultValue={record.status || "pending"}
//           onChange={(value) => handleStatusChange(record.id, value)}
//           style={{ width: 130 }}
//         >
//           <Option value="pending">Pending</Option>
//           <Option value="confirmed">Confirmed</Option>
//           <Option value="completed">Completed</Option>
//           <Option value="cancelled">Cancelled</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       align: "center",
//       render: (_: any, record: any) => (
//         <Popconfirm
//           title="Are you sure to delete this appointment?"
//           okText="Yes"
//           cancelText="No"
//           onConfirm={() => handleDelete(record.id)}
//         >
//           <Tooltip title="Delete Appointment">
//             <DeleteOutlined
//               style={{
//                 color: "red",
//                 fontSize: "18px",
//                 cursor: "pointer",
//               }}
//             />
//           </Tooltip>
//         </Popconfirm>
//       ),
//     },
//   ];

const columns = [
  { title: "ID", dataIndex: "id", key: "id", width: 60, sorter: (a: any, b: any) => a.id - b.id },
  {
    title: "Customer",
    dataIndex: "customerName",
    key: "customerName",
    sorter: (a: any, b: any) =>
      (a.customerName || "").toString().toLowerCase().localeCompare((b.customerName || "").toString().toLowerCase()),
  },
  {
    title: "Contact",
    dataIndex: "contactNumber",
    key: "contactNumber",
    sorter: (a: any, b: any) =>
      (a.contactNumber || "").toString().localeCompare((b.contactNumber || "").toString()),
  },
  {
    title: "Service Type",
    dataIndex: "serviceType",
    key: "serviceType",
    sorter: (a: any, b: any) =>
      (a.serviceType || "").toString().toLowerCase().localeCompare((b.serviceType || "").toString().toLowerCase()),
  },
  {
    title: "Date",
    dataIndex: "appointmentDate",
    key: "appointmentDate",
    sorter: (a: any, b: any) => {
      const da = a.appointmentDate ? new Date(a.appointmentDate).getTime() : 0;
      const db = b.appointmentDate ? new Date(b.appointmentDate).getTime() : 0;
      return da - db;
    },
  },
  {
    title: "Time",
    dataIndex: "appointmentTime",
    key: "appointmentTime",
    sorter: (a: any, b: any) =>
      (a.appointmentTime || "").toString().localeCompare((b.appointmentTime || "").toString()),
  },
  {
    title: "Stylist",
    dataIndex: "stylistName",
    key: "stylistName",
    render: (text: string) => <b>{text}</b>,
    sorter: (a: any, b: any) =>
      (a.stylistName || "").toString().toLowerCase().localeCompare((b.stylistName || "").toString().toLowerCase()),
  },
  {
    title: "Specialization",
    dataIndex: "stylistSpecialization",
    key: "stylistSpecialization",
    render: (text: string) => <span style={{ color: "#7e57c2" }}>{text}</span>,
    sorter: (a: any, b: any) =>
      (a.stylistSpecialization || "").toString().toLowerCase().localeCompare((b.stylistSpecialization || "").toString().toLowerCase()),
  },
  {
    title: "Status",
    key: "status",
    render: (_: any, record: any) => (
      <Select
        defaultValue={record.status || "pending"}
        onChange={(value) => handleStatusChange(record.id, value)}
        style={{ width: 130 }}
      >
        <Option value="pending">Pending</Option>
        <Option value="confirmed">Confirmed</Option>
        <Option value="completed">Completed</Option>
        <Option value="cancelled">Cancelled</Option>
      </Select>
    ),
    // for sorting we'll use the status string (null => empty)
    sorter: (a: any, b: any) =>
      ((a.status || "") as string).toLowerCase().localeCompare(((b.status || "") as string).toLowerCase()),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_: any, record: any) => (
      <Popconfirm
        title="Are you sure to delete this appointment?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => handleDelete(record.id)}
      >
        <Tooltip title="Delete Appointment">
          <DeleteOutlined
            style={{
              color: "red",
              fontSize: "18px",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </Popconfirm>
    ),
  },
];


  return (
    <div style={{ padding: "30px", backgroundColor: "#f7e1f8ff", minHeight: "100vh" }}>
      <AppointmentHeader />
      <Card
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title
          level={4}
          style={{ textAlign: "center", marginBottom: "20px", color: "#6e6e6e" }}
        >
          Appointment Management
        </Title>

        <Table
          dataSource={appointments}
          columns={columns}
          rowKey="id"
          bordered
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
};

export default AppointmentManagement;


// --



