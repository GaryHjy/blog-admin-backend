import { createParamDecorator } from "@nestjs/common";

/**
 * @author GaryHjy
 * @description 获取req.user中指定key的value
 */

export const CurrentUser = createParamDecorator((data, req) => {
  if (data) {
    return req.user[data];
  }
  return req.user;
})