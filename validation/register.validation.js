import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().required("Vui lòng điền tên đăng nhập"),
  phone: yup.string().required("Vui lòng điền số điện thoại"),
  password: yup.string().required("Vui lòng điền mật khẩu"),
  username: yup.string().required("Vui lòng điền tên người dùng"),
  address: yup.string().required("Vui lòng điền địa chỉ của bạn"),
});
