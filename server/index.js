import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import helmet from "helmet";
import { connectDb } from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port=process.env.PORT;

//connect db
connectDb();


//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
//static file
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);



//route
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);



app.get('/',(req,res)=>{
    res.send("server is working");
})

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`);
})
