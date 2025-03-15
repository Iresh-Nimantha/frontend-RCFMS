import React, { useState, useEffect } from "react";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fines = [
      {
        id: 1,
        type: "Speeding",
        amount: "5000 LKR",
        dueDate: "2025-03-10",
        status: "Pending",
      },
      {
        id: 2,
        type: "Signal Violation",
        amount: "3000 LKR",
        dueDate: "2025-03-05",
        status: "Pending",
      },
    ];

    const pendingNotifications = fines
      .filter((fine) => fine.status === "Pending")
      .map(
        (fine) =>
          `Reminder: Your ${fine.type} fine of ${fine.amount} is due by ${fine.dueDate}.`
      );

    setNotifications(pendingNotifications);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((note, index) => (
            <li
              key={index}
              className="mb-2 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 rounded"
            >
              {note}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationSystem;
