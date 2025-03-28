"use client";
import { validationSchema } from "@/validation/post.validation";
import { Container, Divider } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { useRouter } from "next/navigation";
import FormPost from "../components/post/FormPost";
import { useGetAllCategoryQuery } from "@/service/rtk-query";
import { createPost, uploadImages } from "@/service/frontend";

const initialValues = {
  categoryId: "",
  title: "",
  description: "",
  address: "",
  money: "",
  square: "",
  province: 1000,
  district: 1000,
  contact: "",
  type: "",
  imgs: [],
};
function Post() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);

  const {
    data,
    isFetching,
    isSuccess: categorySuccess,
  } = useGetAllCategoryQuery({});

  const handleUpload = async (imgs) => {
    try {
      // Tạo FormData để gửi lên API
      const formData = new FormData();
      imgs.forEach((file) => {
        console.log("File:", file);
        formData.append("files", file);
      });

      // Gọi API upload
      const response = await uploadImages(formData);

      return response.files;
    } catch (error) {
      console.error("Upload error:", error);
      return [];
    }
  };

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    const imgs = await handleUpload(values.imgs);
    values.imgs = imgs;

    try {
      const response = await createPost({
        ...values,
        userId: user.id,
      });
      enqueueSnackbar("Tạo Bài Viết Thành Công! Vui lòng đợi Admin phê duyệt", {
        variant: "success",
      });
      router.replace(`/me/house?tab=${response.data.id}`);
    } catch (error) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (isFetching) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isFetching]);

  return (
    <Container className="bg-white py-5 rounded-lg">
      <h1>Đăng Tin Mới</h1>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <FormPost type="create" props={props} categories={data?.data || []} />
        )}
      </Formik>
    </Container>
  );
}

export default Post;
