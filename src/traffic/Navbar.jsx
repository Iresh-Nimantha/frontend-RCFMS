import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    Driver: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Fines", path: "/fines" },
      { name: "Payments", path: "/payments" },
    ],
    "Traffic Officer": [
      { name: "Issue Fines", path: "/issue-fines" },
      { name: "Fine Records", path: "/fine-records" },
    ],
    Admin: [
      { name: "Manage Users", path: "/manage-users" },
      { name: "Reports", path: "/reports" },
      { name: "System Analytics", path: "/analytics" },
    ],
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">RCFMS</h1>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className="hidden md:flex space-x-4">
          {menuItems[role]?.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden bg-blue-700 p-2">
          {menuItems[role]?.map((item) => (
            <li key={item.name} className="p-2 border-b border-blue-500">
              <Link
                to={item.path}
                className="block"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
