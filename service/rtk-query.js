import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from ".";

export const rtkQueryApi = createApi({
  reducerPath: "rtkQueryApi",
  baseQuery: axiosBaseQuery(), // Sử dụng axiosBaseQuery
  tagTypes: ["House", "Favorite", "Category"], // Thêm tag để quản lý cache
  endpoints: (builder) => ({
    // 🏠 Lấy danh mục nhà
    getAllCategory: builder.query({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params,
      }),
      providesTags: ["Category"], // Cung cấp tag để invalidation
    }),

    // 🏠 Lấy danh sách nhà
    getAllHouse: builder.query({
      query: (params) => ({
        url: "/house",
        method: "GET",
        params,
      }),
      providesTags: ["House"], // Cung cấp tag để invalidation
    }),

    // 🏠 Lấy danh sách nhà mới
    getNewHouse: builder.query({
      query: (params) => ({
        url: "/new-house",
        method: "GET",
        params,
      }),
      providesTags: ["House"], // Cung cấp tag để invalidation
    }),

    // 🏡 Lấy chi tiết nhà
    detailHouse: builder.query({
      query: (id) => ({
        url: `/house/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "House", id }],
    }),

    // 🏡 Cập nhật nhà
    updateHouse: builder.mutation({
      query: (data) => ({
        url: `/house/${data.id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "House", id }], // Xoá cache của nhà khi cập nhật
    }),

    // 🏠 Lấy danh sách nhà của user
    getHouseForMe: builder.query({
      query: (params) => ({
        url: "/house/me",
        method: "GET",
        params,
      }),
      providesTags: ["House"], // Đánh dấu dữ liệu này là của "House"
    }),

    // ❤️ Lấy danh sách nhà yêu thích theo user
    favoriteById: builder.query({
      query: (params) => ({
        url: "/favoriteById",
        method: "GET",
        params,
      }),
      providesTags: ["Favorite"], // Đánh dấu dữ liệu này là của "Favorite"
    }),

    // ❤️ Thêm nhà vào danh sách yêu thích
    addFavorite: builder.mutation({
      query: (data) => ({
        url: "/favourite",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Favorite"], // Khi thêm mới thì gọi lại danh sách yêu thích
    }),

    // ❤️ Xoá nhà khỏi danh sách yêu thích
    deleteFavorite: builder.mutation({
      query: (data) => ({
        url: "/favourite",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["Favorite"], // Khi xoá thì gọi lại danh sách yêu thích
    }),

    //  get me
    getMe: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
    }),

    // update user
    updateMe: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PATCH",
        data,
      }),
    }),
  }),
});

// ✅ Export hooks để sử dụng trong component
export const {
  useGetAllCategoryQuery,
  useGetAllHouseQuery,
  useGetNewHouseQuery,
  useDetailHouseQuery,
  useGetHouseForMeQuery,
  useFavoriteByIdQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useUpdateHouseMutation,
  useGetMeQuery,
  useUpdateMeMutation,
} = rtkQueryApi;
