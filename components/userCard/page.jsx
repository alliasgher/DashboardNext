"use client";

import { useState, useEffect } from "react";
import "firebase/storage"; // Import the Firebase Storage module
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";

const UserCard = ({ user, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedAge, setEditedAge] = useState(user.age);
  const [editedSummary, setEditedSummary] = useState(user.summary);
  const [editedPic, setEditedPic] = useState(user.pic);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isPicEdited, setisPicEdited] = useState(false);
  const [isEdited, setisEdited] = useState(false);
  const [isDeleteClicked, setisDeleteClicked] = useState(false)

  const validateInputs = () => {
    const validationErrors = [];

    if (!editedName) {
      validationErrors.push("Name is required");
    }

    if (!editedSummary) {
      validationErrors.push("Summary is required");
    }

    if (!editedAge) {
      validationErrors.push("Age is required");
    }

    if (isNaN(editedAge) || parseInt(editedAge) < 18) {
      validationErrors.push("Age must be a number and at least 18");
    }

    if (!editedPic) {
      validationErrors.push("Picture is required");
    }

    if (!isEdited) {
      validationErrors.push("No field updated");
    }

    if (isConfirmClicked) {
      setErrors(validationErrors);
    }
    return validationErrors.length === 0;
  };



  useEffect(() => {
    setEditedName(user.name);
    setEditedAge(user.age);
    setEditedSummary(user.summary);
    setEditedPic(user.pic);
  }, [user]);

  const handleDeleteClick = () => {
    onDelete(user._id); // Pass the pic URL to the onDelete function
  };



  const handleCancelClick = () => {
    setIsEditing(false);
    setIsLoading(false);
    setIsConfirmClicked(false) ;
    setisDeleteClicked(false)
  }

  const handleEditClick = async () => {

  
    setIsConfirmClicked(true) ;

    const isValid = validateInputs();

    if (isValid && isEdited && isEditing) {
      setIsLoading(true); 

      let downloadURL = user.pic;
      // upload the image to Firebase Storage here
      if (isPicEdited) {
        const storageRef = ref(storage, `${editedName}_${editedPic.name}`);
        await uploadBytes(storageRef, editedPic);
        downloadURL = await getDownloadURL(storageRef);
      }

      const userData = {
        name: editedName,
        age: editedAge,
        summary: editedSummary,
        pic: downloadURL,
      };

      console.log("sending from component,", userData);

      onEdit(userData);

      setIsEditing(false);
      setIsLoading(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="card w-96 card-compact bg-base-100 bg-blue-100 shadow-xl p-2">
      <figure>
        <img
          src={user.pic}
          alt={user.name}
          Picture
          className="w-32 h-32 mx-auto mb-4 rounded-full"
        />
      </figure>

      <div className="card-body">
      {isDeleteClicked ? ( // Show only when isDeleteClicked is true
      <>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="flex justify-between">
              <button
                className="btn btn-error btn-wide mr-2 mt-4"
                onClick={handleDeleteClick}
              >
                Confirm Delete
              </button>

              <button className="btn btn-circle btn-error btn-outline mr-2 mt-4" 
              onClick = {handleCancelClick}>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </>
      ) : (
        <>
        
        {isEditing ? (
          <>
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
                <span className="label-text">Updated Name</span>
              </label>
              <input
                type="text"
                placeholder={editedName}
                className="input input-bordered"
                onChange={(e) => {
                  setEditedName(e.target.value);
                  setisEdited(true);
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Updated User Summary</span>
              </label>
              <input
                type="text"
                placeholder={editedSummary}
                className="input input-bordered"
                onChange={(e) => {
                  setEditedSummary(e.target.value);
                  setisEdited(true);
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Updated Age</span>
              </label>
              <input
                type="number"
                placeholder={editedAge}
                className="input input-bordered"
                onChange={(e) => {
                  setEditedAge(e.target.value);
                  setisEdited(true);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Updated Picture</span>
              </label>
              <input
                type="file"
                className="file-input file-input-black w-full max-w-xs"
                onChange={(event) => {
                  const selectedFile = event.target.files[0];
                  setEditedPic(selectedFile);
                  setisPicEdited(true);
                  setisEdited(true);
                }}
                placeholder=""
                // className="input input-bordered"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="btn btn-success btn-wide mr-2 mt-4"
                onClick={handleEditClick}
              >
                Confirm Update
              </button>

              <button className="btn btn-circle btn-error btn-outline mr-2 mt-4" 
              onClick = {handleCancelClick}>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            
            <h2 className="card-title">Name: {user.name}</h2>
            <p>Age: {user.age}</p>
            <p>Summary: {user.summary}</p>
            <div className="grid grid-flow-col justify-stretch flex space-x-4">
            <button className="btn btn-error  " onClick={() => setisDeleteClicked(true)}>
              Delete
            </button>
            <button className="btn btn-neutral " onClick={handleEditClick}>
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <>
            Update
            </>
          )}
        </button>
        </div>
          </>
        )}
        </>
      )}

        
      </div>
    </div>
  );
};

export default UserCard;
