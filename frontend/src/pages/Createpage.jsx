import React from 'react'
import { useState } from 'react'
import "./Createpage.css"
import { useImagestore } from '../../src/store/imagestore'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Createpage = () => {
  const [newImage, setnewImage] = useState(
    {
      name:"",
      date:"",
      image:""
    }
  );



const {createImage} = useImagestore();

  const handleaddImage= async()=>{
    const {success,message} = await createImage(newImage);
    if(!success)
    {   console.log("Showing error toast");
       toast.error(message, {
          
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          });
    }else{
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      
    }
    

  }

  return (
    <div className='imageadd'>
      <h3>Add New Image</h3>
      <input 
      placeholder='Name'
      name='name'
      type='text'
      value={newImage.name}
      onChange={(e) => setnewImage({ ...newImage, name:e.target.value})}
      />
      <input 
      placeholder='Date'
      name='date'
      type='date'
      value={newImage.date}
      onChange={(e) => setnewImage({ ...newImage, date:e.target.value})}
      />
      <input 
      placeholder='Image'
      name='image'
      type='text'
      value={newImage.image}
      onChange={(e) => setnewImage({ ...newImage, image:e.target.value})}
      />
      <button onClick={handleaddImage}>Add</button>
    </div>
  )
}

export default Createpage
