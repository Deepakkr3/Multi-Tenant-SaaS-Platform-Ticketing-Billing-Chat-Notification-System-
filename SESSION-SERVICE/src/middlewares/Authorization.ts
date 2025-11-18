import { NextFunction ,Response} from "express";
import { AuthRequest } from "./authMiddleware";


export const authorize = (requiredPermission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ message: "User not authenticated" });
    }

    const userPermissions = req.user.role.permissions.map((p: any) => p.name);

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: `Access denied. Missing permission: ${requiredPermission}`,
      });
    }

    next();
  };
};