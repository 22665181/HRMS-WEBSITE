import React, { useState } from "react";
import {
  Form,
  Button,
  Table,
  Badge,
  Alert
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // For Bootstrap Icons

const Employee = () => {
  const [view, setView] = useState("list");
  const [employees, setEmployees] = useState([
    {
      id: 5028,
      name: "Kristin Watson",
      position: "Medical Assistant",
      type: "Full-Time",
      department: "Health",
      email: "kristin.watson@example.com",
    },
    {
      id: 7791,
      name: "Bessie Cooper",
      position: "Nursing Assistant",
      type: "Part-Time",
      department: "Health",
      email: "bessie.cooper@example.com",
    },
    {
      id: 3933,
      name: "Annette Black",
      position: "Dog Trainer",
      type: "Part-Time",
      department: "Training",
      email: "annette.black@example.com",
    },
    {
      id: 8829,
      name: "Eleanor Pena",
      position: "President of Sales",
      type: "Full-Time",
      department: "Sales",
      email: "eleanor.pena@example.com",
    },
    {
      id: 4600,
      name: "Jenny Wilson",
      position: "Marketing Coordinator",
      type: "Full-Time",
      department: "Marketing",
      email: "jenny.wilson@example.com",
    },
    {
      id: 8811,
      name: "Devon Lane",
      position: "Web Designer",
      type: "Full-Time",
      department: "Design",
      email: "devon.lane@example.com",
    },
  ]);

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    role: "",
    department: "",
    id: "",
    type: "",
    email: "",
  });

  const handleFormChange = (e) => {
    setEmployeeForm({ ...employeeForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!employeeForm.name || !employeeForm.role || !employeeForm.id) {
      alert("Please fill all required fields!");
      return;
    }

    const newEmp = {
      id: Number(employeeForm.id), // Ensure it's a number
      name: employeeForm.name,
      position: employeeForm.role,
      type: employeeForm.type,
      department: employeeForm.department,
      email: employeeForm.email,
    };

    // Prevent duplicate IDs
    if (employees.some(emp => emp.id === newEmp.id)) {
      alert("An employee with this ID already exists!");
      return;
    }

    setEmployees([...employees, newEmp]);
    setEmployeeForm({
      name: "",
      role: "",
      department: "",
      id: "",
      type: "",
      email: "",
    });
    setView("list");
  };

  return (
    <div style={{ backgroundColor: "#1d1f73", minHeight: "100vh", color: "white", padding: "20px" }}>
      <div style={{ backgroundColor: "#2c2f69", borderRadius: "8px", padding: "20px" }}>
        <div className="mb-4">
          <Button variant="light" onClick={() => setView("list")} className="me-2">
            📋 View Employees
          </Button>
          <Button variant="outline-light" onClick={() => setView("add")}>
            ➕ Add Employee
          </Button>
        </div>

        {view === "list" ? (
          <>
            <div className="row align-items-center mb-4">
              <div className="col-md-3">
                <button className="btn btn-outline-light w-100">22 Nov. 2024</button>
              </div>
              <div className="col-md-3">
                <Form.Control placeholder="Search" className="bg-transparent text-white" />
              </div>
              <div className="col-md-3">
                <Form.Select className="bg-transparent text-white">
                  <option>All Departments</option>
                </Form.Select>
              </div>
              <div className="col-md-3 text-end">
                <button className="btn btn-outline-light">Export CSV ⬇</button>
              </div>
            </div>

            <Table hover responsive className="table-borderless text-white align-middle w-100">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Position</th>
                  <th>Type</th>
                  <th>Department</th>
                  <th>Email</th>
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
                      <Badge bg="dark" className="py-1 px-2 rounded-pill">{emp.type}</Badge>
                    </td>
                    <td>{emp.department}</td>
                    <td>{emp.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <h4 className="mb-3">Add New Employee</h4>
            <Alert variant="light" className="border text-dark">
              <strong>Preparing a CSV file?</strong><br />
              Great news! If you have already generated a CSV file in the{" "}
              <a href="/">recommended format</a>, you can use our bulk import feature!
              <Button variant="primary" size="sm" className="float-end mt-2">
                <i className="bi bi-upload"></i> Import List
              </Button>
            </Alert>

            <Form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group controlId="employeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={employeeForm.name}
                      onChange={handleFormChange}
                      placeholder="Enter employee name"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={employeeForm.role}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select role</option>
                      <option>Chartered Accountant</option>
                      <option>Developer</option>
                      <option>HR Manager</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group controlId="department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      value={employeeForm.department}
                      onChange={handleFormChange}
                      placeholder="e.g., Technical Support"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="employeeId">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control
                      type="number"
                      name="id"
                      value={employeeForm.id}
                      onChange={handleFormChange}
                      placeholder="ID number"
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={employeeForm.type}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={employeeForm.email}
                      onChange={handleFormChange}
                      placeholder="example@email.com"
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <Button variant="primary" type="submit">
                Save Employee Details
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Employee;
