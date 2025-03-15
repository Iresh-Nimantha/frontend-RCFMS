import React, { useState } from "react";

const Authentication = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "Driver",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const users = [
    { username: "admin", password: "admin123", role: "Admin" },
    { username: "officer", password: "officer123", role: "Traffic Officer" },
    { username: "driver", password: "driver123", role: "Driver" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const validUser = users.find(
      (u) => u.username === user.username && u.password === user.password
    );

    if (validUser) {
      setIsAuthenticated(true);
      setError("");
      alert(`Login successful as ${validUser.role}`);
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ username: "", password: "", role: "Driver" });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 min-h-screen">
      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block font-semibold">Username:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Password:</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Role:</label>
              <select
                className="w-full p-2 border rounded"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="Driver">Driver</option>
                <option value="Traffic Officer">Traffic Officer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.role}!</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
