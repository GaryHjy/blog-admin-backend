import * as crypto from 'crypto-js'

/**
 * @description 密码转换为md5
 * @param password 密码
 */
export const encodeMD5 = (password: string):string => {
  return crypto.MD5(password).toString()
}

/**
 * @description 校验密码是否一致
 * @param password 传入的密码
 * @param sqlPassword 数据库的密码
 */
export const checkPwd = (password: string, sqlPassword: string):boolean => {
  return Object.is(encodeMD5(password),sqlPassword)
}

