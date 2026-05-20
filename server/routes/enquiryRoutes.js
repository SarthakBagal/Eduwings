// import express from "express";
// import Enquiry from "../models/enquiry.js";

// import {
//   createEnquiry,
//   getAllEnquiries
// } from "../controllers/enquiryController.js";

// const router = express.Router();

// router.get("/count", async (req, res) => {
//   try {
//     const count = await Enquiry.countDocuments();
//     res.json({ total: count });
//   } catch (error) {
//     res.status(500).json({ message: "Error getting count" });
//   }
// });

// router.post("/", createEnquiry);
// router.get("/", getAllEnquiries);


// export default router;