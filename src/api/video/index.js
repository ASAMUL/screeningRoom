import request from "@/utils/request";

export function getVideoList(params) {
  return request({
    url: "/video/page",
    method: "get",
    params,
  });
}
