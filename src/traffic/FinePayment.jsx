import React, { useState } from "react";

const FinePayment = () => {
  const [fineID, setFineID] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handlePayment = (e) => {
    e.preventDefault();
    alert(
      `Fine ID: ${fineID}\nAmount: ${amount} LKR\nPayment Method: ${paymentMethod}\nPayment Successful!`
    );
    setFineID("");
    setAmount("");
    setPaymentMethod("Credit Card");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Fine Payment</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block font-semibold">Fine ID:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={fineID}
              onChange={(e) => setFineID(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Amount (LKR):</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Payment Method:</label>
            <select
              className="w-full p-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Mobile Payment">Mobile Payment</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinePayment;
