import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ) {}

  findAll():Promise<User[]> {
    return this.UserRepository.find()
  }

  async create(data: CreateUserDto){
    const { username } = data;
    const res = await this.UserRepository.find({username})
    // 判断用户名是否存在
    if (res.length) {
      return false
    } else {
      const user = await this.UserRepository.create(data)
      return await this.UserRepository.save(user);
    }
  }

  async findOne(param: object) {
    return await this.UserRepository.findOne(param)
  }
}
