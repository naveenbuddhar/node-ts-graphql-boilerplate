import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
// adding to github
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  confirm: boolean;

  @Column({ type: "varchar", length: "230" })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
