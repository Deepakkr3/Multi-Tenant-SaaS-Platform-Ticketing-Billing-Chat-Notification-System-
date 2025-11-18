import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private roleRepo = AppDataSource.getRepository(Role);

  async createUser(email: string, password: string, roleName: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new Error("User already exists");

    const role = await this.roleRepo.findOne({ where: { name: roleName } });
    if (!role) throw new Error("Role not found");

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({
      email,
      password: hashedPwd,
      role,
    });

    return await this.userRepo.save(newUser);
  }

  async getUsers() {
    return await this.userRepo.find({
      relations: ["role", "role.permissions"],
    });
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ["role", "role.permissions"],
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUser(id: number, data: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);

    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    await this.userRepo.delete(id);
    return true;
  }
}

export default new UserService();
