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
    getHouseForMe: builder.query({
      query: (params) => ({
        url: "/house/me",
        method: "GET",
        params,
      }),
    }),
    favoriteById: builder.query({
      query: (params) => ({
        url: "/favoriteById",
        method: "GET",
        params,
      }),
    }),
    addFavorite: builder.mutation({
      query: (data) => ({
        url: "/favourite",
        method: "POST",
        data,
      }),
    }),
    deleteFavorite: builder.mutation({
      query: (data) => ({
        url: "/favourite",
        method: "DELETE",
        data,
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useDetailHouseQuery,
  useGetHouseForMeQuery,
  useFavoriteByIdQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = rtkQueryApi;
