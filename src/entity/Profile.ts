import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
// adding to github
@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  favouriteColor: string;
}
