import request from "../index";

export async function getAllProduct(params) {
  return request(`/house`, {
    method: "GET",
    params,
  });
}
export async function updateStatusProduct(data) {
  return request(`/house`, {
    method: "PUT",
    data,
  });
}
export async function getProductById(id) {
  return request(`/house/${id}`, {
    method: "GET",
  });
}

export async function createProduct(data) {
  return request(`/house`, {
    method: "POST",
    data,
  });
}
export async function updateProduct(id, data) {
  return request(`/house/${id}`, {
    method: "POST",
    data,
  });
}
export async function updateMultiProduct(data) {
  return request(`/house`, {
    method: "PUT",
    data,
  });
}
export async function deleteProduct(id) {
  return request(`/house/delete/${id}`, {
    method: "DELETE",
  });
}
