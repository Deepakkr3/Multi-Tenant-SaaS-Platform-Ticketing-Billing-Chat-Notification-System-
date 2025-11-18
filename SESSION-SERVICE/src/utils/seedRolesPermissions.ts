import { AppDataSource } from "../config/db";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";

export const seedRBAC = async () => {
    try {
          const roleRepo = AppDataSource.getRepository(Role);
          const permRepo = AppDataSource.getRepository(Permission);

          const permissions = [
            "CREATE_USER",
            "READ_USER",
            "UPDATE_USER",
            "DELETE_USER",
          ];

          const savedPerms = [];
          for (const name of permissions) {
            let perm = await permRepo.findOne({ where: { name } });
            if (!perm) {
              perm = permRepo.create({ name });
              await permRepo.save(perm);
            }
            savedPerms.push(perm);
          }

          const adminRole = await roleRepo.findOne({
            where: { name: "ADMIN" },
            relations: ["permissions"],
          });
          if (!adminRole) {
            const newAdmin = roleRepo.create({
              name: "ADMIN",
              permissions: savedPerms,
            });
            await roleRepo.save(newAdmin);
            console.log("ADMIN role created with permissions");
          }
        
    }
    catch (error) {
        console.error("Error seeding RBAC:", error);
    }
};
