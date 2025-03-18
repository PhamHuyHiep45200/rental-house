"use client";
import { validationSchema } from "@/validation/post.validation";
import { Container, Divider } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormPost from "@/components/post/FormPost";
import {
  useGetCategoryQuery,
  usePostHouseMutation,
} from "@/store/service/user.service";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { useRouter } from "next/navigation";

const initialValues = {
  category: "",
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
  const [categorys, setCategorys] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [postHouse, { isLoading, isSuccess, isError }] =
    usePostHouseMutation();
  const {
    data,
    isFetching,
    isSuccess: categorySuccess,
  } = useGetCategoryQuery({});

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Tạo Bài Viết Thành Công! Vui lòng đợi Admin phê duyệt", {
        variant: "success",
      });
      router.push("/me/house?tab=1");
    }
    if (isError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  useEffect(() => {
    if (categorySuccess) {
      if (data) {
        setCategorys(data.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", {
          variant: "error",
        });
      }
    }
  }, [isFetching]);
  return (
    <Container className="bg-white py-5 rounded-lg">
      <h1>Đăng Tin Mới</h1>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          postHouse(values);
        }}
      >
        {(props) => <FormPost type="create" props={props} categorys={categorys} />}
      </Formik>
    </Container>
  );
}

export default Post;