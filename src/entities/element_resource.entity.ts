import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('element_resource')
export class ElementResource {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    comment: '元素名',
    length: 255,
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'code',
    comment: '元素编号',
    length: 255,
  })
  code: string;

  @Column('tinyint', {
    nullable: true,
    default: () => 1,
    name: 'type',
    comment: '元素类型'
  })
  type: number

  @Column('varchar', {
    nullable: true,
    name: 'icon_url',
    comment: '图标',
    length: 255,
  })
  iconUrl: string;

  @Column('varchar', {
    nullable: true,
    name: 'path_url',
    comment: '路径URL',
    length: 255,
  })
  pathUrl: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'sort',
    comment: '排序值'
  })
  sort: number;

  @Column('varchar', {
    nullable: true,
    name: 'description',
    comment: '描述',
    length: 100
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
    name: 'created_time',
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    name: 'updated_time',
    comment: '更新时间',
  })
  updatedTime: Date;

}