import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50})
  username: string;

  @Column({ length: 50 })
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST
  })
  role: UserRole

}