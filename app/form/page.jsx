"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import firebase from "firebase/app"; // Import the Firebase App module
import "firebase/storage"; // Import the Firebase Storage module

import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Form = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [age, setAge] = useState(0);
  const [pic, setPic] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    const isValid = validateInputs();
  
    if (isValid) {
      setIsLoading(true)
      const storageRef = ref(storage, `${name}_${pic.name}`);
  
      const userData = {
        name,
        summary,
        age
      };
  
      try {
        // Upload the picture to Firebase Storage
        await uploadBytes(storageRef, pic);
  
        // Get the download URL for the uploaded picture
        const downloadURL = await getDownloadURL(storageRef);
  
        // Append the download URL to the user data
        userData.pic = downloadURL;
  
        // Save user data to the server along with the download URL
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          console.log("Data added to the database successfully");
          window.alert("User added successfully!");
          router.push("/form/users");
        } else {
          console.error("Failed to save user data to the server");
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      console.error("Validation Error:", errors);
    }
  }
  

  const validateInputs = () => {
    const errors = [];

    if (!name) {
      errors.push("Name is required");
    }

    if (!summary) {
      errors.push("Summary is required");
    }

    if (!age) {
      errors.push("Age is required");
    }

    if (isNaN(age) || parseInt(age) < 18) {
      errors.push("Age must be a number and at least 18");
    }

    if (!pic) {
      errors.push("Picture is required");
    }

    setErrors(errors);
    return errors.length === 0;
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:ml-8">
          <h1 className="text-5xl font-bold">Add Details</h1>
          <p className="py-6">Enter the required details to continue.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {errors.length > 0 && (
              <div className="alert alert-error mb-4">
                <ul>
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">User Summary</span>
              </label>
              <input
                type="text"
                placeholder="summary"
                className="input input-bordered"
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                placeholder="age"
                className="input input-bordered"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                type="file"
                onChange={(event) => {
                  setPic(event.target.files[0]);
                }}
                placeholder="pic"
                className="file-input file-input-black w-full max-w-xs"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSubmit}>
                {isLoading ? (
                  <>
<span className="loading loading-ring loading-lg"></span> </>) : (<>Submit </>)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
