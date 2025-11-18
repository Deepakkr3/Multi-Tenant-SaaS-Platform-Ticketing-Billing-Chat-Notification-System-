import { Router } from "express";

// import { getAllUsers } from "../controllers/userController";
// import { authMiddleware } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/Authorization";
import { authenticate } from "../middlewares/authMiddleware";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController";

const router = Router();

// router.get("/user", authMiddleware, authorize(["READ_USER"]), getAllUsers);


router.post("/user", authenticate, authorize("CREATE_USER"), createUser);
router.get("/user", authenticate, authorize("READ_USER"), getUsers);
router.get("/user:id", authenticate, authorize("READ_USER"), getUserById);
router.put("/user:id", authenticate, authorize("UPDATE_USER"), updateUser);
router.delete("/user:id", authenticate, authorize("DELETE_USER"), deleteUser);

export default router;
