import dotenv from "dotenv";
import app from "./app";
// const app = express();

import { AppDataSource } from "./config/db";
import { seedRBAC } from "./utils/seedRolesPermissions";


const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
const port = process.env.PORT;




const server = app.listen(port, async () => {
 await AppDataSource.initialize();
  console.log("mysql connected");
   await seedRBAC();
  console.log("🚀 RBAC seeded");
  

  console.log("🚀 Server is listening on port", port);
});


