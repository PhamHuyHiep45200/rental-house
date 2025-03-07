import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
});