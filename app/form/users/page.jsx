"use client";

import { useState, useEffect } from "react";

const UserCard = ({ user, onDelete }) => {

  const handleDeleteClick = () => {
    onDelete(user._id); // Pass the pic URL to the onDelete function
  };

  return (
    <div className="card w-96 bg-base-100 bg-blue-100 shadow-xl">
      <figure>
        <img src={user.pic} alt={user.name} Picture className="w-32 h-32 mx-auto mb-4 rounded-full"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {user.name}</h2>
        <p>Age: {user.age}</p>
        <p>Summary: {user.summary}</p>
        <button className="btn btn-error mt-4" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await fetch("/api/users"); // Use GET request
      const data = await response.json();

      console.log("data", data);
      setUsers(data.data); // Assuming the response is in the format { data: [...] }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  const handleDeleteUser = async (userId) => {
    console.log('userid', userId)
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId), // Send userId as data in the request body
      });
  
      if (response.ok) {
        console.log("User deleted successfully");
        getData();
        // Add any additional logic or notifications here
      } else {
        console.error("Failed to delete user");
        // Add any error handling or notifications here
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Add any error handling or notifications here
    }
  };
  

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (


    <div className="container mx-auto p-8">
    <div className="grid grid-cols-3 gap-4">
      {users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={() => handleDeleteUser(user._id)} />
          ))}
    </div>
  </div>
);
};


export default Users;
