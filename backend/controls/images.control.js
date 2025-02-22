
import Product from '../models/image.model.js';
import mongoose from 'mongoose';
export const productget = async (req,res) => {

    try {
      const products = await Product.find({});
      res.status(200).json({success: true, data: products});
    }catch(error){
      console.log("Error in fetching products:",error.message);
      res.status(500).json({success: false, message: "Server error"});
    }
  }
  
export const productupdate = async (req,res) => {
    const {id} = req.params;
    
    const product = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product id"});
    }
    try{
      const updatedproduct = await Product.findByIdAndUpdate(id, product,{new: true});
      res.status(200).json({success: true, data: updatedproduct});
  
    }catch(error){
      res.status(500).json({success: false, message: "Server error"});
    }
  }

export const productpost = async (req,res) => {
    const product = req.body;
  
    if(!product.name || !product.date || !product.image){
     return res.status(400).json({success:false, message: "Provide all fields"})
    }
  const newProduct = new Product(product)
 
  try{
     await newProduct.save();
     res.status(201).json({success: true, data: newProduct})
  }catch(error){
    console.log("Error in create product:", error.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
 }

export const productdelete = async (req,res) => {
    const {id} = req.params;
    console.log("id: ",id);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product id"});
    }
   

 try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Product deleted"})
 }catch(error){
   console.log("Error in deleting product:", error.message);
   res.status(500).json({success: false, message: "Server Error"});
 }
}