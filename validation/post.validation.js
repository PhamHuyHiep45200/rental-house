import * as yup from "yup";

export const validationSchema = yup.object({
  category: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  money: yup.number().required(),
  square: yup.number().required(),
  province: yup.number().required(),
  district: yup.number().required(),
  contact: yup.string().required(),
  type: yup.string().required(),
  imgs: yup.array().min(1).required(),
});