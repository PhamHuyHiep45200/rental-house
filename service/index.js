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

// Base query cho RTK Query sử dụng axios
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await request(`${baseUrl}${url}`, {
        method,
        data,
        params,
      });
      return { data: result }; // Trả về dữ liệu theo định dạng RTK Query mong muốn
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default request;
