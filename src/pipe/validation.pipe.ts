import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // 数据转换
      const errorMessage = errors.map(item => {
        return {
          currentValue: item.value,
          [item.property]: item.constraints[Object.keys(item.constraints)[0]]
        };
      });
      // 统一处理返回格式
      throw new HttpException(
        { message: errorMessage },
        HttpStatus.OK,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}