import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column('int', {
    nullable: true,
    name: 'user_id',
    comment: '用户id'
  })
  userId: number;

  @Column('int', {
    nullable: true,
    name: 'role_id',
    comment: '角色id'
  })
  roleId: number;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'created_time',
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'updated_time',
    comment: '更新时间'
  })
  updatedTime: Date;
}