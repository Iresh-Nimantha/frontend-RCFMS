import React, { useState } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Driver", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Traffic Officer", status: "Inactive" },
    { id: 3, name: "Admin User", role: "Admin", status: "Active" },
  ]);

  const [reports, setReports] = useState([
    { id: 1, type: "Fines Collected", value: "150,000 LKR" },
    { id: 2, type: "Pending Fines", value: "45,000 LKR" },
    { id: 3, type: "Total Users", value: "1200" },
  ]);

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-3">User Management</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center border">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.role}</td>
                <td
                  className={`p-2 border ${
                    user.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.status}
                </td>
                <td className="p-2 border">
                  <button
                    className={`px-3 py-1 rounded ${
                      user.status === "Active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">System Reports</h3>
        <ul>
          {reports.map((report) => (
            <li key={report.id} className="mb-2 p-2 border-b border-gray-300">
              <span className="font-semibold">{report.type}: </span>{" "}
              {report.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
