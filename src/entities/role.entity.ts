import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class RoleEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'roleName',
    comment: '角色名称',
    length: 100,
  })
  roleName: string;

  @Column('varchar', {
    nullable: false,
    name: 'roleCode',
    comment: '角色编号',
    length: 100,
  })
  roleCode: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'sort',
    comment: '排序值',
    length: 11
  })
  sort: number;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'description',
    comment: '描述',
  })
  description: string | null;

  @Column('tinyint', {
    nullable: true,
    default: () => 1,
    name: 'status',
    comment: '状态',
  })
  status: number | null;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;
}