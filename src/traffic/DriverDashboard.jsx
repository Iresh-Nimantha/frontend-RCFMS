import React, { useState } from "react";

const DriverDashboard = () => {
  const [fines, setFines] = useState([
    {
      id: 1,
      type: "Speeding",
      amount: "5000 LKR",
      date: "2025-03-01",
      status: "Pending",
    },
    {
      id: 2,
      type: "Signal Violation",
      amount: "3000 LKR",
      date: "2025-02-20",
      status: "Paid",
    },
  ]);

  const handlePayment = (id) => {
    setFines(
      fines.map((fine) => (fine.id === id ? { ...fine, status: "Paid" } : fine))
    );
    alert("Payment Successful!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Driver Dashboard</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Your Fines</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Violation</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.id} className="text-center border">
                <td className="p-2 border">{fine.type}</td>
                <td className="p-2 border">{fine.amount}</td>
                <td className="p-2 border">{fine.date}</td>
                <td
                  className={`p-2 border ${
                    fine.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {fine.status}
                </td>
                <td className="p-2 border">
                  {fine.status === "Pending" && (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handlePayment(fine.id)}
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverDashboard;
