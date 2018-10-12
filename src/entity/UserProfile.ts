import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  Column
} from "typeorm";
import { Profile } from "./Profile";
// adding to github
@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  email: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
