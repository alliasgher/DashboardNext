"use client";

import UserCard from "@/components/userCard/page";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function getData() {
    try {
      const response = await fetch("/api/users"); // Use GET request
      const data = await response.json();

      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  const handleDeleteUser = async (userId) => {
    setDeleting(true);
    console.log("userid", userId);
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
      } else {
        console.error("Failed to delete user");
      }
      setDeleting(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setDeleting(false);
      throw error;
    }
  };

  const handleEditUser = async (userId, userData) => {
    setUpdating(true);
    console.log("userid", userId);

    console.log("userData", userData);

    try {
      const response = await fetch(`/api/users`, {
        // add the userId to the URL
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, userInfo: userData }), // stringify the userData object
      });

      if (response.ok) {
        console.log("User edited successfully");
        getData();
      } else {
        console.error("Failed to edit user");
      }
      setUpdating(false);
    } catch (error) {
      console.error("Error editing user:", error);
      setUpdating(false);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
      <span className="loading loading-infinity loading-lg"></span></div>;
      </div>
    </div>

    
  }

  if (users.length == 0) {
    return <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
      <h1 className="text-5xl font-bold">No current users.</h1>
      </div>
    </div>
    </div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-3 gap-4 p-4">
        {deleting ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <>
            {updating ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              <>
                {users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onDelete={() => handleDeleteUser(user._id)}
                    onEdit={(updatedUserInfo) =>
                      handleEditUser(user._id, updatedUserInfo)
                    }
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
