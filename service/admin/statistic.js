import request from "./../index";

export async function statistic() {
  return request(`/statistic`, {
    method: "GET",
  });
}
