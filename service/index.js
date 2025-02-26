import axios from "axios";
const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data',
  },
});
instance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      window.location.assign("/");
    }
    return response.data;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error);
    }
  }
);

const request = (url, options) => {
  return instance.request({ ...options, url: url });
};
export default request;
