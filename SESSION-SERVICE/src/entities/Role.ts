import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @OneToMany(() => Permission, (permission) => permission.role, {
    cascade: true,
  })
  permissions!: Permission[];
}
