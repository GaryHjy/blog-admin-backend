import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { encodeMD5 } from 'src/utils/encrypt';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'username',
    comment: '用户名',
    length: 50,
  })
  username: string;

  @Exclude() // 排除字段不返回
  @Column('varchar', {
    nullable: false,
    name: 'password',
    comment: '密码',
    length: 100,
  })
  password: string;

  @Column('varchar', {
    nullable: true,
    name: 'nickname',
    comment: '用户昵称',
    length: 64,
  })
  nickName: string;

  @Column('varchar', {
    nullable: true,
    name: 'avatar',
    comment: '头像',
    length: 255
  })
  avatar: string;

  @Column('varchar', {
    nullable: true,
    length: 11,
    name: 'mobile',
    comment: '用户手机号码',
  })
  mobile: string | null;

  @Column('tinyint', {
    nullable: true,
    default: () => 1,
    name: 'status',
    comment: '状态',
  })
  status: number | null;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'email',
    comment: '用户邮箱',
  })
  email: string | null;

  // 创建时间
  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  // 自动更新时间
  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  @BeforeInsert()
  makePwd() {
    this.password = encodeMD5(this.password);
  }
}