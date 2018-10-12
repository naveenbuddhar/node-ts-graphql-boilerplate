import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Vote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn("int")
  userId: number;
  @PrimaryColumn("int")
  postId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;
}
