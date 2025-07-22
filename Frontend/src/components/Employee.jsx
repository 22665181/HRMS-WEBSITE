import React from "react";
import { Container, Row, Col, Card, Table, Badge, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const employees = [
    {
      id: 5028,
      name: "Kristin Watson",
      position: "Medical Assistant",
      type: "Full-Time",
      status: "Present",
      checkIn: "08:34 am",
      checkOut: "05:45 pm",
      overtime: "0hr 45min",
    },
    {
      id: 7791,
      name: "Bessie Cooper",
      position: "Nursing Assistant",
      type: "Part-Time",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
      overtime: "-",
    },
    {
      id: 3933,
      name: "Annette Black",
      position: "Dog Trainer",
      type: "Part-Time",
      status: "Present",
      checkIn: "09:23 am",
      checkOut: "05:00 pm",
      overtime: "0hr",
    },
    {
      id: 8829,
      name: "Eleanor Pena",
      position: "President of Sales",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:27 am",
      checkOut: "06:06 pm",
      overtime: "1h 06min",
    },
    {
      id: 4600,
      name: "Jenny Wilson",
      position: "Marketing Coordinator",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:32 am",
      checkOut: "05:18 pm",
      overtime: "0hr 18min",
    },
    {
      id: 8811,
      name: "Devon Lane",
      position: "Web Designer",
      type: "Full-Time",
      status: "Late",
      checkIn: "10:41 am",
      checkOut: "07:12 pm",
      overtime: "2hr 12min",
    },
  ];

  const navItems = [
    "Dashboard",
    "Chat",
    "Employees",
    "Feed",
    "Recognition",
    "Event",
    "Profile",
    "Settings",
  ];

  return (
    <Container
      fluid
      style={{ backgroundColor: "#1d1f73", minHeight: "100vh", color: "white" }}
    >
      <Row>
        {/* Sidebar */}
        <Col
          md={2}
          style={{
            backgroundColor: "#5c6bc0",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          {/* Logo */}
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://via.placeholder.com/40x40.png?text=HR"
              className="me-2 rounded-circle"
              alt="Logo"
            />
            <div>
              <h5 className="mb-0 text-white">HRMS</h5>
              <small className="text-light">Human Resource System</small>
            </div>
          </div>

          {/* Profile */}
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              className="rounded-circle me-2"
              alt="User"
            />
            <div>
              <div className="fw-bold text-white">Maria</div>
              <small className="text-light">HR Manager</small>
            </div>
          </div>

          {/* Navigation */}
          <div className="nav flex-column">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`p-2 px-3 mb-2 rounded ${
                  item === "Employees"
                    ? "bg-white text-dark fw-bold"
                    : "text-white"
                }`}
                style={{ cursor: "pointer" }}
              >
                {item}
              </div>
            ))}
          </div>
        </Col>

        {/* Main */}
        <Col md={10} className="p-4">
          <Card style={{ backgroundColor: "#2c2f69", border: "none" }}>
            <Card.Body>
              {/* Controls */}
              <Row className="align-items-center mb-4">
                <Col md={3}>
                  <button className="btn btn-outline-light w-100">
                    22 Nov. 2024
                  </button>
                </Col>
                <Col md={3}>
                  <Form.Control
                    placeholder="Search"
                    className="bg-transparent text-white"
                  />
                </Col>
                <Col md={3}>
                  <Form.Select className="bg-transparent text-white">
                    <option>All Departments</option>
                  </Form.Select>
                </Col>
                <Col md={3} className="text-end">
                  <button className="btn btn-outline-light">
                    Export CSV ⬇
                  </button>
                </Col>
              </Row>

              {/* Table */}
              <Table
                hover
                responsive
                className="table-borderless text-white align-middle"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Position</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Overtime</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td className="d-flex align-items-center">
                        <img
                          src={`https://i.pravatar.cc/30?img=${i + 1}`}
                          className="rounded-circle me-2"
                          alt="avatar"
                        />
                        {emp.name}
                      </td>
                      <td>{emp.position}</td>
                      <td>
                        <Badge bg="dark" className="py-1 px-2 rounded-pill">
                          {emp.type}
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          bg={
                            emp.status === "Present"
                              ? "success"
                              : emp.status === "Absent"
                              ? "danger"
                              : "warning"
                          }
                          className="py-1 px-2 rounded-pill"
                        >
                          {emp.status}
                        </Badge>
                      </td>
                      <td>{emp.checkIn}</td>
                      <td>{emp.checkOut}</td>
                      <td>{emp.overtime}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-4 text-white-50">
                <div>
                  Showing <strong>1 to 6</strong> of <strong>80</strong>{" "}
                  employees
                </div>
                <div className="d-flex gap-2">
                  {[1, 2, "...", 13].map((pg, idx) => (
                    <button key={idx} className="btn btn-outline-light btn-sm">
                      {pg}
                    </button>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
