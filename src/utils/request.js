import axios from "axios";
import { getToken } from "@/utils/authUtil";

import { createDiscreteApi } from "naive-ui";
const { message } = createDiscreteApi(["message"]);
// 创建 Axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 其他配置选项
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers["token"] = token;
    return config;
  },
  (error) => {
    console.error("请求错误", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.status !== 200 || response.data.code !== 200) {
      if (response.status === 401 || response.data.code === 401) {
        message.error("您的登录已过期，请重新登录");
        removeLocalUser();
      } else if (response.data.code === 403 || response.status === 403) {
        message.error("您没有权限访问！");
      } else {
        message.error(response.data?.message || "系统异常，请检查网络");
      }
      return Promise.reject(response);
    }
    return response.data;
  },
  (error) => {
    message.error(error?.message || "系统异常，请检查网络");
    return Promise.reject(error);
  }
);

const removeLocalUser = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
};
export default instance;
