import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: String;

  @ManyToMany(() => User)
  @JoinTable({ name: "vote" })
  user: User[];
}
