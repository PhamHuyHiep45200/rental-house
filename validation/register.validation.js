import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
});
