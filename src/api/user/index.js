import request from "@/utils/request";
/**
 * 登录
 * @param {Object} data
 * @returns {Promise}
 */
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
/**
 * 注册
 * @param {Object} data
 * @returns {Promise}
 */
export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}
