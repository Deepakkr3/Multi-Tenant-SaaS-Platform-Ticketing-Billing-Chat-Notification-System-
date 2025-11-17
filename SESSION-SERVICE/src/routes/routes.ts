
import express from "express";
import authRoute from "./authRoute";

/**
 * Top-level router
 */
const routers = express.Router();


routers.use("/api/v1", authRoute);


export default routers;
