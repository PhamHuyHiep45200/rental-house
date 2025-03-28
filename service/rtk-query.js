import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from ".";

export const rtkQueryApi = createApi({
  reducerPath: "rtkQueryApi",
  baseQuery: axiosBaseQuery(), // Sử dụng axiosBaseQuery
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params,
      }),
    }),
    detailHouse: builder.query({
      query: (id) => ({
        url: `/house/${id}`,
        method: "GET",
      }),
    }),
    // createTask: builder.mutation({
    //   query: (taskData) => ({
    //     url: "/tasks",
    //     method: "POST",
    //     data: taskData,
    //   }),
    // }),
  }),
});

export const { useGetAllCategoryQuery, useDetailHouseQuery } = rtkQueryApi;
