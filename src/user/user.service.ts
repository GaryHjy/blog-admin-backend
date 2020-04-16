import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { checkPwd } from 'src/utils/encrypt';
import { UserRep } from './dto/user.rep.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserLoginRep } from './dto/user.login.rep.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ) {}

  findAll():Promise<User[]> {
    return this.UserRepository.find()
  }

  /**
   * @author GaryHjy
   * @description 创建用户
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>}
   * @memberof UserService
   */
  async create(createUserDto: CreateUserDto): Promise<User>{
    const { username } = createUserDto;
    const result = await this.UserRepository.count({ username });
    // 判断是否存在用户名
    if (result) {
      throw new HttpException(
        {
          message: '用户名已存在',
          code: 400
        },
        HttpStatus.OK,
      )
    } else {
      const user = await this.UserRepository.create(createUserDto);
      return await this.UserRepository.save(user);
    }
  }

  /**
   * @author GaryHjy
   * @description 用户登录
   * @param {UserLoginDto} userLoginDto
   * @returns {Promise<UserRep>}
   * @memberof UserService
   */
  async login(userLoginDto: UserLoginDto): Promise<UserLoginRep> {
    const { username, password } = userLoginDto;
    // 查询用户
    const user = await this.UserRepository.findOne({
      where: {
        username
      }
    });
    if (!user) {
      throw new HttpException(
        {
          message: '用户名不存在',
          code: 400
        },
        HttpStatus.OK,
      )
    } 
    // 判断用户名密码
    if (user && checkPwd(password, user.password)) {
      const { password, ...params } = user;
      return params;
    } else {
      throw new HttpException(
        {
          message: '用户名或密码错误',
          code: 400
        },
        HttpStatus.OK,
      )
    }
  }

  /**
   * @author GaryHjy
   * @description 根据id查询信息
   * @param {number} id
   * @returns {Promise<UserRep>}
   * @memberof UserService
   */
  async findById(id: number): Promise<UserRep> {
    const user = await this.UserRepository.findOne({id})
    if (user) {
      return user;
    } else {
      throw new HttpException(
        {
          message: '用户不存在',
          code: 400
        },
        HttpStatus.OK,
      );
    }
  }

  /**
   * @author GaryHjy
   * @description 根据id修改信息
   * @param {number} id
   * @param {UpdateUserDto} updateUserDto
   * @returns
   * @memberof UserService
   */
  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<UserRep> {
    const { username, role, status } = updateUserDto
    if (username) {
      const result = await this.UserRepository.count({ username });
      if (result) {
        throw new HttpException(
          {
            message: '用户名已存在',
            code: 400
          },
          HttpStatus.OK,
        )
      } 
    }
    const { raw: { changedRows } } = await this.UserRepository.update({ id }, { username, role, status })
    if (changedRows) {
      return await this.findById(id)
    } else {
      throw new HttpException(
        {
          message: '修改失败',
          code: 400
        },
        HttpStatus.OK,
      )
    }
  }

  /**
   * @author GaryHjy
   * @description 根据用户id删除用户信息
   * @param {number} id 用户id
   * @returns {Promise<boolean>}
   * @memberof UserService
   */
  async removeUserById(currentId: number, id: number): Promise<boolean> {
    if (currentId == id) {
      throw new HttpException(
        {
          message: '不能自己删除自己',
          code: 400
        },
        HttpStatus.OK,
      )
    }
    const user = await this.findById(id)
    if(user) {
      const { raw: { changedRows } } = await this.UserRepository.delete({id})
      if (changedRows) {
        return true
      } else {
        return false
      }
    }
  }

  /**
   * @author GaryHjy
   * @description 根据用户名查询信息
   * @param {string} username
   * @returns
   * @memberof UserService
   */
  async findByUsername(username: string) {
    return await this.UserRepository.findOne({
      where: {
        username
      }
    });
  }
}
