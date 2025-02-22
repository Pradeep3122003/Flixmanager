import React, { useState, useEffect } from "react";
import "./Card.css";
import del from "../assets/delete.svg";
import edit from "../assets/edit.svg";
import { useImagestore } from "../store/imagestore";
import { toast } from "react-toastify";

const Card = ({ image }) => {
  const { deleteImage, updateImage } = useImagestore();
  const [updatedImage, setupdateImage] = useState(image);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Ensure updatedImage state syncs when the image prop changes
  useEffect(() => {
    setupdateImage(image);
  }, [image]);

  const handledeleteImage = async (pid) => {
    const { success, message } = await deleteImage(pid);
    if (!success) {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleupdateImage = async (pid, updatedImage) => {
    console.log("Updating image with ID:", pid, updatedImage);
  
    const response = await updateImage(pid, updatedImage);
    console.log("Update Response:", response); // Debug log
  
    if (!response.success) {
      console.log("Showing error toast");
      toast.error(response.message || "Update failed!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      console.log("Showing success toast");
      toast.success(response.message || "Update successful!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  
    setShowUpdateForm(false); // Hide the form after updating
  };
  

  return (
    <div id="item">
      <img src={image.image} alt={image.name} />
      <div className="foot">
        <p>{image.name}</p>
        <span>{image.updatedAt}</span>
        <img
          src={edit}
          alt="Edit"
          id="updatebutton"
          onClick={() => setShowUpdateForm(!showUpdateForm)} // Toggle form visibility
        />
        <img src={del} alt="Delete" onClick={() => handledeleteImage(image._id)} />
      </div>
      
      {showUpdateForm && (
        <div className="imageadd" id="imageupdate">
          <h3>Update Image</h3>
          <input
            placeholder="Name"
            name="name"
            type="text"
            value={updatedImage.name}
            onChange={(e) => setupdateImage({ ...updatedImage, name: e.target.value })}
          />
          <input
            placeholder="Date"
            name="date"
            type="date"
            value={updatedImage.date}
            onChange={(e) => setupdateImage({ ...updatedImage, date: e.target.value })}
          />
          <input
            placeholder="Image"
            name="image"
            type="text"
            value={updatedImage.image}
            onChange={(e) => setupdateImage({ ...updatedImage, image: e.target.value })}
          />
          <button onClick={() => handleupdateImage(image?._id, updatedImage)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Card;
