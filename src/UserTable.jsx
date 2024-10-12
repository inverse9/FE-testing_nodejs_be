import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user"); // Your API endpoint
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user by ID
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedUsers = await fetch("http://localhost:3000/user"); // Refetch the user list
        const data = await updatedUsers.json();
        setUsers(data.data); // Set the updated users list
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    navigate("/edit-user", { state: { user } }); // Pass user data to the form
  };

  const goToAddUserForm = () => {
    navigate("/add-user"); // Redirect to the input form page
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">User Table</h2>

        <button
          onClick={goToAddUserForm}
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600"
        >
          Add New User
        </button>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => editUser(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
