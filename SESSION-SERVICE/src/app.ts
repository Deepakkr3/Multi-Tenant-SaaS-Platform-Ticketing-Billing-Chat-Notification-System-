import cors from "cors";
import express from "express";

import routers from "./routes/routes";

const app = express();


app.use(
  cors({
    origin: [
      /http(s)?:\/\/localhost(:[0-9]+)?(\/)?$/,
      /^http(s)?:\/\/192\.168\.29\.[0-9]*(:[0-9]+)?(\/)?$/,
      /\**/,
   
    ],
    optionsSuccessStatus: 200,
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(routers);


export default app;
