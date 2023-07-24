"use client";

import { useState, useEffect } from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card w-96 bg-base-100 bg-blue-100 shadow-xl">
      <figure>
        <img src={user.pic} alt={user.name} Picture className="w-32 h-32 mx-auto mb-4 rounded-full"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {user.name}</h2>
        <p>Age: {user.age}</p>
        <p>Summary: {user.summary}</p>
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

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    //     <div>
    //       <div className="hero min-h-screen bg-base-200">
    //   <div className="hero-content text-center">

    //       <div className="card w-96 bg-base-100 shadow-xl">
    //   <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    //   <div className="card-body">
    //     <h2 className="card-title">Shoes!</h2>
    //     <p>If a dog chews shoes whose shoes does he choose?</p>
    //     <div className="card-actions justify-end">
    //       <button className="btn btn-primary">Buy Now</button>
    //     </div>
    //   </div>
    // </div>
    //     </div>
    //     </div>
    // </div>

    <div className="grid grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Users;
