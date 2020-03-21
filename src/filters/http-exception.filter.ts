import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 获取错误信息
    const responseInfo = exception.message
    const error = responseInfo.errors || []
    const code = responseInfo.code || 1
    const message = responseInfo.message || '请求失败'

    // 错误字段
    Logger.log(message, '错误提示');
    // 返回格式
    const errorResponse = {
      data: {
        error, // 全部错误信息
      },
      message, // 错误消息
      code, // 自定义code
    };
    // 打印日志
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter',
    );
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}