import express from 'express';

const router = express.Router();
import { productdelete, productget, productpost, productupdate } from '../controls/images.control.js';


router.get("/", productget);
  
  router.post("/", productpost);
  
  router.delete("/:id", productdelete);
  
  router.put("/:id", productupdate);

  export default router;