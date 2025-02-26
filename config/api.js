import { DEFAULT_PAGING } from "@/contants/api";

export const skip = (page) => {
  return page ? (page - 1) * DEFAULT_PAGING.page_size : 0;
};

export const getDataCommon = (data, { total, skip }) => {
  return {
    data: data,
    pagination: {
      total,
      skip,
    },
  };
};
