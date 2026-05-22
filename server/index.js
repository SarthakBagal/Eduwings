import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import helmet from "helmet";
import { connectDb } from "./database/db.js";
import dns from "dns";

// ── ROUTES ────────────────────────────────────────────────
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import createUserRoutes from "./routes/createUserRoutes.js";

// Fees
import feesRoutes from "./routes/feesRoutes.js";
import feesCollectionRoutes from "./routes/feesCollectionRoutes.js";
import busFeesRoutes from "./routes/busFeesRoutes.js";
import otherFeesRoutes from "./routes/otherFeesRoutes.js";
import concessionRoutes from "./routes/concessionRoutes.js";
import studentCategoryRoutes from "./routes/studentCategoryRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";

// Admission
import prospectusRoutes from "./routes/prospectusRoutes.js";
import studentAdmissionRoutes from "./routes/studentAdmissionRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import addmissionEnquiryRoutes from "./routes/addmissionEnquiryRoutes.js";
import studentEnquiryRoutes from "./routes/studentEnquiryRoutes.js";

// Certificates
import leavingCertificateRoutes from "./routes/Leavingcertificateroutes.js";
import bonafiedCertificateRoutes from "./routes/BonafiedCertificateRoutes.js";

// Support
import forgotPasswordRoutes from "./routes/Forgotpasswordroutes.js";

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from "url";
import { dirname } from "path";

// ── DNS ───────────────────────────────────────────────────
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT;

// ── CONNECT DB ────────────────────────────────────────────
connectDb();

// ── MIDDLEWARE ────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: [
                "'self'",
                "https://cdn.jsdelivr.net",
                "https://cdnjs.cloudflare.com",
                "https://fonts.googleapis.com"
            ],
            fontSrc: [
                "'self'",
                "https://fonts.gstatic.com",
                "https://cdnjs.cloudflare.com"
            ],
            scriptSrc: [
                "'self'",
                "https://cdn.jsdelivr.net"
            ],
            connectSrc: [
                "'self'",
                "http://localhost:5000",
                "http://127.0.0.1:5000",
                "http://127.0.0.1:5500"
            ]
        }
    })
);

// ── STATIC FILES ──────────────────────────────────────────
app.use(express.static(path.join(__dirname, "../client")));
app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));

// ── ROUTES ────────────────────────────────────────────────

// Auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/createUsers", createUserRoutes);

// Fees
app.use("/api/fees", feesRoutes);
app.use("/api/scholarship", scholarshipRoutes);
app.use("/api/feesCollection", feesCollectionRoutes);
app.use("/api/busFees", busFeesRoutes);
app.use("/api/otherFees", otherFeesRoutes);
app.use("/api/concession", concessionRoutes);
app.use("/api/studentCategory", studentCategoryRoutes);

// Admission
app.use("/api/ProspectusSale", prospectusRoutes);
app.use("/api/studentAdmission", studentAdmissionRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/student-enquiries", studentEnquiryRoutes);
app.use("/api/addmission-enquiries", addmissionEnquiryRoutes);

// Certificates
app.use("/api", leavingCertificateRoutes);
app.use("/api", bonafiedCertificateRoutes);

// Support
app.use("/api", forgotPasswordRoutes);

// ── TEST ROUTE ────────────────────────────────────────────
app.get('/', (req, res) => {
    res.send("server is working");
});

// ── START SERVER ──────────────────────────────────────────
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
