import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { connectDb } from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port=process.env.PORT;

//connect db
connectDb();


//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // change to frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
//static file
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
    console.log("server");
})
