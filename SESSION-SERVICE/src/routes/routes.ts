
import express from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoutes";

/**
 * Top-level router
 */
const routers = express.Router();


routers.use("/api/v1", authRoute);
routers.use("/api/v1", userRoute);


export default routers;
