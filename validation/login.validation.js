import * as yup from "yup";

export const validationSchema = yup.object({
  phone: yup.string().required(),
  password: yup.string().required(),
});