import express from 'express';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();
import { connectDB } from './config/db.js';
import productRoutes from './routes/image.route.js'
const Port = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const __dirname = path.resolve();

const app  = express();
app.use(express.json());
app.use("/api/images", productRoutes);

if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname,"frontend/dist")));

    app.get("*", (req, res) => {
         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
app.listen(Port,HOST, () => {
    connectDB();
     console.log("Server running succesfully");
     
})