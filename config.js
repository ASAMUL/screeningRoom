// 开发环境为ws://localhost:8888/ws，生产环境为ws://124.221.188.133:8888/ws
export const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.99.235:8888/ws"
    : "http://124.221.188.133:8888/ws";
