import { Router } from "express";
import { login, register } from "../controllers/authController";





const router = Router();



router.post("/register", register);
router.post("/login", login);
// router.post("/", authenticate, authorize("CREATE_USER"), createUser);
// router.get("/", authenticate, authorize("READ_USER"), getUsers);
// router.delete("/:id", authenticate, authorize("DELETE_USER"), deleteUser);
// router.get("/profile", authMiddleware, getProfile);

export default router;
