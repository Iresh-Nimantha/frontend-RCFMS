import React, { useState } from "react";

const TrafficOfficerPanel = () => {
  const [fines, setFines] = useState([
    {
      id: 1,
      driver: "John Doe",
      type: "Speeding",
      amount: "5000 LKR",
      date: "2025-03-01",
      status: "Pending",
    },
    {
      id: 2,
      driver: "Jane Smith",
      type: "Signal Violation",
      amount: "3000 LKR",
      date: "2025-02-20",
      status: "Paid",
    },
  ]);

  const [newFine, setNewFine] = useState({ driver: "", type: "", amount: "" });

  const handleIssueFine = () => {
    if (newFine.driver && newFine.type && newFine.amount) {
      const newEntry = {
        id: fines.length + 1,
        driver: newFine.driver,
        type: newFine.type,
        amount: `${newFine.amount} LKR`,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      };
      setFines([...fines, newEntry]);
      setNewFine({ driver: "", type: "", amount: "" });
      alert("Fine Issued Successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Traffic Officer Panel
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-3">Issue a Fine</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Driver Name"
            className="p-2 border rounded"
            value={newFine.driver}
            onChange={(e) => setNewFine({ ...newFine, driver: e.target.value })}
          />
          <input
            type="text"
            placeholder="Violation Type"
            className="p-2 border rounded"
            value={newFine.type}
            onChange={(e) => setNewFine({ ...newFine, type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Fine Amount (LKR)"
            className="p-2 border rounded"
            value={newFine.amount}
            onChange={(e) => setNewFine({ ...newFine, amount: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleIssueFine}
        >
          Issue Fine
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Fines Issued</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Driver</th>
              <th className="p-2 border">Violation</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.id} className="text-center border">
                <td className="p-2 border">{fine.driver}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrafficOfficerPanel;
