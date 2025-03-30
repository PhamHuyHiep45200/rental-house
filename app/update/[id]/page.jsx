"use client";
import { validationSchema } from "@/validation/post.validation";
import { Container, Divider } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { useParams, useRouter } from "next/navigation";
import FormPost from "@/app/components/post/FormPost";
import {
  useDetailHouseQuery,
  useGetAllCategoryQuery,
  useUpdateHouseMutation,
} from "@/service/rtk-query";
import { uploadImages } from "@/service/frontend";

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
function Update() {
  const { enqueueSnackbar } = useSnackbar();
  const [initialValue, setInitialValue] = useState(initialValues);
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const id = params.id;

  const {
    data: dataDetail,
    isFetching: fetchingDetail,
    isSuccess: successDetail,
  } = useDetailHouseQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [updateHouse, { isLoading, isSuccess, isError }] =
    useUpdateHouseMutation();
  const { data, isSuccess: categorySuccess } = useGetAllCategoryQuery({});

  const handleUpload = async (imgs) => {
    try {
      // Tạo FormData để gửi lên API
      const formData = new FormData();
      imgs.forEach((file) => {
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
    delete values.user;

    const imgs = await handleUpload(
      values.imgs.filter((img) => typeof img !== "string")
    );

    values.imgs = values.imgs
      .filter((img) => typeof img === "string")
      .concat(imgs);

    updateHouse({
      id,
      data: values,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(
        "Cập Nhật Bài Viết Thành Công! Vui lòng đợi Admin phê duyệt",
        {
          variant: "success",
        }
      );
      router.push("/me/house?tab=1");
    }
    if (isError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (successDetail) {
      setInitialValue({
        ...dataDetail,
      });
    }
  }, [successDetail, fetchingDetail]);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  return (
    <Container className="bg-white py-5 rounded-lg">
      <h1>Chỉnh Sửa Bài Đăng</h1>
      <Divider />
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <FormPost props={props} categories={data?.data} type="update" />
        )}
      </Formik>
    </Container>
  );
}

export default Update;
