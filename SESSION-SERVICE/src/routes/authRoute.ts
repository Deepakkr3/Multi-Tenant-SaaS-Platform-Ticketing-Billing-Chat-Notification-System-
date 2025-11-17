import { Router } from "express";
import {
  login,
  refreshSession,
  logout,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/refresh", refreshSession);

// Protected routes
router.post("/logout", auth, logout);

router.get("/profile", auth, (req, anyRes) => {
  return anyRes.json({
    message: "Protected content",
    user: (req as any).user, 
  });
});

export default router;
