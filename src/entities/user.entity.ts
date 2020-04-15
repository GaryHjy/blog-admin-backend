import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { encodeMD5 } from 'src/utils/encrypt';
import { Exclude } from 'class-transformer';

enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity()
export class User {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id'
  })
  id: number;

  @Column('varchar', {
    name: 'username',
    comment: '用户名',
    length: 50,
  })
  username: string;

  @Exclude() // 排除字段不返回
  @Column('varchar',{
    nullable: false,
    name: 'password',
    comment: '密码',
    length: 100,
  })
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST
  })
  role: UserRole

  @Column('tinyint',{
    nullable: true,
    default: () => 1,
    name: 'status',
    comment: '状态',
  })
  status: number | null

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  // 自动更新时间
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '最后更新时间',
  })
  updatedAt: Date;

  @BeforeInsert()
  makePwd() {
    this.password = encodeMD5(this.password);
  }
}