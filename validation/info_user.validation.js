import * as yup from "yup";

export const validationSchema = yup.object({
  phone: yup.string().required(),
  username: yup.string().required(),
});