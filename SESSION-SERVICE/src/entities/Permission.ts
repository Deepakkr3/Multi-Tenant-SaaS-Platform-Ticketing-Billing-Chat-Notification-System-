
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: "CASCADE",
    eager: true,
  })
  role!: Role;
}