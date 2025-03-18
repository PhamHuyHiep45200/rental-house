import request from "./index";

export async function getMe() {
  return request(`/users/me`, {
    method: "GET",
  });
}

export async function userFavorite() {
  return request(`/favourite/use`, {
    method: "GET",
  });
}
export async function getCategory() {
  return request(`/category`, {
    method: "GET",
  });
}
export async function searchApi(params) {
  return request(`/house`, {
    method: "GET",
    params,
  });
}
export async function newHouse() {
  return request(`/house`, {
    method: "GET",
  });
}
export async function houseUser() {
  return request(`/house/user`, {
    method: "GET",
  });
}
export async function topFavorite() {
  return request(`/top-favorite`, {
    method: "GET",
  });
}
export async function favoriteById() {
  return request(`/common/check-like`, {
    method: "GET",
  });
}
export async function newHouseApi() {
  return request(`/new-house`, {
    method: "GET",
  });
}
export async function randomHouseApi() {
  return request(`/random-house`, {
    method: "GET",
  });
}
export async function registerUserApi(data) {
  return request(`/auth/register`, {
    method: "POST",
    data,
  });
}

export async function loginUserData(data) {
  return request(`/auth/login`, {
    method: "POST",
    data,
  });
}
